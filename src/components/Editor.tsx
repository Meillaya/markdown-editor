import { useEffect, useRef } from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { useEditorStore } from '../store/editorStore';

export default function Editor() {
  const { content, setContent, isDarkMode } = useEditorStore();
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        const editor = editorRef.current;
        if (!editor) return;

        const selection = editor.getSelection();
        const selectedText = editor.getModel().getValueInRange(selection);

        switch (e.key) {
          case 'b':
            e.preventDefault();
            editor.executeEdits('', [
              { range: selection, text: `**${selectedText}**` }
            ]);
            break;
          case 'i':
            e.preventDefault();
            editor.executeEdits('', [
              { range: selection, text: `*${selectedText}*` }
            ]);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <MonacoEditor
      height="100%"
      defaultLanguage="markdown"
      value={content}
      onChange={(value) => setContent(value || '')}
      theme={isDarkMode ? 'vs-dark' : 'light'}
      onMount={handleEditorDidMount}
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'off',
        folding: false,
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 0,
        automaticLayout: true,
      }}
    />
  );
}