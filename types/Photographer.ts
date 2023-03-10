export interface IPhotographerCard {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  about: string;
  city: string;
  company: string;
  facebook: string;
  firstname: string;
  instagram: string;
  lastname: string;
  phone: string;
  price: number;
  web: string;
  photo: any;
  user?: string;
  email: string;
}

export interface IPhotographerForm {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  city: string;
  company: string;
  price: number;
  about: string;
  facebook: string;
  instagram: string;
  web: string;
}
