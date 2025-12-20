import axios from "axios";

const baseURL = "https://tripguard.onrender.com";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
