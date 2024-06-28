// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Container, Content } from './styleCadastroFaculdades';
import CabecalhoTela from '../../Components/CabecalhoTela/indexCabecalhoTela';
import InputForm from '../../Components/InputForm/indexInputForm';
import InputButton from '../../Components/InputButton/indexInputButton';
import { createFaculdades, getFaculdade, updateFaculdade } from '../../services/faculdadeServices';
import { ToastContainer, toast } from 'react-toastify';
import { mascaraCNPJ, mascaraTelefone } from '../../utils/fn';
import { fetchTodasCidades } from '../../utils/apiCidades';
import { useNavigate, useParams } from 'react-router-dom';

const CadastroFaculdades: React.FC = () => {

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const [nomeFaculdade, setNomeFaculdade] = useState('');
    const [siglaFaculdade, setSiglaFaculdade] = useState('');
    const [cidadeFaculdade, setCidadeFaculdade] = useState('');
    const [CNPJFaculdade, setCNPJFaculdade] = useState('');
    const [telefoneFaculdade, setTelefoneFaculdade] = useState('');
    const [cidades, setCidades] = useState<string[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const fetchCidades = async () => {
            try {
                const cidadesData = await fetchTodasCidades();
                const cidadesNomes = cidadesData.map(cidade => cidade.nome);
                setCidades(cidadesNomes);
            } catch (error) {
                console.error('Erro ao buscar cidades:', error);
            }
        };

        fetchCidades();
    }, []);

    useEffect(() => {
        if (id) {
            const fetchFaculdade = async () => {
                try {
                    const faculdade = await getFaculdade(id);
                    setNomeFaculdade(faculdade.NOME_FACULDADE);
                    setSiglaFaculdade(faculdade.SIGLA_FACULDADE || '');
                    setCidadeFaculdade(faculdade.CIDADE);
                    setCNPJFaculdade(faculdade.CNPJ);
                    setTelefoneFaculdade(faculdade.TELEFONE || '');

                    setIsEditMode(true);
                } catch(e) {
                    console.error('Erro ao carregar faculdade', e);
                    toast.error('Erro ao carregar faculdade');
                }
            };
            fetchFaculdade();
        }
    }, [id]);

    const handleSubmitForm = async () => {
        try {
            
            const novaFaculdade = {
                NOME_FACULDADE: nomeFaculdade,
                SIGLA_FACULDADE: siglaFaculdade,
                CIDADE: cidadeFaculdade,
                CNPJ: CNPJFaculdade,
                TELEFONE: telefoneFaculdade,
            };

            if (!nomeFaculdade) {
                toast.error('Nome da Faculdade é obrigatório');
                return;
            }
            if (!siglaFaculdade) {
                toast.error('Sigla da Faculdade é obrigatória');
                return;
            }
            if (!cidadeFaculdade) {
                toast.error('Cidade da Faculdade é obrigatória');
                return;
            }
            if (!CNPJFaculdade) {
                toast.error('CNPJ é obrigatório');
                return;
            }
            if (!telefoneFaculdade) {
                toast.error('Telefone é obrigatório');
                return;
            }
            if (!cidades.includes(cidadeFaculdade)) {
                toast.error('Cidade inválida!');
                return;
            }

            if (!cidades.includes(cidadeFaculdade) && cidadeFaculdade !== '') {
                toast.error('Cidade inválida!');
                return;
            }

            if (isEditMode) {
                if (id) {
                    await updateFaculdade(id, novaFaculdade);
                    toast.success('Faculdade atualizada com sucesso!');
                } else {
                    toast.error('ID da faculdade não encontrada');
                }
            } else {
                const response = await createFaculdades(novaFaculdade);
                console.log('Faculdade cadastrada com sucesso:', response);
                toast.success('Faculdade cadastrada com sucesso!');
                setNomeFaculdade('');
                setSiglaFaculdade('');
                setCidadeFaculdade('');
                setCNPJFaculdade('');
                setTelefoneFaculdade('');
            }

            navigate('/listagem/faculdades');
        } catch (error) {
            console.error('Erro ao cadastrar faculdade:', error);
            toast.error('Falha ao cadastrar Faculdade.')
        }
    };

    const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCNPJFaculdade(mascaraCNPJ(e.target.value));
    }

    const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelefoneFaculdade(mascaraTelefone(e.target.value));
    }

    return (
        <Container>
            <CabecalhoTela />
            <Content>
                <div className="container-cadastro-faculdade">
                    <h1 className='title'>{isEditMode ? 'Editar Faculdade' : 'Cadastro de Faculdades'}</h1>
                    <div className="form-cadastro">
                        <InputForm
                            type='text'
                            label='Nome da Faculdade'
                            value={nomeFaculdade}
                            onChange={(e: any) => { setNomeFaculdade(e.target.value) }}
                        />
                        <InputForm
                            type='text'
                            label='Sigla da Faculdade'
                            value={siglaFaculdade}
                            onChange={(e: any) => { setSiglaFaculdade(e.target.value) }}
                        />
                        <InputForm
                            type='text'
                            label='Cidade da Faculdade'
                            value={cidadeFaculdade}
                            onChange={(e: any) => { setCidadeFaculdade(e.target.value) }}
                        />
                        <InputForm
                            type='tel'
                            label='CNPJ da Faculdade'
                            value={CNPJFaculdade}
                            onChange={(e: any) => { setCNPJFaculdade(e.target.value) }}
                            onBlur={handleCNPJChange}
                            maxLength={18}
                        />
                        <InputForm
                            type='tel'
                            label='Telefone da Faculdade'
                            value={telefoneFaculdade}
                            onChange={(e: any) => { setTelefoneFaculdade(e.target.value) }}
                            onBlur={handleTelChange}
                            maxLength={15}
                        />
                    </div>
                    <InputButton text={isEditMode ? 'Salvar' : 'Cadastrar'} onClick={handleSubmitForm} />
                </div>
            </Content>
        </Container>
    );
};

export default CadastroFaculdades;
