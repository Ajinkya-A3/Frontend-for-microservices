import axios from "axios";

export const userAPI = axios.create({
  baseURL: import.meta.env.VITE_API_USER,
  withCredentials: false,
});

export const productAPI = axios.create({
  baseURL: import.meta.env.VITE_API_PRODUCT, 
});

export const reviewAPI = axios.create({
  baseURL: import.meta.env.VITE_API_REVIEW,
  headers: {
    'Content-Type': 'application/json',
  }
});