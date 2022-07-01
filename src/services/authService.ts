import api from "./api";

const loginService = {
  loginValues: (values: {}) => api.post("/auth/login", values),
};

const registerService = {
  registerValues: (values: {}) => api.post("/user/create", values),
};

export {
  loginService,
  registerService,
};
