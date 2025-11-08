export interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  uploadDate: string;
  size: string;
  type: string;
  url: string;
}

export interface DocumentCategory {
  id: string;
  name: string;
  description: string;
  count: number;
}

export interface DocumentUploadData {
  file: File;
  category: string;
  tags: string[];
}