import { AxiosResponse } from "axios";
import { axios } from "../api";

export type $Object = { [key: string]: any };
export interface UserProps {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Results<T> {
  count: number;
  current_page: number;
  per_page: number;
  results: T[];
  total_pages: number;
  total_results: number;
  total: number;
}

export const UsersService = {
  getUsers: async ({ queryKey: [, params] }: $Object): Promise<any> =>
    axios.get(`/api/cards`).then((data) => data.data),
  getCities: async ({ queryKey: [, params] }: $Object): Promise<any> =>
    axios.get(`/api/cities`).then((data) => data.data),
  getPhoto: async ({ queryKey: [, params] }: $Object): Promise<any> =>
    axios.get(`/api/upload/files/`).then((data) => data.data),
  updateUsers: async (data: any) =>
    axios.post(`/api/cards`, {
      data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    }),
  uploadPhotos: async (data: any) =>
    axios.post(`/api/cards`, {
      data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    }),
};
