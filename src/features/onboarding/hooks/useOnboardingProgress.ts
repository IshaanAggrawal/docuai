import { useState, useEffect } from 'react';

export const useOnboardingProgress = () => {
  const [progress, setProgress] = useState({
    completed: 0,
    total: 0,
    percentage: 0
  });

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Mock data
    setProgress({
      completed: 8,
      total: 12,
      percentage: 67
    });
  }, []);

  return { progress };
};