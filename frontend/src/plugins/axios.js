import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_AXIOS_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default API;
