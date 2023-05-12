export interface IPhotographerCard {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  city: string;
  company?: string;
  price?: number;
  hour?: number;
  about?: string;
  facebook?: string;
  instagram?: string;
  web?: string;
  user: string;
  twitter?: string;
  viewsCount: number;
  avatar?: string;
  createdAt: string;
  updatedAt?: string;
}
export interface IPhotographerForm {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  city: string;
  company: string;
  price: number;
  hour: number;
  about: string;
  facebook: string;
  instagram: string;
  twitter: string;
  web: string;
  avatar?: string;
  _id: string;
}
