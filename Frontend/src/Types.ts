export type Data = {
  _id: string;
  title: string;
  description: string;
  img: string;
  imgTitle: string;
  imgThumb: string;
  imgVertical: string;
  trailer: string;
  movie: string;
  duration: string;
  year: string;
  limit: string;
  genre: string;
  isSeries: boolean;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  profilePicture: string;
  myList: Data[];
};

export type initialState = {
  setuser: any;
  List: Data[];
  userInfo: User | null;
};
