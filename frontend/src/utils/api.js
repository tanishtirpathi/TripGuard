import axios from "axios";

const baseURL = "http://localhost:5000/";
//tripguard.onrender.com
const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
