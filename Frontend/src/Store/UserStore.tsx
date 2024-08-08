import { create } from 'zustand';
import { Data, User } from '../Types';
import Cookie from 'js-cookie';

export interface UserStore {
  user: User;
  setuser: (userData: User) => void;
  getUser: () => void;
  clearUser: () => void;
  setToken: (token: string) => void;
  getToken: () => string | undefined;
  addToList: (newFavorite: Data) => void;
  removeFromList: (removeFavorite: Data) => void;
}

const useUserStore = create((set) => ({
  user: {
    _id: '',
    username: '',
    email: '',
    password: '',
    isAdmin: false,
    profilePicture: '',
    myList: [],
  },
  setuser: (userData: User) => set(Cookie.set('user', JSON.stringify(userData))),
  getUser: () => set(Cookie.get('user')),
  clearUser: () => set(Cookie.remove('user')),
  setToken: (token: string) => set(Cookie.set('token', token)),
  getToken: () => set(Cookie.get('token')),
  addToList: (newFavorite: Data) => {
    const User = Cookie.get('user') as unknown as User;
    const newList = User.myList ? [...User.myList, newFavorite] : [newFavorite];
    set({ myList: newList });
  },
  removeFromList: (removeFavorite: Data) =>{
    const User = Cookie.get('user') as unknown as User;
    const newList = User.myList ? User.myList.filter((item) => item.title !== removeFavorite.title) : [];
    set({ myList: newList });
  },
}));

export default useUserStore;
