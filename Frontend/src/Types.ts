export type Data = {
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
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  profilePicture: string;
  myList: Data[];
};