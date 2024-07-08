import React, { useState, useEffect } from "react";
import { getUsuarios, Usuario } from "../../services/usuarioServices";
import InputButton from "../../Components/InputButton/indexInputButton";
import { Container } from "./styleGerenciamentoAlunos";
import CabecalhoTela from "../../Components/CabecalhoTela/indexCabecalhoTela";
import { Faculdade, getFaculdades } from "../../services/faculdadeServices";
import { Ponto, getPontos } from "../../services/pontosServices";
import { marromEscuro } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import { getVeiculos, Veiculo } from "../../services/veiculosServices";
import { getMotoristas, Motorista } from "../../services/motoristasService";

const GerenciamentoAlunos: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [faculdades, setFaculdades] = useState<Faculdade[]>([]);
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      const dataUsuarios = await getUsuarios();
      setUsuarios(dataUsuarios);
    };

    const fetchFaculdades = async () => {
      const dataFaculdades = await getFaculdades();
      setFaculdades(dataFaculdades);
    };

    const fetchPontos = async () => {
      const dataPontos = await getPontos();
      setPontos(dataPontos);
    };

    const fetchVeiculos = async () => {
      const dataVeiculos = await getVeiculos();
      setVeiculos(dataVeiculos);
    };

    const fetchMotoristas = async () => {
      const dataMotoristas = await getMotoristas();
      setMotoristas(dataMotoristas);
    };

    fetchUsuarios();
    fetchFaculdades();
    fetchPontos();
    fetchVeiculos();
    fetchMotoristas();
  }, []);

  return (
    <Container>
      <CabecalhoTela />
      <div>
        <div className="container-relatorio-total">
          <div id="container-total" className="alunos-totais">
            <p id="assunto">Alunos Cadastrados</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1 id="total">{usuarios.length}</h1>
              <InputButton
                text="Ver Todos"
                onClick={() => navigate("/listagem/alunos")}
              />
            </div>
          </div>
          <div id="container-total" className="faculdades-totais">
            <p id="assunto">Faculdades Cadastradas</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1 id="total">{faculdades.length}</h1>
              <InputButton
                text="Ver Todos"
                onClick={() => navigate("/listagem/faculdades")}
              />
            </div>
          </div>
          <div id="container-total" className="pontos-totais">
          <p id="assunto">Pontos Cadastrados</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1 id="total">{pontos.length}</h1>
              <InputButton
                text="Ver Todos"
                onClick={() => navigate("/listagem/pontos")}
              />
            </div>
          </div>
          <div id="container-total" className="veiculos-totais">
          <p id="assunto">Veículos Cadastradas</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1 id="total">{veiculos.length}</h1>
              <InputButton
                text="Ver Todos"
                onClick={() => navigate("/listagem/veiculos")}
              />
            </div>
          </div>
          <div id="container-total" className="motoristas-totais">
          <p id="assunto">Motoristas Cadastrados</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1 id="total">{motoristas.length}</h1>
              <InputButton
                text="Ver Todos"
                onClick={() => navigate("/listagem/motoristas")}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default GerenciamentoAlunos;
