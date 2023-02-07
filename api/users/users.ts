import { AxiosResponse } from "axios";
import { axios } from "../api";

export type $Object = { [key: string]: any };
export interface UserProps {
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

export const UsersService = {
  getUsers: async ({ queryKey: [, params] }: $Object): Promise<any> =>
    axios.get(`/api/users`).then((data) => data.data),
};
