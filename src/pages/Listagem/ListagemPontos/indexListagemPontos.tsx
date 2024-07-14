import React, { useEffect, useState } from 'react';
import CabecalhoTela from '../../../Components/CabecalhoTela/indexCabecalhoTela';
import Pagination from '@mui/material/Pagination';
import { FaTrash, FaPen } from "react-icons/fa";
import { marromEscuro, redHalley } from '../../../utils/colors';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Container, Content, Modal, Overlay } from './styleListagemPontos';
import { Ponto, deletePonto, getPontos } from '../../../services/pontosServices';
import { formataCEP } from '../../../utils/fn';
import { Motorista, getMotoristas } from '../../../services/motoristasService';
import { IoIosArrowDown } from 'react-icons/io';

const ListagemPontos: React.FC = () => {
    const navigate = useNavigate();
    const [pontos, setPontos] = useState<Ponto[]>([]);
    const [motoristas, setMotoristas] = useState<Motorista[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUsuarioId, setSelectedUsuarioId] = useState<string | null>(null);
    const [modalPosition, setModalPosition] = useState<{ top: number, left: number } | null>(null);
    const itemsPerPage = 7;

    useEffect(() => {
        const fetchPontos = async () => {
            try {
                const dataPontos = await getPontos();
                setPontos(dataPontos);
            } catch (error) {
                console.error('Erro ao buscar pontos:', error);
                toast.error('Erro ao buscar pontos');
            }
        };

        const fetchMotoristas = async () => {
            try {
                const dataMotoristas = await getMotoristas();
                setMotoristas(dataMotoristas);
            } catch (error) {
                console.error('Erro ao buscar motoristas:', error);
                toast.error('Erro ao buscar motoristas');
            }
        };

        fetchPontos();
        fetchMotoristas();
    }, []);

    const currentItems = pontos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(pontos.length / itemsPerPage);

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

    const motoristasMap = new Map(motoristas.map(motorista => [motorista.ID, motorista.NOME_MOTORISTA]));

    const getMotoristaNome = (motoristaId: string) => {
        return motoristasMap.get(motoristaId) || 'Desconhecido';
    };

    const handleOpenModal = (id: string, event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setModalPosition({ 
            top: rect.top + window.scrollY, 
            left: (rect.left + window.scrollX) - 16 
        });
        setSelectedUsuarioId(id);
    };

    const handleAddPonto = () => {
        navigate('/cadastro/pontos');
    };

    
    const handleCloseModal = () => {
        setSelectedUsuarioId(null);
        setModalPosition(null);
    };

    return (
        <Container>
            <CabecalhoTela />
            <Content>
                <h1 className='title'>Listagem de Pontos <span className='add-ponto' onClick={handleAddPonto}>+</span></h1>
                <div className="container-listagem">
                    <div className='cabecalho'>
                        <p>Nome</p>
                        <p>Rua</p>
                        <p>Bairro</p>
                        <p>Cidade</p>
                        <p>Ponto de<br/>Referência</p>
                        <p>CEP</p>
                        <p>Motorista</p>
                        <p></p>
                    </div>
                    {currentItems.map(ponto => (
                        <div className="corpo-listagem" key={ponto.ID}>
                            <p>{ponto.NOME_PONTO}</p>
                            <p>{ponto.RUA_PONTO}</p>
                            <p>{ponto.BAIRRO_PONTO}</p>
                            <p>{ponto.CIDADE_PONTO}</p>
                            <p>{ponto.PONTO_REFERENCIA}</p>
                            <p>{formataCEP(ponto.CEP)}</p>
                            <p>{getMotoristaNome(ponto.MOTORISTA_ID)}</p>
                            <p className='actions'>
                            <IoIosArrowDown
                                    style={{ fontSize: '22px', cursor: 'pointer' }}
                                    onClick={(e) => handleOpenModal(ponto.ID, e)}
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

export default ListagemPontos;
