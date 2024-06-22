// src/App.tsx
import React, { useState, useEffect } from 'react';
import { getUsuarios, createUsuario, Usuario } from '../../services/usuarioServices';

const GerenciamentoAlunos: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      const data = await getUsuarios();
      setUsuarios(data);
    };
    fetchUsuarios();
  }, []);

  const handleAddUsuario = async () => {
    try {
      const novoUsuario = { NOME: nome, SOBRENOME: sobrenome, EMAIL: email, TELEFONE: telefone, SENHA: senha };
      const addedUsuario = await createUsuario(novoUsuario);
      setUsuarios([...usuarios, addedUsuario]);
      setNome('');
      setSobrenome('');
      setEmail('');
      setTelefone('');
      setSenha('');
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  };

  return (
    <div>
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
  );
};

export default GerenciamentoAlunos;
