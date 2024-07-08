import React, { useEffect, useState } from "react";
import { Container, ContainerLogin } from "./styleCadastroAdmin";
import InputForm from "../../../Components/InputForm/indexInputForm";
import InputButton from "../../../Components/InputButton/indexInputButton";
import { createAdmin } from "../../../services/adminsServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import GifCaminhao from "../../../Components/BgdLogin/indexBgdLogin";
import { FaRegQuestionCircle } from "react-icons/fa";
import { marromEscuro } from "../../../utils/colors";
import ModalDeInfo from "../../../Modals/ModalDeInfo/indexModalDeInfo";

const CadastroAdmin: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [token, setToken] = useState("");
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmitRegister = async () => {
    if (!nome || !email || !senha) {
      toast.error("Todos os campos são obrigatórios.", {
        className: "toast-error",
        progressClassName: "toast-progress",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Por favor, insira um email válido.", {
        className: "toast-error",
        progressClassName: "toast-progress",
      });
      return;
    }

    if (senha.length < 8) {
      toast.error("A senha deve ter no mínimo 8 caracteres.", {
        className: "toast-error",
        progressClassName: "toast-progress",
      });
    }

    try {
      const novoAdmin = {
        NOME_USUARIO: nome,
        EMAIL: email,
        SENHA: senha,
        TOKEN: token,
      };

      const data = await createAdmin(novoAdmin);
      console.log("Admin criado com sucesso:", data);
      toast.success("Admin cadastrado com sucesso!", {
        className: "toast-success",
        progressClassName: "toast-progress",
      });
      setNome("");
      setEmail("");
      setSenha("");
      setToken("");
      navigate("/gerenciamento");
    } catch (error) {
      toast.error("Algo inesperado aconteceu. Por favor tente novamente.", {
        className: "toast-error",
        progressClassName: "toast-progress",
      });
      console.error(error, "erro");
    }
  };

  return (
    <Container>
      <ContainerLogin>
        <h1 className="title-login">Cadastro - Controle de Ponto</h1>
        <div className="form-login">
          <div className="login">
            <InputForm
              type="text"
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="login">
            <InputForm
              type="text"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="senha">
            <InputForm
              type="password"
              label="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div
            className="senha"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: '1rem'
            }}
          >
            <InputForm
              type="text"
              label="Token Cadastro"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <FaRegQuestionCircle
                style={{fontSize: '34px', color: `${marromEscuro}`, cursor: 'pointer', marginBottom: '12px'}}
                onClick={() => setOpenModalInfo(true)}
            />
          </div>
        </div>
        <div className="buttons">
          <InputButton text="Cadastrar" onClick={handleSubmitRegister} />
        </div>
      </ContainerLogin>
      {openModalInfo && (
        <ModalDeInfo
            onClose={() => setOpenModalInfo(false)}
            isOpen={openModalInfo}
        />
      )}
    </Container>
  );
};

export default CadastroAdmin;
