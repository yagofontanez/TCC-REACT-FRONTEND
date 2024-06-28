import React, { useEffect, useState } from 'react';
import CabecalhoTela from '../../../Components/CabecalhoTela/indexCabecalhoTela';
import { Faculdade, deleteFaculdade, getFaculdades } from '../../../services/faculdadeServices';
import Pagination from '@mui/material/Pagination';
import { FaTrash, FaPen } from "react-icons/fa";
import { marromEscuro, redHalley } from '../../../utils/colors';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Container, Content } from './styleListagemPontos';
import { Ponto, deletePonto, getPontos } from '../../../services/pontosServices';
import { formataCEP } from '../../../utils/fn';

const ListagemPontos: React.FC = () => {
    const navigate = useNavigate();
    const [faculdades, setFaculdades] = useState<Faculdade[]>([]);
    const [pontos, setPontos] = useState<Ponto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchPontos = async () => {
            const dataPontos = await getPontos();
            setPontos(dataPontos);
        }

        fetchPontos();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pontos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(faculdades.length / itemsPerPage);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleDelete = async (id: string) => {
        try {
            await deletePonto(id);
            setPontos(pontos.filter(ponto => ponto.ID !== id));
            toast.success('Ponto excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar ponto:', error);
            toast.error('Falha ao excluir ponto');
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/cadastro/pontos/${id}`);
    };

    return (
        <Container>
            <CabecalhoTela />
            <Content>
                <h1 className='title'>Listagem de Pontos</h1>
                <div className="container-listagem">
                    <div className='cabecalho'>
                        <p>NOME</p>
                        <p>RUA</p>
                        <p>BAIRRO</p>
                        <p>CIDADE</p>
                        <p>PONTO DE<br/>REFERÊNCIA</p>
                        <p>CEP</p>
                        <p>#</p>
                    </div>
                    {currentItems.map(ponto => (
                        <div className="corpo-listagem" key={ponto.ID}>
                            <p>{ponto.NOME_PONTO}</p>
                            <p>{ponto.RUA_PONTO}</p>
                            <p>{ponto.BAIRRO_PONTO}</p>
                            <p>{ponto.CIDADE_PONTO}</p>
                            <p>{ponto.PONTO_REFERENCIA}</p>
                            <p>{formataCEP(ponto.CEP)}</p>
                            <p className='actions'>
                                <FaTrash
                                    style={{ marginLeft: '0px' }}
                                    className='icon-trash'
                                    color={redHalley}
                                    onClick={() => handleDelete(ponto.ID)}
                                />
                                <FaPen
                                    style={{marginLeft: '0px'}}
                                    className='icon-edit'
                                    color={marromEscuro}
                                    onClick={() => handleEdit(ponto.ID)}
                                />
                            </p>
                        </div>
                    ))}
                </div>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                />
            </Content>
        </Container>
    );
};

export default ListagemPontos;
