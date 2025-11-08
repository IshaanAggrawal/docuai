from fastapi import FastAPI, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from supabase import create_client
from pydantic import BaseModel
from typing import List, Literal, Optional
from dotenv import load_dotenv
import fitz
import os


class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str


class AskRequest(BaseModel):
    question: str
    history: List[ChatMessage] = []


load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
EMBEDDING_MODEL = os.getenv(
    "EMBEDDING_MODEL",
    "sentence-transformers/all-mpnet-base-v2",
)

# Validate required environment variables
if not SUPABASE_URL:
    raise RuntimeError("SUPABASE_URL environment variable is required")
if not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_KEY environment variable is required")
if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY environment variable is required")

groq_client = Groq(api_key=GROQ_API_KEY)
supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
embeddings = HuggingFaceEmbeddings(model_name=EMBEDDING_MODEL)
vector_store = SupabaseVectorStore(
    client=supabase_client,
    embedding=embeddings,
    table_name="documents",
    query_name="match_documents",
)


@app.get("/")
def root():
    return {"status": "AI service running with Groq Llama-3-8B"}


@app.post("/upload")
async def upload(file: UploadFile, category: Optional[str] = Form("general"), tags: Optional[str] = Form("")):
    if not file.filename:
        raise HTTPException(status_code=400, detail="Uploaded file must have a name")

    # Parse tags
    tag_list = [tag.strip() for tag in tags.split(",")] if tags else []
    
    os.makedirs("uploads", exist_ok=True)
    path = f"uploads/{file.filename}"
    with open(path, "wb") as f:
        f.write(await file.read())

    text = ""
    with fitz.open(path) as doc:
        for page in doc:
            # Ensure we're concatenating strings
            page_text = page.get_text()
            if isinstance(page_text, str):
                text = text + page_text

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.split_text(text)
    
    # Add metadata for categorization
    metadatas = [{"category": category, "tags": tag_list, "filename": file.filename} for _ in chunks]

    # Insert embeddings with metadata
    SupabaseVectorStore.from_texts(
        texts=chunks,
        embedding=embeddings,
        client=supabase_client,
        table_name="documents",
        query_name="match_documents",
        metadatas=metadatas
    )

    return {"message": "✅ Document processed and embedded", "category": category, "tags": tag_list}


@app.post("/ask")
async def ask(payload: AskRequest):
    if not payload.question:
        raise HTTPException(status_code=400, detail="Question is required")

    try:
        documents = vector_store.similarity_search(payload.question, k=4)
    except Exception:
        documents = []

    context_text = "\n\n".join(doc.page_content for doc in documents)
    context_sources = [doc.metadata for doc in documents]

    system_prompt = (
        "You are DocuAI, a helpful assistant that answers questions using the provided "
        "company knowledge base. Use the supplied context snippets when they are "
        "relevant. If the answer is not in the context, say you do not have that "
        "information."
    )

    # Build messages list without strict typing to avoid issues
    messages = []
    messages.append({"role": "system", "content": system_prompt})

    if context_text:
        messages.append({"role": "system", "content": f"Context:\n---\n{context_text}\n---"})

    for entry in payload.history[-10:]:
        role = "assistant" if entry.role == "assistant" else "user"
        messages.append({"role": role, "content": entry.content})

    messages.append({"role": "user", "content": payload.question})

    completion = groq_client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=messages,
        temperature=0.2,
    )

    answer = completion.choices[0].message.content

    return {"answer": answer, "sources": context_sources}