import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EditorState {
  content: string;
  isDarkMode: boolean;
  setContent: (content: string) => void;
  toggleTheme: () => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      content: '# Welcome to the Markdown Editor\n\nStart typing to see the preview...',
      isDarkMode: false,
      setContent: (content) => set({ content }),
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'markdown-editor-storage',
    }
  )
);