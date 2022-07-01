import "./Card.css";

import { useState } from "react";
import Modals from "../Modals/Modals";
import swal from "sweetalert";

interface cardProps {
  character: {
    name: string;
    image: string;
    reality: string;
    identity: string;
    id: string;
    userName: string;
    avatar: string;
    userId: string;
  };
  updateCharacters: (arg: boolean) => void;
  userLogged: {
    avatar: string;
    email: string;
    name: string;
    _id: string;
  };
}

function Card({ character, updateCharacters, userLogged }: cardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function openModal() {
    if (userLogged._id === character.userId) {
      setIsModalOpen(true);
    } else {
      swal({
        title: "Erro",
        text: "Você só pode alterar o personagem que você criou.",
        icon: "error",
        timer: 7000,
      });
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function onEdit() {
    updateCharacters(true);
  }

  return (
    <>
      <div className="card" onClick={openModal}>
        <img src={character.image} alt="" className="character-image" />
        <div>
          <h2>{character.name}</h2>
          <p>{character.reality}</p>
          <p>{character.identity}</p>

          <span className="user-card">by: {character.userName}</span>
        </div>
      </div>

      <Modals
        isOpen={isModalOpen}
        closeModal={closeModal}
        onChanges={onEdit}
        type="editCharacter"
        title="Editar Personagem"
        btnName="Atualizar"
        id={character.id}
      />
    </>
  );
}

export default Card;
