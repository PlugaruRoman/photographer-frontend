import { axios } from "../api";

export const AuthService = {
  createUser: async (data: any) => axios.post("/api/auth/local/register", data),
  loginUser: async (data: any) => axios.post("/api/auth/local", data),
};
