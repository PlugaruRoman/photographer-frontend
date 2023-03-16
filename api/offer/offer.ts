import { axios } from "../api";

export const PackagesService = {
  getPackages: async (): Promise<any> =>
    axios.get(`/api/service-packages`).then((data) => data.data),
  createPackage: async (data: any) =>
    axios.post(`/api/service-packages`, {
      data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    }),
};
