import api from './api';

export interface Faculdade {
    ID: string;
    NOME_FACULDADE: string;
    SIGLA_FACULDADE?: string;
    CIDADE: string;
    CNPJ: string;
    TELEFONE?: string;
}

export const getFaculdades = async (): Promise<Faculdade[]> => {
    const response = await api.get('/faculdades');
    return response.data;
};

export const createFaculdades = async (faculdade: Omit<Faculdade, 'ID'>): Promise<Faculdade> => {
    const response = await api.post('/faculdades', faculdade);
    return response.data;
};

export const getFaculdade = async(id: string): Promise<Faculdade> => {
    const response = await api.get(`/faculdades/${id}`);
    return response.data;
};

export const updateFaculdade = async (id: string, faculdade: Partial<Omit<Faculdade, 'ID'>>): Promise<Faculdade> => {
    const response = await api.put(`/faculdades/${id}`, faculdade);
    return response.data;
};

export const deleteFaculdade = async (id: string): Promise<void> => {
    await api.delete(`/faculdades/${id}`);
}