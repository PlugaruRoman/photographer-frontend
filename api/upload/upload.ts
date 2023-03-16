import { axios } from "../api";

export const UploadService = {
  uploadPhoto: async (formData: FormData) => {
    return axios.post(`/api/upload/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
