import { create } from 'zustand';

interface EditorStore {
  content: string;
  editorRef: any;
  setContent: (content: string) => void;
  setEditorRef: (ref: any) => void;
}

export const useStore = create<EditorStore>((set) => ({
  content: '',
  editorRef: null,
  setContent: (content) => set({ content }),
  setEditorRef: (ref) => set({ editorRef: ref }),
}));