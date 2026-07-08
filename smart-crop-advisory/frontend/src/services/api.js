import axios from "axios";

// Create one central Axios instance that all our API calls will use.
// This keeps the base URL and auth header logic in one place.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Before every request, automatically attach the JWT token (if we have one)
// so the backend knows who is making the request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
