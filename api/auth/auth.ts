import { $Object } from "@/types/Object";
import { axios } from "../api";

export const AuthService = {
  createUser: async (data: $Object) => axios.post("/api/auth/local/register", data),
  loginUser: async (data: $Object) => axios.post("/api/auth/local", data),
};
