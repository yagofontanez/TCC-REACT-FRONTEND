import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, ContainerLogin } from "./styleLogin";
import { loginAdmin } from "../../services/adminsServices";
import InputForm from "../../Components/InputForm/indexInputForm";
import InputButton from "../../Components/InputButton/indexInputButton";
import { ToastContainer, toast } from "react-toastify";
import BgdLogin from "../../Components/BgdLogin/indexBgdLogin";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoToDash = async () => {
    if (email === "" || password === "") {
      toast.error("Todos os campos são obrigatórios");
      return;
    }

    try {
      const response = await loginAdmin(email, password);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        navigate("/gerenciamento");
      } else {
        toast.error("Algo inesperado aconteceu. Tente novamente");
      }
    } catch (error) {
      toast.error("Email ou senha inválidos");
    }
  };

  const pressEnterToSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGoToDash();
    }
  };

  return (
    <Container>
      <ContainerLogin onKeyDown={pressEnterToSubmit}>
        <div className="container-bgd-separator">
          <p></p>
        </div>
        <div className="cjota">
          <h1 className="title-login">Login - Controle de Ponto</h1>
          <div className="form-login">
            <div className="login">
              <InputForm
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="senha">
              <InputForm
                type="password"
                label="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="buttons">
            <InputButton text="Entrar" onClick={handleGoToDash} />
          </div>
        </div>
      </ContainerLogin>
      <ToastContainer />
    </Container>
  );
};

export default Login;
