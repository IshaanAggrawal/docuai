import { useState, useEffect } from 'react';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Mock data
    const mockDocuments = [
      {
        id: '1',
        title: 'Employee Handbook',
        category: 'policies',
        tags: ['hr', 'compliance'],
        uploadDate: '2023-05-15',
        size: '2.4 MB',
        type: 'PDF'
      },
      {
        id: '2',
        title: 'IT Setup Guide',
        category: 'procedures',
        tags: ['it', 'onboarding'],
        uploadDate: '2023-06-22',
        size: '1.8 MB',
        type: 'PDF'
      }
    ];
    
    setDocuments(mockDocuments);
    setLoading(false);
  }, []);

  return { documents, loading };
};