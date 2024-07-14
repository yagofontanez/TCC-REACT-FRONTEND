import React, { useEffect, useState, useRef } from 'react';
import CabecalhoTela from '../../../Components/CabecalhoTela/indexCabecalhoTela';
import { Container, Content, Overlay, Modal } from './styleListagemAlunos';
import { Usuario, deleteUsuario, getUsuarios } from '../../../services/usuarioServices';
import Pagination from '@mui/material/Pagination';
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
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
    const [selectedUsuarioId, setSelectedUsuarioId] = useState<string | null>(null);
    const [modalPosition, setModalPosition] = useState<{ top: number, left: number } | null>(null);
    const itemsPerPage = 7;

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
            handleCloseModal();
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            toast.error('Falha ao excluir aluno');
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/cadastro/alunos/${id}`);
    };

    const handleAddAluno = () => {
        navigate('/cadastro/alunos');
    };

    const handleOpenModal = (id: string, event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setModalPosition({ 
            top: rect.top + window.scrollY, 
            left: (rect.left + window.scrollX) - 16 
        });
        setSelectedUsuarioId(id);
    };
    

    const handleCloseModal = () => {
        setSelectedUsuarioId(null);
        setModalPosition(null);
    };

    return (
        <Container>
            <CabecalhoTela />
            <Content>
                <h1 className='title'>
                    Listagem de Alunos 
                    <span className='add-aluno' onClick={handleAddAluno}>
                        +
                    </span>
                </h1>
                <div className="container-listagem">
                    <div className='cabecalho'>
                        <p>Nome</p>
                        <p>Sobrenome</p>
                        <p>Email</p>
                        <p>Telefone</p>
                        <p>Faculdade</p>
                        <p>Ponto</p>
                        <p></p>
                    </div>
                    {currentItems.map(usuario => (
                        <div className="corpo-listagem" key={usuario.ID}>
                            <p className='diferente'>{usuario.NOME}</p>
                            <p>{usuario.SOBRENOME}</p>
                            <p className='diferente'>{usuario.EMAIL}</p>
                            <p>{usuario.TELEFONE}</p>
                            <p className='diferente'>{getFaculdadeNome(usuario.FACULDADE_ID || '')}</p>
                            <p>{getPontoNome(usuario.PONTO_ID || '')}</p>
                            <p className='actions'>
                                <IoIosArrowDown
                                    style={{ fontSize: '22px', cursor: 'pointer' }}
                                    onClick={(e) => handleOpenModal(usuario.ID, e)}
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
            {selectedUsuarioId && modalPosition && (
                <>
                    <Overlay onClick={handleCloseModal} />
                    <Modal style={{ top: modalPosition.top, left: modalPosition.left }}>
                        <IoIosArrowDown style={{ fontSize: '22px', cursor: 'pointer' }} />
                        <div className='modal-content'>
                            <div className='modal-item' onClick={() => handleEdit(selectedUsuarioId)}>
                                <FaPen />
                                <span>Editar</span>
                            </div>
                            <div className='modal-item' onClick={() => handleDelete(selectedUsuarioId)}>
                                <FaTrash />
                                <span>Excluir</span>
                            </div>
                        </div>
                    </Modal>
                </>
            )}
        </Container>
    );
};

export default ListagemAlunos;
