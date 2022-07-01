import "./Card.css";

import { useState } from "react";
import Modals from "../Modals/Modals";

interface cardProps {
  character: {
    name: string;
    image: string;
    reality: string;
    identity: string;
    id: string;
    userName:string;
    avatar: string;
  };
  updateCharacters: (arg: boolean) => void;
}

function Card({ character, updateCharacters }: cardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function openModal() {
    setIsModalOpen(true);
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
        <img src={character.image} alt="" className="character-image"/>
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
