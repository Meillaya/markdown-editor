import React from 'react';
import { MarkdownEditor } from './components/MarkdownEditor';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <MarkdownEditor />
      </div>
    </ThemeProvider>
  );
}

export default App;