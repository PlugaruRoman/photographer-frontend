import $axios from "axios";

export const axios = $axios.create();

axios.defaults.baseURL = process.env.REACT_APP_BASE_API;
