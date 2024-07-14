import React, { useEffect, useState } from 'react';
import CabecalhoTela from '../../../Components/CabecalhoTela/indexCabecalhoTela';
import Pagination from '@mui/material/Pagination';
import { FaTrash, FaPen } from "react-icons/fa";
import { marromEscuro, redHalley } from '../../../utils/colors';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Ponto, deletePonto, getPontos } from '../../../services/pontosServices';
import { formataCEP } from '../../../utils/fn';
import { Motorista, getMotoristas } from '../../../services/motoristasService';
import { Container, Content, Modal, Overlay } from './styleListagemVeiculos';
import { Veiculo, deleteVeiculo, getVeiculos } from '../../../services/veiculosServices';
import { IoIosArrowDown } from 'react-icons/io';

const ListagemVeiculos: React.FC = () => {
    const navigate = useNavigate();
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUsuarioId, setSelectedUsuarioId] = useState<string | null>(null);
    const [modalPosition, setModalPosition] = useState<{ top: number, left: number } | null>(null);
    const itemsPerPage = 7;

    useEffect(() => {
        const fetchVeiculos = async () => {
            try {
                const dataVeiculos = await getVeiculos();
                setVeiculos(dataVeiculos);
            } catch (error) {
                console.error('Erro ao buscar veiculos:', error);
                toast.error('Erro ao buscar veículos');
            }
        };

        fetchVeiculos();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = veiculos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(veiculos.length / itemsPerPage);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteVeiculo(id);
            setVeiculos(veiculos.filter(veiculo => veiculo.ID !== id));
            toast.success('Veículo excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar veiculo:', error);
            toast.error('Falha ao excluir veículo');
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/cadastro/veiculos/${id}`);
    };

    const handleAddVeiculo = () => {
        navigate('/cadastro/veiculos');
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
                <h1 className='title'>Listagem de Veículos <span className='add-veiculo' onClick={handleAddVeiculo}>+</span></h1>
                <div className="container-listagem">
                    <div className='cabecalho'>
                        <p>Tipo</p>
                        <p>Número</p>
                        <p>Marca</p>
                        <p>Modelo</p>
                        <p>Placa</p>
                        <p>Capacidade</p>
                        <p></p>
                    </div>
                    {currentItems.map(veiculo => (
                        <div className="corpo-listagem" key={veiculo.ID}>
                            <p>{veiculo.TIPO_VEICULO}</p>
                            <p>{veiculo.NUMERO_VEICULOS}</p>
                            <p>{veiculo.MARCA_VEICULOS}</p>
                            <p>{veiculo.MODELO_VEICULOS}</p>
                            <p>{veiculo.PLACA_VEICULOS}</p>
                            <p>{`${veiculo.CAPACIDADE_VEICULOS} alunos`}</p>
                            <p className='actions'>
                            <IoIosArrowDown
                                    style={{ fontSize: '22px', cursor: 'pointer' }}
                                    onClick={(e) => handleOpenModal(veiculo.ID, e)}
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

export default ListagemVeiculos;
