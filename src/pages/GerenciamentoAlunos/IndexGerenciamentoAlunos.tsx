// src/App.tsx
import React, { useState, useEffect } from 'react';
import { getUsuarios, createUsuario, Usuario } from '../../services/usuarioServices';
import InputButton from '../../Components/InputButton/indexInputButton';
import axios from 'axios';
import { Container } from './styleGerenciamentoAlunos';
import CabecalhoTela from '../../Components/CabecalhoTela/indexCabecalhoTela';
import { Faculdade, getFaculdades } from '../../services/faculdadeServices';
import { Ponto, getPontos } from '../../services/pontosServices';
import { marromEscuro } from '../../utils/colors';

const GerenciamentoAlunos: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [faculdades, setFaculdades] = useState<Faculdade[]>([]);
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [token, setToken] = useState('');

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

  // const handleAddUsuario = async () => {
  //   try {
  //     const novoUsuario = { NOME: nome, SOBRENOME: sobrenome, EMAIL: email, TELEFONE: telefone, SENHA: senha };
  //     const addedUsuario = await createUsuario(novoUsuario);
  //     setUsuarios([...usuarios, addedUsuario]);
  //     setNome('');
  //     setSobrenome('');
  //     setEmail('');
  //     setTelefone('');
  //     setSenha('');
  //   } catch (error) {
  //     console.error('Erro ao adicionar usuário:', error);
  //   }
  // };

  // const handleGenerateToken = async () => {
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/admins/generateToken`);
  //     setToken(response.data.token);
  //     console.log(token, 'token')
  //   } catch (error) {
  //     console.error("Erro ao gerar token:", error);
  //   }
  // }

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
            <InputButton text='Ver todos' onClick={() => { }} />
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
            <InputButton text='Ver todos' onClick={() => { }} />
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
            <InputButton text='Ver todos' onClick={() => { }} />
          )}
        </div>
      </div>
      {/* <div>
        <h1>Lista de Usuários</h1>
        <ul>
          {usuarios.map(usuario => (
            <li key={usuario.ID}>{usuario.NOME} {usuario.SOBRENOME}</li>
          ))}
        </ul>
        <h2>Adicionar Usuário</h2>
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button onClick={handleAddUsuario}>Adicionar</button>
      </div>
      <InputButton text='Gerar Token de Cadastro' onClick={handleGenerateToken} />
      {token && (
        <div className="token-display">
          <p>Token de Cadastro: {token}</p>
        </div>
      )} */}
    </Container>
  );
};

export default GerenciamentoAlunos;
