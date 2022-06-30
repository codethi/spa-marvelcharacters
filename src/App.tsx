import { useState, useEffect } from "react";
import "./App.css";

import Card from "./components/Card/Card";
import Header from "./components/Header/Header";

interface Characters {
  identity: string;
  image: string;
  name: string;
  reality: string;
  id:number;
}

function App() {
  const [characters, setCharacters] = useState<Characters[]>([]);

  const updateCharacters = (refreshChar: number) => {};

  const getAllCharacters = async () => {
    const resp = await fetch(
      "https://api-marvelcharacters.herokuapp.com/characters",
      {
        method: "GET",
        headers: {
          contentType: "application/json",
        },
      }
    );
    const data = await resp.json();
    data.reverse();
    setCharacters(data);
  };

  useEffect(() => {
    getAllCharacters();
  }, [updateCharacters]);

  return (
    <>
      <Header updateCharacters={updateCharacters} />
      <section className="list-cards">
        {characters.map((character, index) => (
          <Card
            character={character}
            updateCharacters={updateCharacters}
            key={index}
          />
        ))}
      </section>
    </>
  );
}

export default App;
