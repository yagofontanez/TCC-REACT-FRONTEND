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
import { Container, Content } from './styleListagemMotoristas';
import { Motorista, deleteMotorista, getMotoristas } from '../../../services/motoristasService';
import { mascaraCPF, mascaraTelefone } from '../../../utils/fn';

const ListagemMotoristas: React.FC = () => {

    const navigate = useNavigate();

    const [motoristas, setMotoristas] = useState<Motorista[]>([]);
    const [pontos, setPontos] = useState<Ponto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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


    return (
        <Container>
            <CabecalhoTela />
            <Content>
                <h1 className='title'>Listagem de Motoristas</h1>
                <div className="container-listagem">
                    <div className='cabecalho'>
                        <p>NOME</p>
                        <p>SOBRENOME</p>
                        <p>CPF</p>
                        <p>EMAIL</p>
                        <p>TELEFONE</p>
                        <p>#</p>
                    </div>
                    {currentItems.map(usuario => (
                        <div className="corpo-listagem" key={usuario.ID}>
                            <p>{usuario.NOME_MOTORISTA}</p>
                            <p>{usuario.SOBRENOME_MOTORISTA}</p>
                            <p>{mascaraCPF(usuario.CPF_MOTORISTA)}</p>
                            <p>{usuario.EMAIL_MOTORISTA}</p>
                            <p>{mascaraTelefone(usuario.TELEFONE_MOTORISTA)}</p>
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

export default ListagemMotoristas;
