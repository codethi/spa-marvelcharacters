import "./Header.css";
import logo from "../../images/logo-marvel.png";
import banner from "../../images/banner.jpg";
import Modals from "../Modals/Modals";
import { useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface headerProps {
  updateCharacters: (arg: boolean) => void;
}

function Header({ updateCharacters }: headerProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  let navigate = useNavigate();

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function onCreate() {
    updateCharacters(true);
  }

  function logout() {
    localStorage.removeItem("jwt");
    navigate("/login");
  }

  return (
    <header>
      <RiLogoutCircleLine className="header-logout" onClick={logout} />
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
        id=""
      />
    </header>
  );
}

export default Header;
