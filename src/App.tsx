import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import GerenciamentoAlunos from './pages/GerenciamentoAlunos/IndexGerenciamentoAlunos';
import CadastroAdmin from './pages/Cadastros/CadastroAdmin/IndexCadastroAdmin';
import CadastroFaculdades from './pages/Cadastros/CadastroFaculdades/indexCadastroFaculdades';
import CadastroAlunos from './pages/Cadastros/CadastroUsuarios/indexCadastroUsuarios';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './PrivateRoute/indexPrivateRoute';
import ListagemAlunos from './pages/Listagem/ListagemAlunos/indexListagemAlunos';
import ListagemFaculdades from './pages/Listagem/ListagemFaculdades/indexListagemFaculdades';
import 'react-toastify/dist/ReactToastify.css';
import CadastroPontos from './pages/Cadastros/CadastroPontos/indexCadastroPontos';
import ListagemPontos from './pages/Listagem/ListagemPontos/indexListagemPontos';
import CadastroMotoristas from './pages/Cadastros/CadastroMotoristas/indexCadastroMotoristas';
import ListagemMotoristas from './pages/Listagem/ListagemMotoristas/indexListagemMotoristas';
import CadastroVeiculos from './pages/Cadastros/CadastroVeiculos/indexCadastroVeiculos';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/gerenciamento" element={<GerenciamentoAlunos />} />
          <Route path="/registrar" element={<CadastroAdmin />} />
          <Route path="/cadastro/faculdades" element={<CadastroFaculdades />} />
          <Route path="/cadastro/alunos" element={<CadastroAlunos />} />
          <Route path="/cadastro/pontos" element={<CadastroPontos />} />
          <Route path="/cadastro/motoristas" element={<CadastroMotoristas />} />
          <Route path="/cadastro/veiculos" element={<CadastroVeiculos />} />
          <Route path="/cadastro/alunos/:id" element={<CadastroAlunos />} />
          <Route path="/cadastro/faculdades/:id" element={<CadastroFaculdades />} />
          <Route path="/cadastro/pontos/:id" element={<CadastroPontos />} />
          <Route path="/listagem/alunos" element={<ListagemAlunos />} />
          <Route path="/listagem/faculdades" element={<ListagemFaculdades />} />
          <Route path="/listagem/pontos" element={<ListagemPontos />} />
          <Route path="/listagem/motoristas" element={<ListagemMotoristas />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
