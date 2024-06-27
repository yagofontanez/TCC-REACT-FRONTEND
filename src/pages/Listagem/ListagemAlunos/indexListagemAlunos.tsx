import React, { useEffect, useState } from 'react';
import CabecalhoTela from '../../../Components/CabecalhoTela/indexCabecalhoTela';
import { Container, Content } from './styleListagemAlunos';
import { Usuario, deleteUsuario, getUsuarios } from '../../../services/usuarioServices';
import Pagination from '@mui/material/Pagination';
import { CiTrash } from "react-icons/ci";
import { redHalley } from '../../../utils/colors';
import { toast } from 'react-toastify';

const ListagemAlunos: React.FC = () => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchUsuarios = async () => {
            const dataUsuarios = await getUsuarios();
            setUsuarios(dataUsuarios);
        };

        fetchUsuarios();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = usuarios.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(usuarios.length / itemsPerPage);

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
                            <p>TESTE</p>
                            <p>TESTE</p>
                            <p>
                                <CiTrash
                                    style={{ marginLeft: '0px' }}
                                    className='icon-trash'
                                    color={redHalley}
                                    onClick={() => handleDelete(usuario.ID)}
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
