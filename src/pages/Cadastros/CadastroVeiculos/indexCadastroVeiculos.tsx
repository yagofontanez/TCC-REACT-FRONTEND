import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CabecalhoTela from "../../../Components/CabecalhoTela/indexCabecalhoTela";
import InputForm from "../../../Components/InputForm/indexInputForm";
import InputButton from "../../../Components/InputButton/indexInputButton";
import { mascaraTelefone } from "../../../utils/fn";
import ModalFaculdades from "../../../Modals/ModalFaculdades/indexModalFaculdades";
import { toast } from "react-toastify";
import {
  Usuario,
  createUsuario,
  getUsuario,
  updateUsuario,
  getUsuarios,
} from "../../../services/usuarioServices";
import { Faculdade, getFaculdade } from "../../../services/faculdadeServices";
import { Ponto, getPonto } from "../../../services/pontosServices";
import ModalPontos from "../../../Modals/ModalPontos/indexModalPontos";
import { Container, Content } from "./styleCadastroVeiculos";
import {
  createVeiculo,
  getVeiculo,
  getVeiculos,
} from "../../../services/veiculosServices";
import ModalVeiculos from "../../../Modals/ModalVeiculos/indexModalVeiculos";

const CadastroVeiculos: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [tipoVeiculo, setTipoVeiculo] = useState("");
  const [tipoVeiculoId, setTipoVeiculoId] = useState("");
  const [numeroVeiculo, setNumeroVeiculo] = useState("");
  const [marcaVeiculo, setMarcaVeiculo] = useState("");
  const [modeloVeiculo, setModeloVeiculo] = useState("");
  const [placaVeiculo, setPlacaVeiculo] = useState("");
  const [capacidadeVeiculo, setCapacidadeVeiculo] = useState("");
  const [pontoId, setPontoId] = useState("");
  const [pontoNome, setPontoNome] = useState("");
  const [openModalPontos, setOpenModalPontos] = useState(false);
  const [openModalVeiculos, setOpenModalVeiculos] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchVeiculo = async () => {
        try {
          const veiculo = await getVeiculo(id);
          setTipoVeiculo(veiculo.TIPO_VEICULO);
          setNumeroVeiculo(veiculo.NUMERO_VEICULOS || "");
          setMarcaVeiculo(veiculo.MARCA_VEICULOS);
          setModeloVeiculo(veiculo.MODELO_VEICULOS);
          setPlacaVeiculo(veiculo.PLACA_VEICULOS);
          setCapacidadeVeiculo(veiculo.CAPACIDADE_VEICULOS || "");
          setPontoId(veiculo.PONTO_ID || "");

          if (veiculo.PONTO_ID) {
            const ponto = await getPonto(veiculo.PONTO_ID);
            setPontoNome(ponto.NOME_PONTO);
          }

          setIsEditMode(true);
        } catch (error) {
          console.error("Erro ao carregar veículo:", error);
          toast.error("Erro ao carregar veículo");
        }
      };
      fetchVeiculo();
    }
  }, [id]);

  const handleSubmitForm = async () => {
    try {
      const numeroVeiculoParsed = parseInt(numeroVeiculo);
      const capacidadeVeiculoParsed = parseInt(capacidadeVeiculo);
  
      if (isNaN(numeroVeiculoParsed)) {
        toast.error("Número do Veículo deve ser um número válido");
        return;
      }
  
      if (isNaN(capacidadeVeiculoParsed)) {
        toast.error("Capacidade do Veículo deve ser um número válido");
        return;
      }
  
      const veiculoData = {
        TIPO_VEICULO: tipoVeiculo,
        NUMERO_VEICULOS: numeroVeiculoParsed,
        MARCA_VEICULOS: marcaVeiculo,
        MODELO_VEICULOS: modeloVeiculo,
        PLACA_VEICULOS: placaVeiculo,
        CAPACIDADE_VEICULOS: capacidadeVeiculoParsed,
        PONTO_ID: pontoId,
      };

      if (!tipoVeiculo) {
        toast.error("Tipo do Veículo é Obrigatório");
        return;
      }
      if (!numeroVeiculo) {
        toast.error("Número do Veículo é obrigatório");
        return;
      }
      if (!marcaVeiculo) {
        toast.error("Marca do Veículo é obrigatório");
        return;
      }
      if (!modeloVeiculo) {
        toast.error("Modelo do Veículo é obrigatório");
        return;
      }
      if (!placaVeiculo) {
        toast.error("Placa do Veículo é obrigatória");
        return;
      }
      if (!capacidadeVeiculo) {
        toast.error("Capacidade do Veículo é obrigatório");
      }
      if (!pontoNome) {
        toast.error("Ponto do Aluno é obrigatório");
        return;
      }

      console.log(numeroVeiculo, 'numero veiculo')
      console.log(capacidadeVeiculo, 'qtde veiculo')

      if (isEditMode) {
        if (id) {
          await updateUsuario(id, veiculoData);
          toast.success("Veículo atualizado com sucesso!");
        } else {
          toast.error("ID do veículo não encontrado.");
        }
      } else {
        await createVeiculo(veiculoData);
        toast.success("Veículo cadastrado com sucesso!");
      }

      navigate("/listagem/veiculos");
    } catch (e) {
      console.error("Erro ao cadastrar/atualizar Veículo:", e);
      toast.error("Erro ao cadastrar/atualizar Veículo");
    }
  };

  const closeModal = () => {
    setOpenModalPontos(false);
    setOpenModalVeiculos(false);
  };

  const handlePontoSelecionado = (pontoId: string, pontoNome: string) => {
    setPontoId(pontoId);
    setPontoNome(pontoNome);
    setOpenModalPontos(false);
  };

  const handleVeiculoSelecionado = (veiculoId: string, veiculoNome: string) => {
    setTipoVeiculoId(veiculoId);
    setTipoVeiculo(veiculoNome);
    setOpenModalPontos(false);
  };

  return (
    <Container>
      <CabecalhoTela />
      <Content>
        <div className="container-cadastro-faculdade">
          <h1 className="title">
            {isEditMode ? "Editar Veículo" : "Cadastro de Veículos"}
          </h1>
          <div className="form-cadastro">
            <InputForm
              type="text"
              label="Tipo do Veículo"
              value={tipoVeiculo}
              onChange={() => {}}
              onClick={() => setOpenModalVeiculos(true)}
              readOnly={true}
              className="select"
            />
            <InputForm
              type="tel"
              label="Número do Veículo"
              value={numeroVeiculo}
              onChange={(e: any) => {
                setNumeroVeiculo(e.target.value);
              }}
            />
            <InputForm
              type="email"
              label="Marca do Veículo"
              value={marcaVeiculo}
              onChange={(e: any) => {
                setMarcaVeiculo(e.target.value);
              }}
            />
            <InputForm
              type="text"
              label="Modelo do Veículo"
              value={modeloVeiculo}
              onChange={(e: any) => {
                setModeloVeiculo(e.target.value);
              }}
            />
            <InputForm
              type="text"
              label="Placa do Veículo"
              value={placaVeiculo}
              onChange={(e: any) => {
                setPlacaVeiculo(e.target.value);
              }}
            />
            <InputForm
              type="tel"
              label="Capacidade do Veículo"
              value={capacidadeVeiculo}
              onChange={(e: any) => {
                setCapacidadeVeiculo(e.target.value);
              }}
            />
            <InputForm
              type="text"
              label="Ponto do Veículo"
              value={pontoNome}
              onChange={() => {}}
              onClick={() => setOpenModalPontos(true)}
              readOnly={true}
              className="select"
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
      {openModalVeiculos && (
        <ModalVeiculos
          isOpen={openModalVeiculos}
          onClose={closeModal}
          onVeiculoSelecionado={handleVeiculoSelecionado}
        />
      )}
    </Container>
  );
};

export default CadastroVeiculos;
