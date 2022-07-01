import api from "./api";
import swal from "sweetalert";

const loginService = {
  loginValues: (values: {}) =>
    api
      .post("/auth/login", values)
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        swal({
          title: "Erro",
          text: `${error.response.data.message}`,
          icon: "error",
          timer: 7000,
        });
      }),
};

const registerService = {
  registerValues: (values: {}) =>
    api
      .post("/user/create", values)
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        swal({
          title: "Erro",
          text: `${error.response.data.message}`,
          icon: "error",
          timer: 7000,
        });
      }),
};

const userLoggedService = {
  userLogged: () =>
    api
      .get("/user/findById")
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        swal({
          title: "Erro",
          text: `${error.response.data.message}`,
          icon: "error",
          timer: 7000,
        });
      }),
};

export { loginService, registerService, userLoggedService };
