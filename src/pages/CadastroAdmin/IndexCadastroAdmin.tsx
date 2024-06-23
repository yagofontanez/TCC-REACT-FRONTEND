import React, { useEffect, useState } from 'react';
import { Container, ContainerLogin } from './styleCadastroAdmin';
import InputForm from '../../Components/InputForm/indexInputForm';
import InputButton from '../../Components/InputButton/indexInputButton';
import { createAdmin } from '../../services/adminsServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CadastroAdmin: React.FC = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleSubmitRegister = async () => {
        if (!nome || !email || !senha) {
            toast.error("Todos os campos são obrigatórios.", {
                className: 'toast-error',
                progressClassName: 'toast-progress',
            });
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Por favor, insira um email válido.", {
                className: 'toast-error',
                progressClassName: 'toast-progress',
            });
            return;
        }

        if (senha.length < 8) {
            toast.error("A senha deve ter no mínimo 8 caracteres.", {
                className: 'toast-error',
                progressClassName: 'toast-progress',
            });
        }

        try {
            const novoAdmin = {
                NOME_USUARIO: nome,
                EMAIL: email,
                SENHA: senha
            };

            const data = await createAdmin(novoAdmin);
            console.log('Admin criado com sucesso:', data);
            toast.success("Admin cadastrado com sucesso!", {
                className: 'toast-success',
                progressClassName: 'toast-progress',
            });
            setNome('');
            setEmail('');
            setSenha('');
            navigate('/login');
        } catch (error) {
            toast.error("Algo inesperado aconteceu. Por favor tente novamente.", {
                className: 'toast-error',
                progressClassName: 'toast-progress',
            });
            console.error(error, 'erro')
        }
    }

    return (
        <Container>
            <ContainerLogin>
                <h1 className='register-admin'>Cadastre um Admin</h1>
                <div className="form-register">
                    <InputForm
                        type='text'
                        label='Nome'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <InputForm
                        type='text'
                        label='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputForm
                        type='password'
                        label='Senha'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <InputButton text='Cadastrar' onClick={handleSubmitRegister} />
                </div>
            </ContainerLogin>
            <ToastContainer />
        </Container>
    );
};

export default CadastroAdmin;
