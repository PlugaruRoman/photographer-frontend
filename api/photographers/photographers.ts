import { AxiosResponse } from "axios";
import { axios } from "../api";

export type $Object = { [key: string]: any };
export interface PhotographersProps {
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

export const PhotographersService = {
  getPhotographers: async ({ queryKey: [, params] }: $Object): Promise<any> =>
    axios.get(`/api/photographers`).then((data) => data.data),
  getPhotographer: async ({ queryKey: [, params] }: $Object): Promise<any> =>
    axios.get(`/api/photographers/${params}`).then((data) => data.data),
  getCities: async ({ queryKey: [, params] }: $Object): Promise<any> =>
    axios.get(`/api/cities`).then((data) => data.data),
  getPhoto: async ({ queryKey: [, params] }: $Object): Promise<any> =>
    axios.get(`/api/upload/files/`).then((data) => data.data),
  updatePhotographers: async (data: any) =>
    axios.post(`/api/photographers`, {
      data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    }),

  uploadPhoto: async (formData: FormData) => {
    return axios.post(`/api/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getPhoto2: async ({ queryKey: [, params] }: $Object): Promise<any> =>
    axios.get(`/api/imgs`).then((data) => data.data),
};

export const attachments = {
  upload: async <T = FormData, R = any>(bodyData: T) => {
    await axios.post<T, AxiosResponse<R>>(`/api/upload`, {
      bodyData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
