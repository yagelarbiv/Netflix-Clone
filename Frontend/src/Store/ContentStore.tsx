import { create } from 'zustand';
import Cookie from 'js-cookie';
import { Data } from '../Types';

const useContentStore = create((set) => ({
  setContent : (content:Data[]) => set(Cookie.set('content', JSON.stringify(content))),
  getCookie: () => Cookie.get('content'),
}));

export default useContentStore;