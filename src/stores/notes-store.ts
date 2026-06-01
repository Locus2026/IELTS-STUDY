import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NoteItem {
  id: string;
  type: 'vocab' | 'grammar' | 'test-point' | 'sentence';
  content: string;
  translation?: string;
  source?: string;
  createdAt: string;
}

interface NotesStore {
  items: NoteItem[];
  addNote: (item: Omit<NoteItem, 'id'|'createdAt'>) => void;
  removeNote: (id: string) => void;
  clearAll: () => void;
  _hydrated: boolean;
  hydrate: () => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      items: [],
      _hydrated: false,
      addNote: (item) => set((s) => ({
        items: [{ ...item, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...s.items],
      })),
      removeNote: (id) => set((s) => ({ items: s.items.filter(i => i.id !== id) })),
      clearAll: () => set({ items: [] }),
      hydrate: () => set({ _hydrated: true }),
    }),
    {
      name: 'ielts-notes',
      onRehydrateStorage: () => (state) => { if (state) state.hydrate(); },
    }
  )
);
