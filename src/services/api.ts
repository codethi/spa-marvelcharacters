import axios from "axios";
import swal from "sweetalert";

const api = axios.create({
  baseURL: "https://api-marvelcharacter.herokuapp.com",
});

api.interceptors.request.use((config: any) => {
  try {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error: any) {
    swal({
      title: "Erro",
      text: `${error.response.data.message}`,
      icon: "error",
      timer: 7000,
    });
  }
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      if (localStorage.getItem("jwt") !== null) {
        localStorage.removeItem("jwt");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
