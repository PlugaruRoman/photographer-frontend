import { axios } from "./api";

export const CountryService = {
  getCountries: async (): Promise<any> => axios.get(`/api/countries`).then((data) => data.data),
};
