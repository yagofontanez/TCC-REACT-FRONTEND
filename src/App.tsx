import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './pages/Login/Login';
import GerenciamentoAlunos from './pages/GerenciamentoAlunos/IndexGerenciamentoAlunos';
import Loading from './pages/Loading/Loading';
import CadastroAdmin from './pages/CadastroAdmin/IndexCadastroAdmin';
import CadastroFaculdades from './pages/CadastroFaculdades/indexCadastroFaculdades';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Loading />} />
      <Route path="/login" element={<Login />} />
      <Route path="/gerenciamento" element={<GerenciamentoAlunos />} />
      <Route path="/registrar" element={<CadastroAdmin />} />
      <Route path="/cadastro/faculdades" element={<CadastroFaculdades />} />
    </Routes>
  );
}

export default App;
