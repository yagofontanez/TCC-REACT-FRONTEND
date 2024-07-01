import React, { useEffect, useState } from "react";
import CabecalhoTela from "../../../Components/CabecalhoTela/indexCabecalhoTela";
import InputForm from "../../../Components/InputForm/indexInputForm";
import InputButton from "../../../Components/InputButton/indexInputButton";
import { toast } from "react-toastify";
import { mascaraCPF, mascaraTelefone } from "../../../utils/fn";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Content } from "./styleCadastroMotoristas";
import { Motorista, createMotorista, getMotorista, getMotoristas, updateMotorista } from "../../../services/motoristasService";
import ModalPontos from "../../../Modals/ModalPontos/indexModalPontos";

const CadastroMotoristas: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [nomeMotorista, setNomeMotorista] = useState("");
  const [sobrenomeMotorista, setSobrenomeMotorista] = useState("");
  const [CPFMotorista, setCPFMotorista] = useState("");
  const [emailMotorista, setEmailMotorista] = useState("");
  const [telefoneMotorista, setTelefoneMotorista] = useState("");
  const [pontoMotoristaId, setPontoMotoristaId] = useState("");
  const [pontoMotoristaNome, setPontoMotoristaNome] = useState("");
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [openModalPontos, setOpenModalPontos] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  useEffect(() => {
    const fetchMotoristas = async () => {
        const dataMotoristas = await getMotoristas();
        setMotoristas(dataMotoristas);
    };

    fetchMotoristas();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchMotorista = async () => {
        try {
          const motorista = await getMotorista(id);
          setNomeMotorista(motorista.NOME_MOTORISTA);
          setSobrenomeMotorista(motorista.SOBRENOME_MOTORISTA);
          setCPFMotorista(motorista.CPF_MOTORISTA);
          setEmailMotorista(motorista.EMAIL_MOTORISTA);
          setTelefoneMotorista(motorista.TELEFONE_MOTORISTA);

          setIsEditMode(true);
        } catch (e) {
          console.error("Erro ao carregar motorista", e);
          toast.error("Erro ao carregar motorista");
        }
      };
      fetchMotorista();
    }
  }, [id]);

  const handleSubmitForm = async () => {
    try {
      const novoMotorista = {
        NOME_MOTORISTA: nomeMotorista,
        SOBRENOME_MOTORISTA: sobrenomeMotorista,
        CPF_MOTORISTA: CPFMotorista,
        EMAIL_MOTORISTA: emailMotorista,
        TELEFONE_MOTORISTA: telefoneMotorista,
      };

      if (!nomeMotorista) {
        toast.error("Nome do Motorista é obrigatório");
        return;
      }
      if (!sobrenomeMotorista) {
        toast.error("Sobrenome do Motorista é obrigatório");
        return;
      }
      if (!CPFMotorista) {
        toast.error("CPF do Motorista é obrigatório");
        return;
      }
      if (!emailMotorista) {
        toast.error("Email do Motorista é obrigatório");
        return;
      }
      if (!telefoneMotorista) {
        toast.error("Telefone do Motorista é obrigatório");
        return;
      }

      if (isEditMode) {
        if (id) {
          await updateMotorista(id, novoMotorista);
          toast.success("Motorista atualizado com sucesso!");
        } else {
          toast.error("ID do motorista não encontrado");
        }
      } else {
        const motoristaJaCadastrado = motoristas.find((motoristas) => motoristas.EMAIL_MOTORISTA === emailMotorista);
        const cpfJaCadastrado = motoristas.find((motorista) => motorista.CPF_MOTORISTA === mascaraCPF(CPFMotorista));
        if (motoristaJaCadastrado) {
          toast.error('Email do Motorista já cadastrado');
          return;
        }
        if (cpfJaCadastrado) {
            toast.error('CPF do Motorista já cadastrado');
            return;
        }
        const response = await createMotorista(novoMotorista);
        console.log("Motorista cadastrado com sucesso:", response);
        toast.success("Motorista cadastrado com sucesso!");
        setNomeMotorista("");
        setSobrenomeMotorista("");
        setCPFMotorista("");
        setEmailMotorista("");
        setTelefoneMotorista("");
        setPontoMotoristaId("");
        setPontoMotoristaNome("");
      }

      navigate("/listagem/motoristas");
    } catch (error) {
      console.error("Erro ao cadastrar Motorista:", error);
      toast.error("Falha ao cadastrar Motorista.");
    }
  };

  const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefoneMotorista(mascaraTelefone(e.target.value));
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCPFMotorista(mascaraCPF(e.target.value));
  }

  const closeModal = () => {
    setOpenModalPontos(false);
  };

  const handlePontoSelecionado = (pontoId: string, pontoNome: string) => {
    setPontoMotoristaId(pontoId);
    setPontoMotoristaNome(pontoNome);
    setOpenModalPontos(false);
  };

  return (
    <Container>
      <CabecalhoTela />
      <Content>
        <div className="container-cadastro-faculdade">
          <h1 className="title">
            {isEditMode ? "Editar Motorista" : "Cadastro de Motoristas"}
          </h1>
          <div className="form-cadastro">
            <InputForm
              type="text"
              label="Nome do Motorista"
              value={nomeMotorista}
              onChange={(e: any) => {
                setNomeMotorista(e.target.value);
              }}
            />
            <InputForm
              type="text"
              label="Sobrenome do Motorista"
              value={sobrenomeMotorista}
              onChange={(e: any) => {
                setSobrenomeMotorista(e.target.value);
              }}
            />
            <InputForm
              type="text"
              label="CPF do Motorista"
              value={CPFMotorista}
              onChange={(e: any) => {
                setCPFMotorista(e.target.value);
              }}
              onBlur={handleCPFChange}
            />
            <InputForm
              type="tel"
              label="Email do Motorista"
              value={emailMotorista}
              onChange={(e: any) => {
                setEmailMotorista(e.target.value);
              }}
            />
            <InputForm
              type="tel"
              label="Telefone do Motorista"
              value={telefoneMotorista}
              onChange={(e: any) => {
                setTelefoneMotorista(e.target.value);
              }}
              onBlur={handleTelChange}
              maxLength={15}
            />
          </div>
          <InputButton
            text={isEditMode ? "Salvar" : "Cadastrar"}
            onClick={handleSubmitForm}
          />
        </div>
      </Content>
      {openModalPontos && (
        <ModalPontos
          isOpen={openModalPontos}
          onClose={closeModal}
          onPontoSelecionado={handlePontoSelecionado}
        />
      )}
    </Container>
  );
};

export default CadastroMotoristas;
