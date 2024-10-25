import React from 'react';
import { useStore } from '../store';

export const StatusBar: React.FC = () => {
  const { content } = useStore();
  
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
      <span className="mr-4">Words: {wordCount}</span>
      <span>Characters: {charCount}</span>
    </div>
  );
};