import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Faculdade, getFaculdades } from '../../services/faculdadeServices';
import { marromEscuro } from '../../utils/colors';
import { ModalContainer, ModalContent } from './styleModalNotificacoes';
import { getPedidos, PedidoCadastro } from '../../services/pedidosCadastroServices';
import { FaPlus } from "react-icons/fa";
import { mascaraTelefone } from '../../utils/fn';
import { getPontos, Ponto } from '../../services/pontosServices';

interface ModalNotificacoesProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalNotificacoes: React.FC<ModalNotificacoesProps> = ({ isOpen, onClose }) => {

    const [pedidos, setPedidos] = useState<PedidoCadastro[]>([]);
    const [faculdades, setFaculdades] = useState<Faculdade[]>([]);
    const [pontos, setPontos] = useState<Ponto[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const pedidoIdRemovido = location.state?.pedidoIdRemovido;

    useEffect(() => {
        const fetchPedidosCadastro = async () => {
            const dataPedidosCadastro = await getPedidos();
            setPedidos(dataPedidosCadastro);
        };

        const fetchFaculdadeAlunos = async () => {
            const dataFaculdadeAlunos = await getFaculdades();
            setFaculdades(dataFaculdadeAlunos);
        };

        const fetchPontoAlunos = async () => {
            const dataPontoAlunos = await getPontos();
            setPontos(dataPontoAlunos);
        };

        fetchPontoAlunos();
        fetchFaculdadeAlunos();
        fetchPedidosCadastro();
    }, []);

    // Remover o pedido da lista quando pedidoIdRemovido mudar
    useEffect(() => {
        if (pedidoIdRemovido) {
            setPedidos(prevPedidos => prevPedidos.filter(pedido => pedido.ID !== pedidoIdRemovido));
        }
    }, [pedidoIdRemovido]);

    const getFaculdadeNome = (faculdadeId: any) => {
        const faculdade = faculdades.find(faculdade => faculdade.ID === faculdadeId);
        return faculdade ? faculdade.NOME_FACULDADE : 'Desconhecido';
    };

    const getPontoNome = (pontoId: any) => {
        const ponto = pontos.find(ponto => ponto.ID === pontoId);
        return ponto ? ponto.NOME_PONTO : 'Desconhecido';
    };

    const handleRealizaCadastro = (pedido: PedidoCadastro) => {
        navigate('/cadastro/alunos', { state: { pedidoId: pedido.ID, pedido } });
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose(); 
        }
    };

    if (!isOpen) return null;

    return (
        <ModalContainer onClick={handleOverlayClick}>
            <ModalContent ref={modalRef}>
                <h1 style={{color: `${marromEscuro}`}}>Notificações/Pedidos</h1>
                <div className="div-separator">
                    {pedidos.map(pedido => (
                        <div className='faculdades-line' key={pedido.ID} onClick={() => {}}>
                            <p>{pedido.NOME_PEDIDO} {pedido.SOBRENOME_PEDIDO}</p>
                            <p>{getFaculdadeNome(pedido.FACULDADE_PEDIDO)}</p>
                            <p>{getPontoNome(pedido.PONTO_PEDIDO)}</p>
                            <p>{pedido.EMAIL_PEDIDO}</p>
                            <p>{mascaraTelefone(pedido.TELEFONE_PEDIDO)}</p>
                            <FaPlus color={marromEscuro} onClick={() => handleRealizaCadastro(pedido)}/>
                        </div>
                    ))}
                </div>
            </ModalContent>
        </ModalContainer>
    );
};

export default ModalNotificacoes;
