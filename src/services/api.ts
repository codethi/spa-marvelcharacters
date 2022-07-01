import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

/* api.interceptors.request.use((config: any) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (error) {}
}); */

export default api;
