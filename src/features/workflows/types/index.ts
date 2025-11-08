export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  assignee?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}