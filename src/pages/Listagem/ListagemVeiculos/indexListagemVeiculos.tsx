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
import { Container, Content } from './styleListagemVeiculos';
import { Veiculo, deleteVeiculo, getVeiculos } from '../../../services/veiculosServices';

const ListagemVeiculos: React.FC = () => {
    const navigate = useNavigate();
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    return (
        <Container>
            <CabecalhoTela />
            <Content>
                <h1 className='title'>Listagem de Veículos</h1>
                <div className="container-listagem">
                    <div className='cabecalho'>
                        <p>TIPO</p>
                        <p>NUMERO</p>
                        <p>MARCA</p>
                        <p>MODELO</p>
                        <p>PLACA</p>
                        <p>CAPACIDADE</p>
                        <p>#</p>
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
                                <FaTrash
                                    style={{ marginLeft: '0px' }}
                                    className='icon-trash'
                                    color={redHalley}
                                    onClick={() => handleDelete(veiculo.ID)}
                                />
                                <FaPen
                                    style={{marginLeft: '0px'}}
                                    className='icon-edit'
                                    color={marromEscuro}
                                    onClick={() => handleEdit(veiculo.ID)}
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

export default ListagemVeiculos;
