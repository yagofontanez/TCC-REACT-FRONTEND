import React, { useEffect, useState } from "react";
import axios from "axios";
import CabecalhoTela from "../../../Components/CabecalhoTela/indexCabecalhoTela";
import InputForm from "../../../Components/InputForm/indexInputForm";
import InputButton from "../../../Components/InputButton/indexInputButton";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Content } from "./styleCadastroPontos";
import {
  createPontos,
  getPonto,
  updatePonto,
} from "../../../services/pontosServices";
import { fetchTodasCidades } from "../../../utils/apiCidades";
import { Motorista, getMotoristas } from "../../../services/motoristasService";
import ModalMotoristas from "../../../Modals/ModalMotoristas/indexModalMotoristas";

const CadastroPontos: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [nomePonto, setNomePonto] = useState("");
  const [ruaPonto, setRuaPonto] = useState("");
  const [bairroPonto, setBairroPonto] = useState("");
  const [cidadePonto, setCidadePonto] = useState("");
  const [pontoReferencia, setPontoReferencia] = useState("");
  const [cepPonto, setCepPonto] = useState("");
  const [motoristaNome, setMotoristaNome] = useState("");
  const [motoristaId, setMotoristaId] = useState("");
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openModalMotoristas, setOpenModalMotoristas] = useState(false);

  useEffect(() => {
    const fetchCidades = async () => {
      try {
        const cidadesData = await fetchTodasCidades();
        const cidadesNomes = cidadesData.map((cidade) => cidade.nome);
        setCidades(cidadesNomes);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      }
    };

    const fetchMotoristas = async () => {
      try {
        const motoristasData = await getMotoristas();
        setMotoristas(motoristasData);
      } catch (error) {
        console.error("Erro ao buscar motoristas:", error);
      }
    };

    fetchMotoristas();
    fetchCidades();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchPonto = async () => {
        try {
          const ponto = await getPonto(id);
          setNomePonto(ponto.NOME_PONTO);
          setRuaPonto(ponto.RUA_PONTO);
          setBairroPonto(ponto.BAIRRO_PONTO);
          setCidadePonto(ponto.CIDADE_PONTO);
          setCepPonto(ponto.CEP);
          setPontoReferencia(ponto.PONTO_REFERENCIA || "");
          setMotoristaId(ponto.MOTORISTA_ID);
          setMotoristaNome(motoristas.find(m => m.ID === ponto.MOTORISTA_ID)?.NOME_MOTORISTA || '');
          setIsEditMode(true);
        } catch (e) {
          console.error("Erro ao carregar ponto", e);
          toast.error("Erro ao carregar ponto");
        }
      };
      fetchPonto();
    }
  }, [id, motoristas]);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    setCepPonto(cep);

    if (cep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        if (response.data.erro) {
          toast.error("CEP não encontrado.");
          setRuaPonto("");
          setBairroPonto("");
          setCidadePonto("");
        } else {
          const { logradouro, bairro, localidade } = response.data;
          setRuaPonto(logradouro);
          setBairroPonto(bairro);
          setCidadePonto(localidade);
        }
      } catch (error) {
        toast.error("Erro ao buscar endereço com o CEP fornecido");
        console.error("Erro ao buscar endereço:", error);
        setRuaPonto("");
        setBairroPonto("");
        setCidadePonto("");
      }
    } else if (cep.length === 0) {
      setRuaPonto("");
      setBairroPonto("");
      setCidadePonto("");
    }
  };

  const handleSubmitForm = async () => {
    try {
      const novoPonto = {
        NOME_PONTO: nomePonto,
        RUA_PONTO: ruaPonto,
        BAIRRO_PONTO: bairroPonto,
        CIDADE_PONTO: cidadePonto,
        PONTO_REFERENCIA: pontoReferencia,
        CEP: cepPonto,
        MOTORISTA_ID: motoristaId,
      };

      if (!nomePonto) {
        toast.error("Nome do Ponto é Obrigatório");
        return;
      }
      if (!ruaPonto) {
        toast.error("Rua do Ponto é obrigatória");
        return;
      }
      if (!bairroPonto) {
        toast.error("Bairro do Ponto é obrigatório");
        return;
      }
      if (!cidadePonto) {
        toast.error("Cidade do Ponto é obrigatória");
        return;
      }
      if (!cidades.includes(cidadePonto)) {
        toast.error("Cidade inválida!");
        return;
      }

      if (isEditMode) {
        if (id) {
          await updatePonto(id, novoPonto);
          toast.success("Ponto atualizado com sucesso!");
        } else {
          toast.error("ID do ponto não encontrado");
        }
      } else {
        const response = await createPontos(novoPonto);
        console.log("Ponto criado com sucesso!", response);
        toast.success("Ponto cadastrado com sucesso!");
      }

      navigate("/listagem/pontos");
    } catch (e) {
      console.error("Erro ao cadastrar Ponto:", e);
      toast.error("Erro ao cadastrar Ponto");
    }
  };

  const closeModal = () => {
    setOpenModalMotoristas(false);
  };

  const handleMotoristaSelecionado = (
    motoristaId: string,
    motoristaNome: string
  ) => {
    setMotoristaId(motoristaId);
    setMotoristaNome(motoristaNome);
    setOpenModalMotoristas(false);
  };

  return (
    <Container>
      <CabecalhoTela />
      <Content>
        <div className="container-cadastro-faculdade">
          <h1 className="title">
            {isEditMode ? "Editar Ponto" : "Cadastro de Pontos"}
          </h1>
          <div className="form-cadastro">
            <InputForm
              type="text"
              label="Nome do Ponto"
              value={nomePonto}
              onChange={(e: any) => {
                setNomePonto(e.target.value);
              }}
            />
            <InputForm
              type="text"
              label="CEP"
              value={cepPonto}
              onChange={handleCepChange}
              maxLength={8}
            />
            <InputForm
              type="text"
              label="Rua do Ponto"
              value={ruaPonto}
              onChange={(e: any) => {
                setRuaPonto(e.target.value);
              }}
            />
            <InputForm
              type="text"
              label="Bairro"
              value={bairroPonto}
              onChange={(e: any) => {
                setBairroPonto(e.target.value);
              }}
            />
            <InputForm
              type="text"
              label="Cidade do Ponto"
              value={cidadePonto}
              onChange={(e: any) => {
                setCidadePonto(e.target.value);
              }}
            />
            <InputForm
              type="text"
              label="Ponto de Referência"
              value={pontoReferencia}
              onChange={(e: any) => {
                setPontoReferencia(e.target.value);
              }}
            />
            <InputForm
              type="text"
              label="Motorista Responsável"
              value={motoristaNome}
              onChange={() => {}}
              onClick={() => setOpenModalMotoristas(true)}
              readOnly={true}
              className="select"
            />
          </div>
          <div className="buttons">
            <InputButton
              text={isEditMode ? "Salvar" : "Cadastrar"}
              onClick={handleSubmitForm}
            />
          </div>
        </div>
      </Content>
      {openModalMotoristas && (
        <ModalMotoristas
          isOpen={openModalMotoristas}
          onClose={closeModal}
          onMotoristaSelecionado={handleMotoristaSelecionado}
        />
      )}
    </Container>
  );
};

export default CadastroPontos;
