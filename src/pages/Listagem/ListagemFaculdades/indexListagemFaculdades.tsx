import React, { useEffect, useState } from 'react';
import CabecalhoTela from '../../../Components/CabecalhoTela/indexCabecalhoTela';
import { Faculdade, deleteFaculdade, getFaculdades } from '../../../services/faculdadeServices';
import Pagination from '@mui/material/Pagination';
import { FaTrash, FaPen } from "react-icons/fa";
import { marromEscuro, redHalley } from '../../../utils/colors';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Container, Content } from './styleListagemFaculdades';

const ListagemFaculdades: React.FC = () => {
    const navigate = useNavigate();
    const [faculdades, setFaculdades] = useState<Faculdade[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchFaculdades = async () => {
            const dataFaculdades = await getFaculdades();
            setFaculdades(dataFaculdades);
        };

        fetchFaculdades();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = faculdades.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(faculdades.length / itemsPerPage);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteFaculdade(id);
            setFaculdades(faculdades.filter(faculdade => faculdade.ID !== id));
            toast.success('Faculdade excluída com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar faculdade:', error);
            toast.error('Falha ao excluir faculdade');
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/cadastro/faculdades/${id}`);
    };

    return (
        <Container>
            <CabecalhoTela />
            <Content>
                <h1 className='title'>Listagem de Faculdades</h1>
                <div className="container-listagem">
                    <div className='cabecalho'>
                        <p>NOME</p>
                        <p>SIGLA</p>
                        <p>CIDADE</p>
                        <p>CNPJ</p>
                        <p>TELEFONE</p>
                        <p>#</p>
                    </div>
                    {currentItems.map(faculdade => (
                        <div className="corpo-listagem" key={faculdade.ID}>
                            <p>{faculdade.NOME_FACULDADE}</p>
                            <p>{faculdade.SIGLA_FACULDADE}</p>
                            <p>{faculdade.CIDADE}</p>
                            <p>{faculdade.CNPJ}</p>
                            <p>{faculdade.TELEFONE}</p>
                            <p className='actions'>
                                <FaTrash
                                    style={{ marginLeft: '0px' }}
                                    className='icon-trash'
                                    color={redHalley}
                                    onClick={() => handleDelete(faculdade.ID)}
                                />
                                <FaPen
                                    style={{marginLeft: '0px'}}
                                    className='icon-edit'
                                    color={marromEscuro}
                                    onClick={() => handleEdit(faculdade.ID)}
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

export default ListagemFaculdades;
