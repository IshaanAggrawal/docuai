import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI, TaskType } from '@google/generative-ai';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY!);

export async function queryDocuAI(question: string): Promise<string> {
  if (!question) throw new Error('Question is required');

  // ✅ Step 1: Get embeddings correctly
  const embedModel = genAI.getGenerativeModel({ model: 'embedding-001' });

const embedResult = await embedModel.embedContent({
    content: { parts: [{ text: question }] },
    taskType: TaskType.RETRIEVAL_QUERY,
    });

  const questionEmbedding = embedResult?.embedding?.values;
  if (!questionEmbedding) throw new Error('Failed to generate embeddings');

  // ✅ Step 2: Search in Supabase using vector match
  const { data: chunks, error } = await supabase.rpc('match_documents', {
    query_embedding: questionEmbedding,
    match_threshold: 0.75,
    match_count: 3,
  });

  if (error) throw new Error(error.message);

  const context = chunks
    .map((chunk: any, i: number) => `Snippet ${i + 1}: ${chunk.content}`)
    .join('\n\n');

  // ✅ Step 3: Ask Gemini Pro with prompt
  const chatModel = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
You are DocuAI, a helpful assistant trained on internal company policies and documentation. Use the provided context to answer the user's question precisely.

Context:
---
${context}
---

Question:
${question}

Answer:
`;

  const result = await chatModel.generateContent(prompt);
  return result.response.text();
}
