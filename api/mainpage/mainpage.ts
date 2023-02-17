import { AxiosResponse } from "axios";
import { axios } from "../api";

export type $Object = { [key: string]: any };

export const MainPageService = {
  getMainPhoto: async ({ queryKey: [, params] }: $Object): Promise<any> =>
    axios.get(`/api/upload/files/`).then((data) => data.data),
};
