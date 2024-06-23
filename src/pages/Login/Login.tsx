// src/App.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ContainerLogin } from './styleLogin';
import { Admin, getAdmins, loginAdmin } from '../../services/adminsServices';
import InputForm from '../../Components/InputForm/indexInputForm';
import InputButton from '../../Components/InputButton/indexInputButton';
import { ToastContainer, toast } from 'react-toastify';
import GifCaminhao from '../../Components/GifCaminhao/indexGifCaminhao';

const Login: React.FC = () => {

  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoToDash = async () => {

    if (email === '' || password === '') toast.error('Todos os campos são obrigatórios');

    try {
      const response = await loginAdmin(email, password);
      if (response) {
        navigate('/gerenciamento');
      }
    } catch (error) {
      setShowError(true);
      setEmail('');
      setPassword('');
      toast.error('Algo inesperado aconteceu. Tente novamente')
    }
  }

  const pressEnterToSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGoToDash();
    }
  };

  const onFocusInput = () => {
    setShowError(false);
  }

  return (
    <Container>
      <ContainerLogin onKeyDown={pressEnterToSubmit}>
        <h1 className='title-login'>Login - Controle de Ponto</h1>
        <div className="form-login">
          <div className="login">
            <InputForm type='email' label='Email' onFocus={onFocusInput} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="senha">
            <InputForm type='password' label='Senha' onFocus={onFocusInput} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="buttons">
          <InputButton text='Entrar' onClick={handleGoToDash} />
        </div>
          {showError && (
            <p className='error'>Usuário ou Senha inválidos</p>
          )}
      </ContainerLogin>
      <GifCaminhao />
      <ToastContainer />
    </Container>
  );
};

export default Login;
