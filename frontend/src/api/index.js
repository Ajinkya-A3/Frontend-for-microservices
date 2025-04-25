import axios from "axios";

export const userAPI = axios.create({
  baseURL: import.meta.env.VITE_API_USER,
  withCredentials: true,
});
