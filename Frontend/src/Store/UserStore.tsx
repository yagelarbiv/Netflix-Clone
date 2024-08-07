import { create } from 'zustand';
import { Data, User } from '../Types';
import Cookie from 'js-cookie';

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
  setuser: (userData: User) => set(Cookie.set('user', userData.tostring())),
  getUser: () => set(Cookie.get('user')),
  clearUser: () => set(Cookie.remove('user')),
  addToList: (newFavorite: Data) => {
    const User = Cookie.get('user') as unknown as User;
    const newList = User.myList ? [...User.myList, newFavorite] : [newFavorite];
    set({ myList: newList });
  },
  removeFromList: (removeFavorite: Data) =>{
    const User = Cookie.get('user') as unknown as User;
    const newList = User.myList ? User.myList.filter((item) => item._id !== removeFavorite._id) : [];
    set({ myList: newList });
  },
}))

export default useUserStore;
