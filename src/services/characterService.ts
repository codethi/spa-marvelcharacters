import api from "./api";
import swal from "sweetalert";

const findAllService = {
  allCharacters: () =>
    api
      .get("/character")
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

const createService = {
  createCharacter: (values: object) =>
    api
      .post("/character/create", values)
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

const findMoreService = {
  moreCharacters: (nextUrl: string) =>
    api
      .get(nextUrl)
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

const findByIdService = {
  findByIdCharacter: (id: string) =>
    api
      .get(`/character/byIdPost/${id}`)
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

const updateService = {
  updateCharacter: (values: object, id: string) =>
    api
      .patch(`/character/update/${id}`, values)
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

const deleteService = {
  deleteCharacter: (id: string) =>
    api
      .delete(`/character/delete/${id}`)
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

export {
  findAllService,
  createService,
  findMoreService,
  findByIdService,
  updateService,
  deleteService,
};
