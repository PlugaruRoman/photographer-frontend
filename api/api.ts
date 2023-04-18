import $axios from "axios";

export const axios = $axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_FS_URL,
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
