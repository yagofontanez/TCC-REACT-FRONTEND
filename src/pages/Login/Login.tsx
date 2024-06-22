// src/App.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ContainerLogin } from './styleLogin';
import { Admin, getAdmins } from '../../services/adminsServices';

const Login: React.FC = () => {

  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  const handleGoToDash = async () => {
    const data = await getAdmins();
    const valueUser = window.document.querySelector('.input-user') as HTMLInputElement;
    const valuePassword = window.document.querySelector('.input-password') as HTMLInputElement;
    const validAdmin = data.find(admin => admin.NOME_USUARIO === valueUser.value && admin.SENHA === valuePassword.value);

    if (validAdmin) {
      navigate('/gerenciamento');
    } else {
      setShowError(true);
    }
  }

  const onFocusInput = () => {
    setShowError(false);
  }

  return (
    <Container>
      <ContainerLogin>
        <h1 className='title-login'>Login</h1>
        <div className="form-login">
          <div className="login">
            <div className="input-container">
              <input onFocus={onFocusInput} className='input-user' required={true} id="input" type="text" />
              <label className="label" htmlFor="input">Usuário</label>
              <div className="underline"></div>
            </div>
          </div>
          <div className="senha">
            <div className="input-container">
              <input onFocus={onFocusInput} className='input-password' required={true} id="input" type="password" />
              <label className="label" htmlFor="input">Senha</label>
              <div className="underline"></div>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button onClick={handleGoToDash}>Entrar</button>
          {showError && (
            <p className='error'>Usuário ou Senha inválidos</p>
          )}
          <button onClick={() => navigate('/registrar')}>Cadastrar</button>
        </div>
      </ContainerLogin>
    </Container>
  );
};

export default Login;
