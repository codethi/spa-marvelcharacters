import "./Register.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

interface userObj {
  avatar: string;
  email: string;
  name: string;
  password: string;
}

function Register() {
  const [values, setValues] = useState({
    email: "",
    name: "",
    avatar: "",
    password: "",
  });

  const baseURL = "http://localhost:3001";
  let navigate = useNavigate();

  const handleChangeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValue: userObj) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const registerUser = async (event: any) => {
    event.preventDefault();

    const response = await fetch(`${baseURL}/user/create`, {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json",
      }),
      body: JSON.stringify(values),
    });
    const result = await response.json();

    const jwt = result.token;

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      swal({
        title: "Usuário cadastrado com sucesso! Seja bem vindo.",
        icon: "success",
        timer: 7000,
      });
      navigate("/");
    } else {
      swal({
        title: "Erro",
        text: `${result.message}`,
        icon: "error",
        timer: 7000,
      });
    }
  };

  return (
    <section className="login-container">
      <div className="login-card">
        <h2>Cadastro</h2>
        <form onSubmit={registerUser}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Digite seu nome"
            onChange={handleChangeValues}
          />
          <input
            type="text"
            name="avatar"
            id="avatar"
            placeholder="Insira o link da sua foto"
            onChange={handleChangeValues}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu Email"
            onChange={handleChangeValues}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
            onChange={handleChangeValues}
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </section>
  );
}

export default Register;
