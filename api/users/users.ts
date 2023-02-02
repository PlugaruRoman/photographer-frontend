import { AxiosResponse } from "axios";
import { axios } from "../api";

export const UsersService = {
  getUsers: async ({
    queryKey: [, params],
  }: any): Promise<AxiosResponse<any>> =>
    axios.get(`http://localhost:1337/api/users`, {
      headers: {
        Authorization: "Bearer " + params,
      },
    }),
};
