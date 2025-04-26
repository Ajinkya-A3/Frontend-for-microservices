import axios from "axios";

export const userAPI = axios.create({
  baseURL: import.meta.env.VITE_API_USER,
  withCredentials: false,
});
export const productAPI = axios.create({
  baseURL: import.meta.env.VITE_API_PRODUCT, // Example: http://localhost:5000/api/products
});