import { axios } from "./api";
import { $Object } from "@/types/Object";

export const PhotographersService = {
  getPhotographers: async (): Promise<any> => axios.get(`/api/profiles`).then((data) => data.data),
  getPhotographer: async ({ queryKey: [, params] }: $Object): Promise<any> =>
    axios.get(`/api/profiles/${params}`).then((data) => data.data),
  createPhotographer: async (data: any) => axios.post(`/api/profiles`, data),
};
