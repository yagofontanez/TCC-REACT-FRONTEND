import api from './api';

export interface PedidoCadastro {
    ID: string;
    NOME_PEDIDO: string;
    SOBRENOME_PEDIDO: string;
    EMAIL_PEDIDO: string;
    TELEFONE_PEDIDO: string;
    FACULDADE_PEDIDO: string;
    PONTO_PEDIDO: string;
}

export const getPedidos = async (): Promise<PedidoCadastro[]> => {
    const response = await api.get('/pedidosCadastro'); 
    return response.data;
};

export const deletePedido = async (id: string): Promise<void> => {
    await api.delete(`/pedidosCadastro/${id}`); 
};
