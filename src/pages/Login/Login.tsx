import "./Login.css";

import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginService } from "../../services/authService";

interface userLoginObj {
  email: string;
  password: string;
}

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleChangeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValue: userLoginObj) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };
  const loginUser = async (event: any) => {
    event.preventDefault();
    const response = await loginService.loginValues(values);
    const jwt = response.data.token;

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      swal({
        title: "Seja bem vindo!",
        icon: "success",
        timer: 7000,
      });
      navigate("/");
    }
  };

  return (
    <section className="login-container">
      <div className="login-card">
        <h2>Entrar</h2>
        <form onSubmit={loginUser}>
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
          <button type="submit">Entrar</button>
        </form>
        <p>
          Não tem uma conta?{" "}
          <Link className="link-register" to="/register">
            Cadastre-se
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
