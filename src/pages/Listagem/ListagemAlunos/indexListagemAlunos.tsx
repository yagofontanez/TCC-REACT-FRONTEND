import React, { useEffect, useState } from 'react';
import CabecalhoTela from '../../../Components/CabecalhoTela/indexCabecalhoTela';
import { Container, Content } from './styleListagemAlunos';
import { Usuario, deleteUsuario, getUsuarios } from '../../../services/usuarioServices';
import Pagination from '@mui/material/Pagination';
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { marromEscuro, redHalley } from '../../../utils/colors';
import { toast } from 'react-toastify';
import { Faculdade, getFaculdades } from '../../../services/faculdadeServices';
import { Ponto, getPontos } from '../../../services/pontosServices';
import { useNavigate } from 'react-router-dom';

const ListagemAlunos: React.FC = () => {

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [faculdades, setFaculdades] = useState<Faculdade[]>([]);
    const [pontos, setPontos] = useState<Ponto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchUsuarios = async () => {
            const dataUsuarios = await getUsuarios();
            setUsuarios(dataUsuarios);
        };

        const fetchFaculdades = async () => {
            const dataFaculdades = await getFaculdades();
            setFaculdades(dataFaculdades);
        };

        const fetchPontos = async () => {
            const dataPontos = await getPontos();
            setPontos(dataPontos);
        }

        fetchPontos();
        fetchFaculdades();
        fetchUsuarios();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = usuarios.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(usuarios.length / itemsPerPage);

    const faculdadesMap = new Map(faculdades.map(faculdade => [faculdade.ID, faculdade.NOME_FACULDADE]));
    const pontosMap = new Map(pontos.map(ponto => [ponto.ID, ponto.NOME_PONTO]));

    const getFaculdadeNome = (faculdadeId: string) => {
        return faculdadesMap.get(faculdadeId) || 'Desconhecida';
    };
    const getPontoNome = (pontoId: string) => {
        return pontosMap.get(pontoId) || 'Desconhecido';
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteUsuario(id);
            setUsuarios(usuarios.filter(usuario => usuario.ID !== id));
            toast.success('Aluno excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            toast.error('Falha ao excluir aluno');
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/cadastro/alunos/${id}`);
      };


    return (
        <Container>
            <CabecalhoTela />
            <Content>
                <h1 className='title'>Listagem de Alunos</h1>
                <div className="container-listagem">
                    <div className='cabecalho'>
                        <p>NOME</p>
                        <p>SOBRENOME</p>
                        <p>EMAIL</p>
                        <p>TELEFONE</p>
                        <p>FACULDADE</p>
                        <p>PONTO</p>
                        <p>#</p>
                    </div>
                    {currentItems.map(usuario => (
                        <div className="corpo-listagem" key={usuario.ID}>
                            <p>{usuario.NOME}</p>
                            <p>{usuario.SOBRENOME}</p>
                            <p>{usuario.EMAIL}</p>
                            <p>{usuario.TELEFONE}</p>
                            <p>{getFaculdadeNome(usuario.FACULDADE_ID || '')}</p>
                            <p>{getPontoNome(usuario.PONTO_ID || '')}</p>
                            <p className='actions'>
                                <FaTrash
                                    style={{ marginLeft: '0px' }}
                                    className='icon-trash'
                                    color={redHalley}
                                    onClick={() => handleDelete(usuario.ID)}
                                />
                                <FaPen
                                    style={{marginLeft: '0px'}}
                                    className='icon-edit'
                                    color={marromEscuro}
                                    onClick={() => handleEdit(usuario.ID)}
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

export default ListagemAlunos;
