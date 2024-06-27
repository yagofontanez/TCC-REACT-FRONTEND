import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CabecalhoTela from '../../Components/CabecalhoTela/indexCabecalhoTela';
import InputForm from '../../Components/InputForm/indexInputForm';
import InputButton from '../../Components/InputButton/indexInputButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Content } from './styleCadastroPontos';
import { createPontos } from '../../services/pontosServices';
import { fetchTodasCidades } from '../../utils/apiCidades';

const CadastroPontos: React.FC = () => {
    const navigate = useNavigate();

    const [nomePonto, setNomePonto] = useState('');
    const [ruaPonto, setRuaPonto] = useState('');
    const [bairroPonto, setBairroPonto] = useState('');
    const [cidadePonto, setCidadePonto] = useState('');
    const [pontoReferencia, setPontoReferencia] = useState('');
    const [cepPonto, setCepPonto] = useState('');
    const [cidades, setCidades] = useState<string[]>([]);

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

    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const cep = e.target.value.replace(/\D/g, '');
        setCepPonto(cep);

        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                if (response.data.erro) {
                    toast.error('CEP não encontrado.');
                    setRuaPonto('');
                    setBairroPonto('');
                    setCidadePonto('');
                } else {
                    const { logradouro, bairro, localidade } = response.data;
                    setRuaPonto(logradouro);
                    setBairroPonto(bairro);
                    setCidadePonto(localidade);
                }
            } catch (error) {
                toast.error('Erro ao buscar endereço com o CEP fornecido');
                console.error('Erro ao buscar endereço:', error);
                setRuaPonto('');
                setBairroPonto('');
                setCidadePonto('');
            }
        } else if (cep.length === 0) {
            setRuaPonto('');
            setBairroPonto('');
            setCidadePonto('');
        }
    };

    const handleSubmitForm = async () => {
        try {
            const novoPonto = {
                NOME_PONTO: nomePonto,
                RUA_PONTO: ruaPonto,
                BAIRRO_PONTO: bairroPonto,
                CIDADE_PONTO: cidadePonto,
                PONTO_REFERENCIA: pontoReferencia,
                CEP: cepPonto,
            };

            if (!nomePonto) {
                toast.error('Nome do Ponto é Obrigatório');
                return;
            }
            if (!ruaPonto) {
                toast.error('Rua do Ponto é obrigatória');
                return;
            }
            if (!bairroPonto) {
                toast.error('Bairro do Ponto é obrigatório');
                return;
            }
            if (!cidadePonto) {
                toast.error('Cidade do Ponto é obrigatória');
                return;
            }
            if (!cidades.includes(cidadePonto)) {
                toast.error('Cidade inválida!');
                return;
            }

            const response = await createPontos(novoPonto);
            console.log('Ponto criado com sucesso!', response);
            toast.success('Ponto cadastrado com sucesso!');
            navigate('/gerenciamento');
        } catch (e) {
            console.error('Erro ao cadastrar Ponto:', e);
            toast.error('Erro ao cadastrar Ponto');
        }
    }

    return (
        <Container>
            <CabecalhoTela />
            <Content>
                <div className="container-cadastro-faculdade">
                    <h1 className='title'>Cadastro de Pontos</h1>
                    <div className="form-cadastro">
                        <InputForm
                            type='text'
                            label='Nome do Ponto'
                            value={nomePonto}
                            onChange={(e: any) => { setNomePonto(e.target.value) }}
                        />
                        <InputForm
                            type='text'
                            label='CEP'
                            value={cepPonto}
                            onChange={handleCepChange}
                            maxLength={8}
                        />
                        <InputForm
                            type='text'
                            label='Rua do Ponto'
                            value={ruaPonto}
                            onChange={(e: any) => { setRuaPonto(e.target.value) }}
                        />
                        <InputForm
                            type='text'
                            label='Bairro'
                            value={bairroPonto}
                            onChange={(e: any) => { setBairroPonto(e.target.value) }}
                        />
                        <InputForm
                            type='text'
                            label='Cidade do Ponto'
                            value={cidadePonto}
                            onChange={(e: any) => { setCidadePonto(e.target.value) }}
                        />
                        <InputForm
                            type='text'
                            label='Ponto de Referência'
                            value={pontoReferencia}
                            onChange={(e: any) => { setPontoReferencia(e.target.value) }}
                        />
                    </div>
                    <div className="buttons">
                        <InputButton text='Cadastrar' onClick={handleSubmitForm} />
                    </div>
                </div>
            </Content>
        </Container>
    );
};

export default CadastroPontos;
