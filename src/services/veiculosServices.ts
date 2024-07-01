import api from './api';

export interface Veiculo {
    ID: string;
    TIPO_VEICULO: string;
    NUMERO_VEICULOS: any;
    MARCA_VEICULOS: string;
    MODELO_VEICULOS: string;
    PLACA_VEICULOS: string;
    CAPACIDADE_VEICULOS: any;
}

export const getVeiculos = async (): Promise<Veiculo[]> => {
    const response = await api.get('/veiculos');
    return response.data;
};

export const createVeiculo = async (veiculo: Omit<Veiculo, 'ID'>): Promise<Veiculo> => {
    const response = await api.post('/veiculos', veiculo);
    return response.data;
};

export const getVeiculo = async (id: string): Promise<Veiculo> => {
    const response = await api.get(`/veiculos/${id}`);
    return response.data;
};
  
export const updateVeiculo = async (id: string, veiculo: Partial<Omit<Veiculo, 'ID'>>): Promise<Veiculo> => {
    const response = await api.put(`/veiculos/${id}`, veiculo);
    return response.data;
};

export const deleteVeiculo = async (id: string): Promise<void> => {
    await api.delete(`/veiculos/${id}`);
};