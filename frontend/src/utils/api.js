import axios from "axios";

const baseURL = "http://localhost:5000";

const api = axios.create({
  baseURL,
  withCredentials: true, // 🔥 Required for cookies
});

export default api;
