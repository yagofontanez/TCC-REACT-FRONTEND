import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CabecalhoTela from '../../Components/CabecalhoTela/indexCabecalhoTela';
import InputForm from '../../Components/InputForm/indexInputForm';
import InputButton from '../../Components/InputButton/indexInputButton';
import { mascaraTelefone } from '../../utils/fn';
import { Container, Content } from './styleCadastroUsuarios';
import ModalFaculdades from '../../Modals/ModalFaculdades/indexModalFaculdades';
import { toast } from 'react-toastify';
import { Usuario, createUsuario, getUsuario, updateUsuario, getUsuarios } from '../../services/usuarioServices';
import { Faculdade, getFaculdade } from '../../services/faculdadeServices';
import { Ponto, getPonto } from '../../services/pontosServices';
import ModalPontos from '../../Modals/ModalPontos/indexModalPontos';

const CadastroAlunos: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [nomeAluno, setNomeAluno] = useState('');
  const [sobrenomeAluno, setSobrenomeAluno] = useState('');
  const [emailAluno, setEmailAluno] = useState('');
  const [telefoneAluno, setTelefoneAluno] = useState('');
  const [faculdadeAlunoId, setFaculdadeAlunoId] = useState('');
  const [faculdadeAlunoNome, setFaculdadeAlunoNome] = useState('');
  const [pontoId, setPontoId] = useState('');
  const [pontoNome, setPontoNome] = useState('');
  const [openModalFaculdades, setOpenModalFaculdades] = useState(false);
  const [openModalPontos, setOpenModalPontos] = useState(false);
  const [senhaAluno, setSenhaAluno] = useState('');
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const dataUsuarios = await getUsuarios();
      setUsuarios(dataUsuarios);
    };
    fetchUsuarios();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchUsuario = async () => {
        try {
          const usuario = await getUsuario(id);
          setNomeAluno(usuario.NOME);
          setSobrenomeAluno(usuario.SOBRENOME);
          setEmailAluno(usuario.EMAIL);
          setTelefoneAluno(usuario.TELEFONE);
          setFaculdadeAlunoId(usuario.FACULDADE_ID || '');
          setPontoId(usuario.PONTO_ID || '');
          setSenhaAluno(usuario.SENHA);

          if (usuario.FACULDADE_ID) {
            const faculdade = await getFaculdade(usuario.FACULDADE_ID);
            setFaculdadeAlunoNome(faculdade.NOME_FACULDADE);
          }

          if (usuario.PONTO_ID) {
            const ponto = await getPonto(usuario.PONTO_ID);
            setPontoNome(ponto.NOME_PONTO);
          }

          setIsEditMode(true);
        } catch (error) {
          console.error('Erro ao carregar usuário:', error);
          toast.error('Erro ao carregar usuário');
        }
      };
      fetchUsuario();
    }
  }, [id]);

  const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefoneAluno(mascaraTelefone(e.target.value));
  };

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

  const handleSubmitForm = async () => {
    try {
      const alunoData = {
        NOME: nomeAluno,
        SOBRENOME: sobrenomeAluno,
        EMAIL: emailAluno,
        TELEFONE: telefoneAluno,
        SENHA: senhaAluno,
        FACULDADE_ID: faculdadeAlunoId,
        PONTO_ID: pontoId,
      };

      const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      };

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
      if (!telefoneAluno) {
        toast.error('Telefone do Aluno é obrigatório');
        return;
      }
      if (!faculdadeAlunoNome) {
        toast.error('Faculdade do Aluno é obrigatória');
        return;
      }
      if (!pontoNome) {
        toast.error('Ponto do Aluno é obrigatório');
        return;
      }

      if (isEditMode) {
        if (id) {
          await updateUsuario(id, alunoData);
          toast.success('Aluno atualizado com sucesso!');
        } else {
          toast.error('ID do aluno não encontrado.');
        }
      } else {
        const usuarioJaCadastrado = usuarios.find((usuario) => usuario.EMAIL === emailAluno);
        if (usuarioJaCadastrado) {
          toast.error('Email do Aluno já cadastrado');
          return;
        }
        await createUsuario(alunoData);
        toast.success('Aluno cadastrado com sucesso!');
      }

      navigate('/listagem/alunos');
    } catch (e) {
      console.error('Erro ao cadastrar/atualizar Aluno:', e);
      toast.error('Erro ao cadastrar/atualizar Aluno');
    }
  };

  const closeModal = () => {
    setOpenModalFaculdades(false);
    setOpenModalPontos(false);
  };

  const handleFaculdadeSelecionada = (faculdadeId: string, faculdadeNome: string) => {
    setFaculdadeAlunoId(faculdadeId);
    setFaculdadeAlunoNome(faculdadeNome);
    setOpenModalFaculdades(false);
  };

  const handlePontoSelecionado = (pontoId: string, pontoNome: string) => {
    setPontoId(pontoId);
    setPontoNome(pontoNome);
    setOpenModalPontos(false);
  };

  return (
    <Container>
      <CabecalhoTela />
      <Content>
        <div className="container-cadastro-faculdade">
          <h1 className='title'>{isEditMode ? 'Editar Aluno' : 'Cadastro de Alunos'}</h1>
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
            {!isEditMode && (
              <InputForm
                type='text'
                label='Senha do Aluno'
                value={senhaAluno}
                readOnly={true}
                onChange={() => { }}
              />
            )}
            <InputForm
              type='text'
              label='Faculdade do Aluno'
              value={faculdadeAlunoNome}
              onChange={() => { }}
              onClick={() => setOpenModalFaculdades(true)}
              readOnly={true}
              className='select'
            />
            <InputForm
              type='text'
              label='Ponto do Aluno'
              value={pontoNome}
              onChange={() => { }}
              onClick={() => setOpenModalPontos(true)}
              readOnly={true}
              className='select'
            />
          </div>
          <div className="buttons">
            <InputButton text={isEditMode ? 'Salvar' : 'Cadastrar'} onClick={handleSubmitForm} />
            {!isEditMode && (
              <InputButton text='Gerar Senha' onClick={generatePassword} />
            )}
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
      {openModalPontos && (
        <ModalPontos
          isOpen={openModalPontos}
          onClose={closeModal}
          onPontoSelecionado={handlePontoSelecionado}
        />
      )}
    </Container>
  );
};

export default CadastroAlunos;
