# Feature Structure Documentation

This document outlines the folder structure for the DocuAI Onboarding Platform features.

## Folder Structure

```
src/
├── features/
│   ├── onboarding/
│   │   ├── components/
│   │   │   ├── ModuleCard.tsx
│   │   │   ├── ProgressTracker.tsx
│   │   │   └── TaskList.tsx
│   │   ├── hooks/
│   │   │   └── useOnboardingProgress.ts
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   └── Profile.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── documents/
│   │   ├── components/
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── DocumentCard.tsx
│   │   │   └── DocumentUpload.tsx
│   │   ├── hooks/
│   │   │   └── useDocuments.ts
│   │   ├── pages/
│   │   │   ├── DocumentLibrary.tsx
│   │   │   └── DocumentViewer.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── workflows/
│   │   ├── components/
│   │   │   ├── TaskCard.tsx
│   │   │   └── WorkflowColumn.tsx
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── WorkflowBoard.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── analytics/
│   │   ├── components/
│   │   │   ├── ProgressChart.tsx
│   │   │   └── StatsCard.tsx
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── Reports.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── admin/
│   │   ├── components/
│   │   │   ├── RoleSelector.tsx
│   │   │   └── UserTable.tsx
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── Settings.tsx
│   │   │   └── UserManagement.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts
│   └── index.ts
├── components/
│   ├── layout/
│   │   ├── MainLayout.tsx
│   │   └── Sidebar.tsx
│   └── ui/ (existing ShadCN components)
└── pages/ (existing pages)
```

## Component Organization

Each feature follows a consistent structure:

1. **components/** - Reusable UI components specific to the feature
2. **hooks/** - Custom React hooks for feature logic
3. **pages/** - Page components that represent routes
4. **types/** - TypeScript interfaces and types
5. **index.ts** - Barrel file for easy exports

## Feature Descriptions

### Onboarding
Handles the main onboarding dashboard, progress tracking, and user profile management.

### Documents
Manages document uploading, categorization, viewing, and library organization.

### Workflows
Implements task management, kanban boards, and workflow automation.

### Analytics
Provides reporting, charts, and statistics on onboarding progress and engagement.

### Admin
Handles user management, role assignment, and system settings.

## Usage Guidelines

1. Each feature is self-contained and should have minimal dependencies on other features
2. Shared components should go in the main components/ directory
3. Types should be exported through the feature's index.ts file
4. Hooks should encapsulate feature-specific logic
5. Pages should compose components and hooks to create complete views

This structure allows for easy maintenance, testing, and scalability of the application.