import React, { useEffect, useState } from 'react';
import CabecalhoTela from '../../Components/CabecalhoTela/indexCabecalhoTela';
import InputForm from '../../Components/InputForm/indexInputForm';
import InputButton from '../../Components/InputButton/indexInputButton';
import { mascaraTelefone } from '../../utils/fn';
import { useNavigate } from 'react-router-dom';
import { Container, Content } from './styleCadastroUsuarios';
import ModalFaculdades from '../../Modals/ModalFaculdades/indexModalFaculdades';
import { toast } from 'react-toastify';
import { Usuario, createUsuario, getUsuarios } from '../../services/usuarioServices';

const CadastroAlunos: React.FC = () => {

    const navigate = useNavigate();

    const [nomeAluno, setNomeAluno] = useState('');
    const [sobrenomeAluno, setSobrenomeAluno] = useState('');
    const [emailAluno, setEmailAluno] = useState('');
    const [telefoneAluno, setTelefoneAluno] = useState('');
    const [faculdadeAlunoId, setFaculdadeAlunoId] = useState('');
    const [faculdadeAlunoNome, setFaculdadeAlunoNome] = useState('');
    const [openModalFaculdades, setOpenModalFaculdades] = useState(false);
    const [senhaAluno, setSenhaAluno] = useState('');
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelefoneAluno(mascaraTelefone(e.target.value));
    }

    const generatePassword = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        let password = "";
        for (let i = 0; i < 15; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        setSenhaAluno(password);
        toast.success('Senha gerada com sucesso!');
    };


    useEffect(() => {
        const fetchUsuarios = async () => {
            const dataUsuarios = await getUsuarios();
            setUsuarios(dataUsuarios);
        };
        
        fetchUsuarios();
    }, []);

    const handleSubmitForm = async () => {
        try {
            const novoAluno = {
                NOME: nomeAluno,
                SOBRENOME: sobrenomeAluno,
                EMAIL: emailAluno,
                TELEFONE: telefoneAluno,
                SENHA: senhaAluno,
                FACULDADE_ID: faculdadeAlunoId,
            };

            const validateEmail = (email: string) => {
                const re = /\S+@\S+\.\S+/;
                return re.test(email);
            }

            if (!nomeAluno) {
                toast.error('Nome do Aluno é Obrigatório');
                return;
            }
            if (!sobrenomeAluno) {
                toast.error('Sobrenome do Aluno é obrigatório');
                return;
            }
            if (!emailAluno) {
                toast.error('Email do Aluno é obrigatório');
                return;
            }
            if (!validateEmail(emailAluno) && emailAluno !== '') {
                toast.error('Insira um Email válido');
                return;
            }
            const usuarioJaCadastrado = usuarios.find((usuario) => usuario.EMAIL === emailAluno)
            if (usuarioJaCadastrado) {
                toast.error('Email do Aluno já cadastrado');
                return;
            }
            if (!telefoneAluno) {
                toast.error('Telefone do Aluno é obrigatório');
                return;
            }
            if (!faculdadeAlunoNome) {
                toast.error('Faculdade do Aluno é obrigatória');
                return;
            }


            const response = await createUsuario(novoAluno);
            console.log('Aluno criado com sucesso!', response);
            toast.success('Aluno cadastrado com sucesso!');
            navigate('/gerenciamento');
        } catch (e) {
            console.error('Erro ao cadastrar Aluno:', e);
            toast.error('Erro ao cadastrar Aluno');
        }
    }

    const closeModal = () => {
        setOpenModalFaculdades(false);
    }

    const handleFaculdadeSelecionada = (faculdadeId: string, faculdadeNome: string) => {
        setFaculdadeAlunoId(faculdadeId);
        setFaculdadeAlunoNome(faculdadeNome);
        setOpenModalFaculdades(false);
    }

    return (
        <Container>
            <CabecalhoTela />
            <Content>
                <div className="container-cadastro-faculdade">
                    <h1 className='title'>Cadastro de Alunos</h1>
                    <div className="form-cadastro">
                        <InputForm
                            type='text'
                            label='Nome do Aluno'
                            value={nomeAluno}
                            onChange={(e: any) => { setNomeAluno(e.target.value) }}
                        />
                        <InputForm
                            type='text'
                            label='Sobrenome do Aluno'
                            value={sobrenomeAluno}
                            onChange={(e: any) => { setSobrenomeAluno(e.target.value) }}
                        />
                        <InputForm
                            type='email'
                            label='E-mail do Aluno'
                            value={emailAluno}
                            onChange={(e: any) => { setEmailAluno(e.target.value) }}
                        />
                        <InputForm
                            type='text'
                            label='Telefone do Aluno'
                            value={telefoneAluno}
                            onChange={(e: any) => { setTelefoneAluno(e.target.value) }}
                            onBlur={(e: any) => setTelefoneAluno(mascaraTelefone(e.target.value))}
                            maxLength={15}
                        />
                        <InputForm
                            type='text'
                            label='Senha do Aluno'
                            value={senhaAluno}
                            readOnly={true}
                            onChange={() => {}}
                        />
                        <InputForm
                            type='text'
                            label='Faculdade do Aluno'
                            value={faculdadeAlunoNome}
                            onChange={() => { }}
                            // onBlur={handleTelChange}
                            maxLength={15}
                            onClick={() => setOpenModalFaculdades(true)}
                            readOnly={true}
                            className='select'
                        />
                    </div>
                    <div className="buttons">
                        <InputButton text='Cadastrar' onClick={handleSubmitForm} />
                        <InputButton text='Gerar Senha' onClick={generatePassword} />
                    </div>
                </div>
            </Content>
            {openModalFaculdades && (
                <ModalFaculdades
                    isOpen={openModalFaculdades}
                    onClose={closeModal}
                    onFaculdadeSelecionada={handleFaculdadeSelecionada}
                />
            )}
        </Container>
    );
};

export default CadastroAlunos;
