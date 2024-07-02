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
import ListagemVeiculos from './pages/Listagem/ListagemVeiculos/indexListagemVeiculos';
import EdicaoFotoPerfil from './pages/EdicaoFotoPerfil/indexEdicaoFotoPerfil';
import EdicaoAdmin from './pages/EdicaoAdmin/indexEdicaoAdmin';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />2
        <Route element={<PrivateRoute />}>
          <Route path="/gerenciamento" element={<GerenciamentoAlunos />} />
          <Route path="/cadastro/faculdades" element={<CadastroFaculdades />} />
          <Route path="/cadastro/alunos" element={<CadastroAlunos />} />
          <Route path="/cadastro/pontos" element={<CadastroPontos />} />
          <Route path="/cadastro/motoristas" element={<CadastroMotoristas />} />
          <Route path="/cadastro/veiculos" element={<CadastroVeiculos />} />
          <Route path="/cadastro/administradores" element={<CadastroAdmin />} />
          <Route path="/cadastro/veiculos/:id" element={<CadastroVeiculos />} />
          <Route path="/cadastro/alunos/:id" element={<CadastroAlunos />} />
          <Route path="/cadastro/faculdades/:id" element={<CadastroFaculdades />} />
          <Route path="/cadastro/pontos/:id" element={<CadastroPontos />} />
          <Route path="/cadastro/motoristas/:id" element={<CadastroMotoristas />} />
          <Route path="/listagem/alunos" element={<ListagemAlunos />} />
          <Route path="/listagem/faculdades" element={<ListagemFaculdades />} />
          <Route path="/listagem/pontos" element={<ListagemPontos />} />
          <Route path="/listagem/motoristas" element={<ListagemMotoristas />} />
          <Route path="/listagem/veiculos" element={<ListagemVeiculos />} />
          <Route path="/edicao/fotoperfil" element={<EdicaoFotoPerfil />} />
          <Route path="/edicao/admin/:id" element={<EdicaoAdmin />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
