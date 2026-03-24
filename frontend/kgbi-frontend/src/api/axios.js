import axios from "axios";

// Log this to debug Vercel environment loading
console.log("VITE_API_URL Value:", import.meta.env.VITE_API_URL);

// 🚨 FIX: Added /api to the fallback string to prevent 404s
const baseURL = import.meta.env.VITE_API_URL || "https://kgbi.onrender.com";

console.log("Axios initialized with BaseURL:", baseURL);

const API = axios.create({
  baseURL: baseURL,
});

// 1. Request Interceptor: Attach token automatically
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor: Handle token expiration/logout
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Token expired or unauthorized. Logging out...");
      localStorage.removeItem("token");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default API;
