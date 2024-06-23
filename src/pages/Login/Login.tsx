// src/App.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ContainerLogin } from './styleLogin';
import { Admin, getAdmins, loginAdmin } from '../../services/adminsServices';
import InputForm from '../../Components/InputForm/indexInputForm';
import InputButton from '../../Components/InputButton/indexInputButton';
import { toast } from 'react-toastify';

const Login: React.FC = () => {

  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoToDash = async () => {
    try {
      const response = await loginAdmin(email, password);
      console.log(email, 'email')
      console.log(password, 'password')
      console.log(response.message);
      if (response.data === 200) {
        navigate('/gerenciamento');
      } else {
        toast.error('caiu no else sei la pq')
      }
    } catch (error) {
      setShowError(true);
      setEmail('');
      setPassword('');
      console.log(error, 'e')
      console.log(email, 'email')
      console.log(password, 'password')
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
          <InputForm type='text' label='Usuário' onFocus={onFocusInput} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="senha">
          <InputForm type='password' label='Senha' onFocus={onFocusInput} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="buttons">
          <InputButton text='Entrar' onClick={handleGoToDash} />
          {showError && (
            <p className='error'>Usuário ou Senha inválidos</p>
          )}
          <InputButton text='Cadastrar' onClick={() => navigate('/registrar')} />
        </div>
      </ContainerLogin>
    </Container>
  );
};

export default Login;
