import $axios from "axios";

export const axios = $axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_FS_URL,
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("Token")}`;
  return config;
});

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      const response = await axios.get(`${process.env.NEXT_PUBLIC_FS_URL}/api/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("Token", response.data.accessToken);
      return axios.request(originalRequest);
    }
    throw error;
  },
);
