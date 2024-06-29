import api from './api';

export interface Motorista {
    ID: string;
    NOME_MOTORISTA: string;
    SOBRENOME_MOTORISTA: string;
    CPF_MOTORISTA: string;
    EMAIL_MOTORISTA: string;
    TELEFONE_MOTORISTA: string;
    PONTO_ID: string;
}

export const getMotoristas = async (): Promise<Motorista[]> => {
    const response = await api.get('/motoristas');
    return response.data;
};

export const createMotorista = async (motorista: Omit<Motorista, 'ID'>): Promise<Motorista> => {
    const response = await api.post('/motoristas', motorista);
    return response.data;
};

export const getMotorista = async (id: string): Promise<Motorista> => {
    const response = await api.get(`/motoristas/${id}`);
    return response.data;
};

export const updateMotorista = async (id: string, motorista: Partial<Omit<Motorista, 'ID'>>): Promise<Motorista> => {
    const response = await api.put(`/motoristas/${id}`, motorista);
    return response.data;
};

export const deleteMotorista = async (id: string): Promise<void> => {
    await api.delete(`/motoristas/${id}`);
};