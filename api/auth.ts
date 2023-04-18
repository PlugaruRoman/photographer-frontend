import { $Object } from "@/types/Object";
import { axios } from "./api";

export const AuthService = {
  createUser: async (data: $Object) => axios.post("/api/registration", data),
  loginUser: async (data: $Object) => axios.post("/api/login", data),
  logoutUser: async () => axios.post("/api/logout"),
};
