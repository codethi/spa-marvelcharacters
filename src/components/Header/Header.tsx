import "./Header.css";
import logo from "../../images/logo-marvel.png";
import banner from "../../images/banner.jpg";
import Modals from "../Modals/Modals";
import { useState } from "react";

interface headerProps {
  updateCharacters: (arg: boolean) => void;
}

function Header({ updateCharacters }: headerProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function onCreate() {
    updateCharacters(true);
  }

  return (
    <header>
      <img className="header-background" src={banner} alt="" />
      <section>
        <div>
          <img className="header-logo" src={logo} alt="" />
          <h1>Personagens</h1>
        </div>
        <button onClick={openModal}>Criar Personagem</button>
      </section>

      <Modals
        isOpen={isModalOpen}
        closeModal={closeModal}
        onChanges={onCreate}
        type="createCharacter"
        title="Criar Personagem"
        btnName="Salvar"
      />
    </header>
  );
}

export default Header;
