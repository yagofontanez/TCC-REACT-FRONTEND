// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import GerenciamentoAlunos from './pages/GerenciamentoAlunos/IndexGerenciamentoAlunos';
import CadastroAdmin from './pages/CadastroAdmin/IndexCadastroAdmin';
import CadastroFaculdades from './pages/CadastroFaculdades/indexCadastroFaculdades';
import CadastroAlunos from './pages/CadastroUsuarios/indexCadastroUsuarios';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './PrivateRoute/indexPrivateRoute';
import ListagemAlunos from './pages/Listagem/ListagemAlunos/indexListagemAlunos';

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/gerenciamento" element={<GerenciamentoAlunos />} />
          <Route path="/registrar" element={<CadastroAdmin />} />
          <Route path="/cadastro/faculdades" element={<CadastroFaculdades />} />
          <Route path="/cadastro/alunos" element={<CadastroAlunos />} />
          <Route path="/listagem/alunos" element={<ListagemAlunos />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
