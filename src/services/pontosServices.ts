import api from './api';

export interface Ponto {
    ID: string;
    NOME_PONTO: string;
    RUA_PONTO: string;
    BAIRRO_PONTO: string;
    CIDADE_PONTO: string;
    CEP: string;
    PONTO_REFERENCIA?: string;
}

export const getPontos = async (): Promise<Ponto[]> => {
    const response = await api.get('/pontos');
    return response.data;
};

export const createPontos = async (pontos: Omit<Ponto, 'ID'>): Promise<Ponto> => {
    const response = await api.post('/pontos', pontos);
    return response.data;
};

export const getPonto = async(id: string): Promise<Ponto> => {
    const response = await api.get(`/pontos/${id}`);
    return response.data;
};

export const updatePonto = async (id: string, ponto: Partial<Omit<Ponto, 'ID'>>): Promise<Ponto> => {
    const response = await api.put(`/pontos/${id}`, ponto);
    return response.data;
};

export const deletePonto = async (id: string): Promise<void> => {
    await api.delete(`/pontos/${id}`);
}