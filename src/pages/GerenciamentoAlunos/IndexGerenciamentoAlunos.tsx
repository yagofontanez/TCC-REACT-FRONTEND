import React, { useState, useEffect } from 'react';
import { getUsuarios, Usuario } from '../../services/usuarioServices';
import InputButton from '../../Components/InputButton/indexInputButton';
import { Container } from './styleGerenciamentoAlunos';
import CabecalhoTela from '../../Components/CabecalhoTela/indexCabecalhoTela';
import { Faculdade, getFaculdades } from '../../services/faculdadeServices';
import { Ponto, getPontos } from '../../services/pontosServices';
import { marromEscuro } from '../../utils/colors';
import { useNavigate } from 'react-router-dom';

const GerenciamentoAlunos: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [faculdades, setFaculdades] = useState<Faculdade[]>([]);
  const [pontos, setPontos] = useState<Ponto[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      const dataUsuarios = await getUsuarios();
      setUsuarios(dataUsuarios);
    };

    const fetchFaculdades = async () => {
      const dataFaculdades = await getFaculdades();
      setFaculdades(dataFaculdades);
    }

    const fetchPontos = async () => {
      const dataPontos = await getPontos();
      setPontos(dataPontos);
    }

    fetchUsuarios();
    fetchFaculdades();
    fetchPontos();
  }, []);

  return (
    <Container>
      <CabecalhoTela />
      <div className="container-relatorio-total">
        <div id='container-total' className="alunos-totais">
          <p id='assunto'>Alunos Cadastrados</p>
          <h1 id='total'>{usuarios.length}</h1>
        </div>
        <div id='container-total' className="faculdades-totais">
          <p className='dark' id='assunto'>Faculdades Cadastradas</p>
          <h1 className='dark' id='total'>{faculdades.length}</h1>
        </div>
        <div id='container-total' className="pontos-totais">
          <p id='assunto'>Pontos Cadastrados</p>
          <h1 id='total'>{pontos.length}</h1>
        </div>
      </div>
      <div className='container-infos-relatorio'>
        <div className="relatorio-alunos">
          {usuarios.slice(0, 5).map(usuario => (
            <div className='usuarios-line'>
              <p style={{ fontSize: '16px', fontWeight: '600', color: `${marromEscuro}` }}>Aluno: </p>
              <p style={{ color: `${marromEscuro}`, fontSize: '18px' }} key={usuario.ID}>{usuario.NOME} {usuario.SOBRENOME}</p>
            </div>
          ))}
          {usuarios.length > 0 && (
            <div className='separator-buttons'>
              <InputButton text='Ver todos' onClick={() => navigate('/listagem/alunos')} />
              <InputButton text='Adicionar Aluno' onClick={() => navigate('/cadastro/alunos')} />
            </div>
          )}
        </div>
        <div className="relatorio-faculdades">
          {faculdades.slice(0, 5).map(faculdades => (
            <div className='faculdades-line'>
              <p style={{ fontSize: '16px', fontWeight: '600', color: `${marromEscuro}` }}>Faculdade: </p>
              <p style={{ color: `${marromEscuro}`, fontSize: '18px' }} key={faculdades.ID}>{faculdades.NOME_FACULDADE}</p>
            </div>
          ))}
          {faculdades.length > 0 && (
            <div className='separator-buttons'>
              <InputButton text='Ver todos' onClick={() => navigate('/listagem/faculdades')} />
              <InputButton text='Adicionar Faculdade' onClick={() => navigate('/cadastro/faculdades')} />
            </div>
          )}
        </div>
        <div className="relatorio-pontos">
          {pontos.slice(0, 5).map(pontos => (
            <div className='pontos-line'>
              <p style={{ fontSize: '16px', fontWeight: '600', color: `${marromEscuro}` }}>Ponto: </p>
              <p style={{ color: marromEscuro, fontSize: '18px' }} key={pontos.ID}>
                {`${pontos.NOME_PONTO} | ${pontos.CIDADE_PONTO}`}
              </p>
            </div>
          ))}
          {pontos.length > 0 && (
            <div className='separator-buttons'>
              <InputButton text='Ver todos' onClick={() => navigate('/listagem/pontos')} />
              <InputButton text='Adicionar Ponto' onClick={() => navigate('/cadastro/pontos')} />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default GerenciamentoAlunos;
