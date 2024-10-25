import React from 'react';
import { 
  Bold, Italic, List, ListOrdered, Quote, Code, Image, Link, 
  FileDown, Sun, Moon, FileText, Download
} from 'lucide-react';
import { useStore } from '../store';
import { useTheme } from '../context/ThemeContext';
import html2pdf from 'html2pdf.js';

export const Toolbar: React.FC = () => {
  const { editorRef, content } = useStore();
  const { isDark, toggleTheme } = useTheme();

  const insertFormat = (prefix: string, suffix: string = prefix) => {
    if (!editorRef) return;
    
    const selection = editorRef.getModel().getValueInRange(editorRef.getSelection());
    const text = selection || 'text';
    const newText = `${prefix}${text}${suffix}`;
    
    editorRef.executeEdits('', [{
      range: editorRef.getSelection(),
      text: newText,
      forceMoveMarkers: true
    }]);
    editorRef.focus();
  };

  const exportToPDF = async () => {
    const element = document.querySelector('.prose');
    if (!element) return;
    
    const opt = {
      margin: 1,
      filename: 'markdown-export.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    await html2pdf().set(opt).from(element).save();
  };

  const exportToHTML = () => {
    const html = document.querySelector('.prose')?.innerHTML;
    if (!html) return;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-export.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const toolbarItems = [
    { icon: Bold, action: () => insertFormat('**'), tooltip: 'Bold (Ctrl+B)' },
    { icon: Italic, action: () => insertFormat('*'), tooltip: 'Italic (Ctrl+I)' },
    { icon: ListOrdered, action: () => insertFormat('1. '), tooltip: 'Ordered List' },
    { icon: List, action: () => insertFormat('- '), tooltip: 'Unordered List' },
    { icon: Quote, action: () => insertFormat('> '), tooltip: 'Quote' },
    { icon: Code, action: () => insertFormat('`'), tooltip: 'Inline Code' },
    { icon: Image, action: () => insertFormat('![alt](', ')'), tooltip: 'Image' },
    { icon: Link, action: () => insertFormat('[', '](url)'), tooltip: 'Link' },
  ];

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
      <div className="flex space-x-2">
        {toolbarItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={item.tooltip}
          >
            <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        ))}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={exportToHTML}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Export to HTML"
        >
          <FileText className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={exportToPDF}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Export to PDF"
        >
          <FileDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Toggle Theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
    </div>
  );
};