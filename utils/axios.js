import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // ⬅️ ensures cookies like JWT are sent with requests
});

export default api;
