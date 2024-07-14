import React, { useEffect, useState } from 'react';
import CabecalhoTela from '../../../Components/CabecalhoTela/indexCabecalhoTela';
import { Usuario, deleteUsuario, getUsuarios } from '../../../services/usuarioServices';
import Pagination from '@mui/material/Pagination';
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { marromEscuro, redHalley } from '../../../utils/colors';
import { toast } from 'react-toastify';
import { Faculdade, getFaculdades } from '../../../services/faculdadeServices';
import { Ponto, getPontos } from '../../../services/pontosServices';
import { useNavigate } from 'react-router-dom';
import { Container, Content, Modal, Overlay } from './styleListagemMotoristas';
import { Motorista, deleteMotorista, getMotoristas } from '../../../services/motoristasService';
import { mascaraCPF, mascaraTelefone } from '../../../utils/fn';
import { IoIosArrowDown } from 'react-icons/io';

const ListagemMotoristas: React.FC = () => {

    const navigate = useNavigate();

    const [motoristas, setMotoristas] = useState<Motorista[]>([]);
    const [pontos, setPontos] = useState<Ponto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUsuarioId, setSelectedUsuarioId] = useState<string | null>(null);
    const [modalPosition, setModalPosition] = useState<{ top: number, left: number } | null>(null);
    const itemsPerPage = 7;

    useEffect(() => {
        const fetchMotoristas = async () => {
            const dataMotoristas = await getMotoristas();
            setMotoristas(dataMotoristas);
        };

        const fetchPontos = async () => {
            const fetchPontos = await getPontos();
            setPontos(fetchPontos);
        };

        fetchPontos();
        fetchMotoristas();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = motoristas.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(motoristas.length / itemsPerPage);

    const pontosMap = new Map(pontos.map(ponto => [ponto.ID, ponto.NOME_PONTO]));


    const getPontoNome = (pontoId: string) => {
        return pontosMap.get(pontoId) || 'Desconhecido';
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteMotorista(id);
            setMotoristas(motoristas.filter(motorista => motorista.ID !== id));
            toast.success('Motorista excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar motorista:', error);
            toast.error('Falha ao excluir motorista');
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/cadastro/motoristas/${id}`);
    };

    
    const handleAddMotorista = () => {
        navigate('/cadastro/motoristas');
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
                <h1 className='title'>Listagem de Motoristas <span className='add-motorista' onClick={handleAddMotorista}>+</span></h1>
                <div className="container-listagem">
                    <div className='cabecalho'>
                        <p>Nome</p>
                        <p>Sobrenome</p>
                        <p>CPF</p>
                        <p>Email</p>
                        <p>Telefone</p>
                        <p></p>
                    </div>
                    {currentItems.map(motorista => (
                        <div className="corpo-listagem" key={motorista.ID}>
                            <p>{motorista.NOME_MOTORISTA}</p>
                            <p>{motorista.SOBRENOME_MOTORISTA}</p>
                            <p>{mascaraCPF(motorista.CPF_MOTORISTA)}</p>
                            <p>{motorista.EMAIL_MOTORISTA}</p>
                            <p>{mascaraTelefone(motorista.TELEFONE_MOTORISTA)}</p>
                            <p className='actions'>
                            <IoIosArrowDown
                                    style={{ fontSize: '22px', cursor: 'pointer' }}
                                    onClick={(e) => handleOpenModal(motorista.ID, e)}
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

export default ListagemMotoristas;
