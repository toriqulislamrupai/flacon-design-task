import axios from "axios";

const axiosInstance = axios.create({
  
  //  baseURL: "/api", 
  baseURL: "/.netlify/functions/proxy/api/v1", // Proxying via Netlify 
  timeout: 5000,
});

export const fetchCategories = () => axiosInstance.get("/categories");

export const fetchProducts = () => axiosInstance.get("/shop/products");

export const fetchSingleProduct = (slug) =>
  axiosInstance.get(`/product/${slug}`);
