export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  head?: string;
}