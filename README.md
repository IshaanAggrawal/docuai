# DocuAI Onboarding Platform

A comprehensive company onboarding solution built with React, TypeScript, and Python.

## Project Structure

```
├── ai_service/          # Python backend with FastAPI
├── src/                 # React frontend
│   ├── components/      # Shared UI components
│   ├── features/        # Feature modules (onboarding, documents, etc.)
│   ├── lib/             # Utility functions and configurations
│   ├── pages/           # Main page components
│   └── App.tsx          # Main application component
└── public/              # Static assets
```

## Features

1. **Onboarding Dashboard** - Track progress and manage onboarding tasks
2. **Document Management** - Upload, categorize, and search company documents
3. **Workflow Management** - Create and manage onboarding workflows
4. **Analytics & Reporting** - Monitor onboarding metrics and engagement
5. **Admin Panel** - User and system management

## Getting Started

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Start the AI service: `cd ai_service && python app.py`

## Technologies

- **Frontend**: React, TypeScript, Vite, ShadCN UI
- **Backend**: Python, FastAPI, Supabase, Groq
- **AI**: LLM integration for document processing and Q&A