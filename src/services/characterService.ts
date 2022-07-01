import api from "./api";

const jwt = localStorage.getItem("jwt");

const findAllService = {
  allCharacters: () =>
    api.get("/character", {
      headers: {
        Authorization: `Bearer ${jwt}`,
        contentType: "application/json",
      },
    }),
};

const createService = {
  createCharacter: (values: object) =>
    api.post("/character/create", values, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        contentType: "application/json",
      },
    }),
};

const findMoreService = {
  moreCharacters: (nextUrl: string) =>
    api.get(nextUrl, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        contentType: "application/json",
      },
    }),
};

const findByIdService = {
  findByIdCharacter: (id: string) =>
    api.get(`/character/byIdPost/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        contentType: "application/json",
      },
    }),
};

const updateService = {
  updateCharacter: (values: object, id: string) =>
    api.patch(`/character/update/${id}`, values, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        contentType: "application/json",
      },
    }),
};

const deleteService = {
  deleteCharacter: (id: string) =>
    api.delete(`/character/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        contentType: "application/json",
      },
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
