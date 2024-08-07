import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Data, initialState } from '../Types';

const useContentStore = create(persist((set) => ({
  setContent : (content:Data[]) => set((state:initialState) => ({ ...state.List, content })),
}), {
  name: 'content',
  getStorage: () => sessionStorage,
}));

export default useContentStore;