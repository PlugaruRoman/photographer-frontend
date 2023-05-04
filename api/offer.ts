import { $Object } from "@/types/Object";
import { axios } from "./api";

export const PackagesService = {
  getPackages: async (): Promise<any> => axios.get(`/api/packages`).then((data) => data.data),
  createPackage: async (data: any) => axios.post(`/api/packages`, data),
  getPackage: async ({ queryKey: [, params] }: $Object): Promise<any> =>
    axios.get(`/api/packages/${params}`).then((data) => data.data),
};
