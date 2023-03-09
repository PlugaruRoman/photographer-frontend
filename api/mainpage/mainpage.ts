import { axios } from "../api";

export const MainPageService = {
  getMainPhoto: async (): Promise<any> => axios.get(`/api/upload/files/`).then((data) => data.data),
};
