import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Content } from "./styleEdicaoAdmin";
import CabecalhoTela from "../../Components/CabecalhoTela/indexCabecalhoTela";
import InputForm from "../../Components/InputForm/indexInputForm";
import InputButton from "../../Components/InputButton/indexInputButton";
import { getAdmin, updateAdmin } from "../../services/adminsServices";

const EdicaoAdmin: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [senhUsuario, setSenhaUsuario] = useState("");

  useEffect(() => {
    if (id) {
      const fetchAdmin = async () => {
        try {
          const admin = await getAdmin(id);
          setNomeUsuario(admin.NOME_USUARIO);
          setEmailUsuario(admin.EMAIL);
          setSenhaUsuario(admin.SENHA);
        } catch (error) {
          console.error("Erro ao carregar admin:", error);
          toast.error("Erro ao carregar admin");
        }
      };
      fetchAdmin();
    }
  }, [id]);

  const handleSubmitForm = async () => {
    try {
      const adminData = {
        NOME_USUARIO: nomeUsuario,
        EMAIL: emailUsuario,
        SENHA: senhUsuario,
      };

      if (id) {
        await updateAdmin(id, adminData);
        toast.success("Admin atualizado com sucesso!");
      } else {
        toast.error("ID do admin não encontrado.");
      }

      navigate("/gerenciamento");
    } catch (e) {
      console.error("Erro ao atualizar Admin:", e);
      toast.error("Erro ao atualizar Admin");
    }
  };

  return (
    <Container>
      <CabecalhoTela />
      <Content>
        <div className="container-cadastro-faculdade">
          <h1 className="title">Editar Usuario</h1>
          <div className="form-cadastro">
            <InputForm
              type="text"
              label="Nome de Usuário"
              value={nomeUsuario}
              onChange={(e: any) => setNomeUsuario(e.target.value)}
            />
            <InputForm
              type="text"
              label="Email"
              value={emailUsuario}
              onChange={(e: any) => {
                setEmailUsuario(e.target.value);
              }}
            />
            <InputForm
              type="password"
              label="Senha"
              value={senhUsuario}
              onChange={(e: any) => {
                setSenhaUsuario(e.target.value);
              }}
            />
          </div>
          <InputButton text="Salvar" onClick={handleSubmitForm} />
        </div>
      </Content>
    </Container>
  );
};

export default EdicaoAdmin;
