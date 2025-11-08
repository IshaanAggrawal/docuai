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
2. Create a `.env` file with your environment variables (see `.env.example`)
3. Start the development server: `npm run dev`
4. Start the AI service: `cd ai_service && python app.py`

## Deployment to Vercel

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Set the following environment variables in Vercel:
   - `VITE_SUPABASE_URL` - Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
   - `VITE_AI_SERVICE_URL` - Your backend API URL (if deployed separately)
4. Set the build command to `npm run build`
5. Set the output directory to `dist`
6. Deploy!

## Technologies

- **Frontend**: React, TypeScript, Vite, ShadCN UI
- **Backend**: Python, FastAPI, Supabase, Groq
- **AI**: LLM integration for document processing and Q&A

## Troubleshooting Deployment Issues

If you're seeing a blank page on Vercel:

1. Check that all environment variables are set correctly
2. Verify that your `vercel.json` file is properly configured
3. Ensure your routing is set up correctly in `App.tsx`
4. Check the browser console for any JavaScript errors
5. Make sure your base path in `vite.config.ts` is set to `/`