import "./Modals.css";

import Modal from "react-modal";
import { BiX } from "react-icons/bi";
import { useState, useEffect } from "react";
import swal from "sweetalert";

Modal.setAppElement("#root");

interface modalsProps {
  isOpen: boolean;
  closeModal: any;
  onChanges: any;
  type: string;
  title: string;
  btnName: string;
  id?: number;
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
  const [values, setValues] = useState();
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

  const baseURL = "https://api-marvelcharacters.onrender.com/characters";

  const getCharacterById = async () => {
    const resp = await fetch(`${baseURL}/${id}`, {
      method: "GET",
      headers: {
        contentType: "application/json",
      },
    });
    const data = await resp.json();

    setCharacter(data);
  };

  const handleChangeValues = (event: any) => {
    setValues((prevValue: any) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const createCharacter = async () => {
    const response = await fetch(`${baseURL}`, {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json",
      }),
      body: JSON.stringify(values),
    });

    const data = await response.json();

    console.log(data);
    if (data) {
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
    const response = await fetch(`${baseURL}/${formDetails.id}`, {
      method: "PATCH",
      headers: new Headers({
        "Content-type": "application/json",
      }),
      body: JSON.stringify(values),
    });

    swal({
      text: "Personagem atualizado com sucesso!",
      icon: "success",
      timer: 7000,
    });

    onChanges(response);
    closeModal();
  };

  const deleteCharacter = async () => {
    const response = await fetch(`${baseURL}/${formDetails.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });

    swal({
      text: "Personagem apagado com sucesso!",
      icon: "success",
      timer: 7000,
    });

    onChanges(response);
    closeModal();
  };

  function submitFunction(event: any) {
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

    id ? getCharacterById() : "";
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
