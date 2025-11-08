export interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
}

export interface OnboardingModule {
  id: string;
  title: string;
  description: string;
  progress: number;
  icon: string;
  color: string;
}

export interface OnboardingProgress {
  completed: number;
  total: number;
  percentage: number;
}