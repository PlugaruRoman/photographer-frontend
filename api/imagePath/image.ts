import { axios } from "../api";

export type $Object = { [key: string]: any };

export const ImageService = {
  getImage: async ({ queryKey: [, params] }: $Object): Promise<any> =>
    axios.get(
      `http://localhost:1337/uploads/maciek_sulkowski_gmej_HJ_6k_VY_unsplash_a197338327.jpg`
    ),
};
