export interface ICategory {
  id: number;
  title: string;
}
export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  createdAt: string;
  category: { id: number };
}

export interface IBooking {
  id: string;
  bookDate: string;
  bookTime: string;
  childCode: string;
  cheerCode: string;
  createDated: string;
  createBy: string;
}

export interface IUser {
  id: string;
  username: string;
}
