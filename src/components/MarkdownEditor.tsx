import React, { useCallback, useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Toolbar } from './Toolbar';
import { Preview } from './Preview';
import { StatusBar } from './StatusBar';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../store';

export const MarkdownEditor: React.FC = () => {
  const { isDark } = useTheme();
  const { content, setContent, editorRef, setEditorRef } = useStore();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleEditorDidMount = (editor: any) => {
    setEditorRef(editor);
  };

  const handleEditorChange = useCallback((value: string | undefined) => {
    setContent(value || '');
  }, [setContent]);

  useEffect(() => {
    const savedContent = localStorage.getItem('markdown-content');
    if (savedContent) {
      setContent(savedContent);
    }
  }, [setContent]);

  useEffect(() => {
    const saveContent = () => {
      localStorage.setItem('markdown-content', content);
    };
    window.addEventListener('beforeunload', saveContent);
    return () => window.removeEventListener('beforeunload', saveContent);
  }, [content]);

  return (
    <div className={`container mx-auto p-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`}>
      <div className="mb-4">
        <Toolbar />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-12rem)]">
        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <Editor
            height="100%"
            defaultLanguage="markdown"
            value={content}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            theme={isDark ? 'vs-dark' : 'light'}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
        
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-auto">
          <Preview markdown={content} />
        </div>
      </div>

      <StatusBar />
    </div>
  );
};