const API_BASE_URL = import.meta.env.VITE_AI_SERVICE_URL ?? 'http://localhost:8000';

export type ChatMessagePayload = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type AskResponse = {
  answer: string;
  sources?: Array<Record<string, unknown>>;
};

async function handleResponse(response: Response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.detail || data?.error || data?.message || 'Request failed';
    throw new Error(message);
  }
  return data;
}

export async function uploadDocumentToDocuAI(
  file: File, 
  category: string = 'general', 
  tags: string = ''
): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', category);
  formData.append('tags', tags);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await handleResponse(response);
  return data?.message ?? 'File uploaded successfully';
}

export async function queryDocuAI(
  question: string,
  history: ChatMessagePayload[] = []
): Promise<AskResponse> {
  if (!question) throw new Error('Question is required');

  const response = await fetch(`${API_BASE_URL}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question, history }),
  });

  return handleResponse(response);
}
