import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import { Data, User } from '../Types';

const useUserStore = create(persist((set) => ({
  user: {
    _id: '',
    username: '',
    email: '',
    password: '',
    isAdmin: false,
    profilePicture: '',
    myList: [],
  },
  setuser: (userData: User) => set({ user: userData }),
  clearUser: () => set({ user: null }),
  addToList: (newFavorite: Data, user: User) => {
    const newList = [...user.myList, newFavorite];
    set({ myList: newList });
  },
  removeFromList: (removeFavorite: Data, user: User) =>{
    const newList = user.myList.filter((movie) => movie._id !== removeFavorite._id);
    set({ myList: newList });
  },
}),{
name: 'userStorage', 
getStorage: () => sessionStorage
}))


export default useUserStore;
