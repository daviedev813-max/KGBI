import axios from "axios";

const API = axios.create({
  baseURL: "https://kgbi.onrender.com/api",
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
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Response Interceptor: Handle token expiration/logout
API.interceptors.response.use(
  (response) => {
    // If the request is successful, just return the response
    return response;
  },
  (error) => {
    // Check if the error is a 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.error("Token expired or unauthorized. Logging out...");
      
      // Clear auth data
      localStorage.removeItem("token");
      
      // Redirect to login (standard way for vanilla JS/React)
      window.location.href = "/login"; 
    }
    
    return Promise.reject(error);
  }
);

export default API;
