import { axios } from "../api";

export const AuthService = {
  createUser: async (data: any) =>
    axios.post("http://localhost:1337/api/auth/local/register", data),
  loginUser: async (data: any) =>
    axios.post("http://localhost:1337/api/auth/local", data),
};
