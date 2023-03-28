import { axios } from "./api";

export const CitiesService = {
  getCities: async (): Promise<any> => axios.get(`/api/cities`).then((data) => data.data),
};
