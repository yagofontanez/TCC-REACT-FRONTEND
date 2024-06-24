// src/App.tsx
import React, { useState, useEffect } from 'react';
import { getUsuarios, createUsuario, Usuario } from '../../services/usuarioServices';
import InputButton from '../../Components/InputButton/indexInputButton';
import axios from 'axios';
import { Container } from './styleGerenciamentoAlunos';
import CabecalhoTela from '../../Components/CabecalhoTela/indexCabecalhoTela';

const GerenciamentoAlunos: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      const data = await getUsuarios();
      setUsuarios(data);
    };
    fetchUsuarios();
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
          <h1 className='dark' id='total'>4</h1>
        </div>
        <div id='container-total' className="pontos-totais">
          <p id='assunto'>Pontos Cadastrados</p>
          <h1 id='total'>12</h1>
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
