import { axios } from "../api";
import { $Object } from "@/types/Object";

export const PhotographersService = {
  getPhotographers: async (): Promise<any> =>
    axios.get(`/api/photographers`).then((data) => data.data),
  getPhotographer: async ({ queryKey: [, params] }: $Object): Promise<any> =>
    axios.get(`/api/photographers/${params}`).then((data) => data.data),
  getCardPhoto: async (): Promise<any> => axios.get(`/api/upload/files`).then((data) => data.data),
  createPhotographer: async (data: any) =>
    axios.post(`/api/photographers`, {
      data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    }),
};
