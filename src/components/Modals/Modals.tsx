import "./Modals.css";

import Modal from "react-modal";
import { BiX } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import {
  createService,
  findByIdService,
  updateService,
  deleteService,
} from "../../services/characterService";

Modal.setAppElement("#root");

interface modalsProps {
  isOpen: boolean;
  closeModal: any;
  onChanges: any;
  type: string;
  title: string;
  btnName: string;
  id: string;
}

interface characterObj {
  identity: string;
  image: string;
  name: string;
  reality: string;
}

function Modals({
  isOpen,
  closeModal,
  onChanges,
  type,
  title,
  btnName,
  id,
}: modalsProps) {
  const [formDetails, setFormDetails] = useState({
    id,
    title,
    btnName,
    type,
  });
  const [character, setCharacter] = useState({
    image: "",
    name: "",
    reality: "",
    identity: "",
  });

  const baseURL = "http://localhost:3001/character";

  const getCharacterById = async () => {
    const response = await findByIdService.findByIdCharacter(id);
    setCharacter(response.data);
  };

  const handleChangeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacter((prevValue: characterObj) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const createCharacter = async () => {
    const response = await createService.createCharacter(character);

    if (response.status === 200) {
      swal({
        text: "Personagem criado com sucesso!",
        icon: "success",
        timer: 7000,
      });
      onChanges(response);
      closeModal();
    }
  };

  const editCharacter = async () => {
    const response = await updateService.updateCharacter(character, id);

    swal({
      text: "Personagem atualizado com sucesso!",
      icon: "success",
      timer: 7000,
    });

    onChanges(response);
    closeModal();
  };

  const deleteCharacter = async () => {
    const response = await deleteService.deleteCharacter(id);

    swal({
      text: "Personagem apagado com sucesso!",
      icon: "success",
      timer: 7000,
    });

    onChanges(response);
    closeModal();
  };

  function submitFunction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    switch (type) {
      case "createCharacter":
        return createCharacter();
      case "editCharacter":
        return editCharacter();
    }
  }

  function deleteModalOpen() {
    swal({
      title: "Apagar Personagem?",
      icon: "error",
      buttons: ["Não", "Sim"],
    }).then((resp) => {
      if (resp) {
        deleteCharacter();
      }
    });
  }

  useEffect(() => {
    setFormDetails({
      id: id,
      title: title,
      type: type,
      btnName: btnName,
    });
    type === "editCharacter" && isOpen ? getCharacterById() : "";

    type === "createCharacter"
      ? setCharacter({ image: "", name: "", reality: "", identity: "" })
      : "";
  }, [isOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        overlayClassName="overley-react-modal"
        className="content-react-modal"
      >
        <button
          type="button"
          className="close-modal-button"
          onClick={closeModal}
        >
          <BiX />
        </button>
        <h2 className="modal-title">{formDetails.title}</h2>

        <form onSubmit={submitFunction}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nome do Personagem"
            onChange={handleChangeValues}
            defaultValue={character.name}
          />
          <input
            type="text"
            name="image"
            id="image"
            placeholder="Imagem do Personagem"
            onChange={handleChangeValues}
            defaultValue={character.image}
          />
          <input
            type="text"
            name="reality"
            id="reality"
            placeholder="Realidade do Personagem"
            onChange={handleChangeValues}
            defaultValue={character.reality}
          />
          <input
            type="text"
            name="identity"
            id="identity"
            placeholder="Identidade do Personagem"
            onChange={handleChangeValues}
            defaultValue={character.identity}
          />

          {<button type="submit">{formDetails.btnName}</button>}
        </form>

        {type === "editCharacter" ? (
          <div className="delete-character">
            <span>ou</span>
            <button onClick={deleteModalOpen}>Apagar</button>
          </div>
        ) : (
          ""
        )}
      </Modal>
    </>
  );
}

export default Modals;
