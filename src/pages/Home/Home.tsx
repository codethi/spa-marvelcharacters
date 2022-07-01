import "./Home.css";

import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import {
  findAllService,
  findMoreService,
} from "../../services/characterService";

import { userLoggedService } from "../../services/authService";

interface Characters {
  identity: string;
  image: string;
  name: string;
  reality: string;
  id: string;
  userName: string;
  avatar: string;
  userId: string;
}

interface User {
  avatar: string;
  email: string;
  name: string;
  _id: string;
}

function Home() {
  const [characters, setCharacters] = useState<Characters[]>([]);
  const [refreshCharacters, setRefreshCharacters] = useState(false);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [userLogged, setUserLogged] = useState<User>({
    avatar: "",
    email: "",
    name: "",
    _id: "",
  });
  const jwt = localStorage.getItem("jwt");
  let navigate = useNavigate();

  const updateCharacters = (refreshChar: boolean) => {
    setRefreshCharacters(refreshChar);
    setTimeout(() => {
      setRefreshCharacters(false);
    }, 100);
  };

  const getAllCharacters = async () => {
    if (!jwt) {
      swal({
        title: "Erro",
        text: "Faça o login antes de entrar no página inicial!",
        icon: "error",
        timer: 7000,
      });
      navigate("/login");
    } else {
      const response = await findAllService.allCharacters();

      if (response.status === 204) {
        swal({
          title: "Info",
          text: "Não existe nenhum personagem cadastrado!",
          icon: "info",
          timer: 7000,
        });
      } else {
        setCharacters(response.data.results);
        setNextUrl(response.data.nextUrl);
      }
    }
  };

  async function viewMore() {
    if (nextUrl != null) {
      const response = await findMoreService.moreCharacters(nextUrl);
      setCharacters([...characters, ...response.data.results]);
      setNextUrl(response.data.nextUrl);
    } else {
      swal({
        title: "Info",
        text: "Todos os personagens foram listados!",
        icon: "info",
        timer: 7000,
      });

      const btnViewMore = document.querySelector(
        ".btn-view-more"
      ) as HTMLInputElement | null;

      btnViewMore ? (btnViewMore.style.display = "none") : "";
    }
  }

  async function getUserLogged() {
    const response = await userLoggedService.userLogged();
    setUserLogged(response.data);
  }

  useEffect(() => {
    getAllCharacters();
    getUserLogged();
  }, [refreshCharacters]);

  return (
    <main>
      <Header updateCharacters={updateCharacters} />
      <section className="list-cards">
        <div className="cards-container">
          {characters.map((character, index) => (
            <Card
              character={character}
              updateCharacters={updateCharacters}
              key={index}
              userLogged={userLogged}
            />
          ))}
        </div>

        <button onClick={viewMore} className="btn-view-more">
          Ver mais
        </button>
      </section>
    </main>
  );
}

export default Home;
