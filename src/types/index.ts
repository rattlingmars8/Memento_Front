export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  email: string;
  username: string;
  avatar: string; 
};

export type IUserLoggedIn = {
  user: IUser;
  access_token: string;
};

export type INewUser = {
  username: string;
  email: string;
  password: string;
};


export type ImageOnFeed = {
  owner: IUser,
  id: number,
  title: string,
  cloudinary_url: string
  edited_cloudinary_url:  null | string
  created_at: string
  updated_at: string
  rating: string
  likes: number
  tags: string[]
  comments: number
}
