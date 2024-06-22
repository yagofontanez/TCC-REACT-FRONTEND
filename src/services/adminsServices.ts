import api from './api';

export interface Admin {
    ID: string;
    NOME_USUARIO: string;
    EMAIL: string;
    SENHA: string;
}

export const getAdmins = async (): Promise<Admin[]> => {
    const response = await api.get('/admins');
    return response.data;
};

export const createAdmin = async (admin: Omit<Admin, 'ID'>): Promise<Admin> => {
    const response = await api.post('/admins', admin);
    return response.data;
};

export const getAdmin = async (id: string): Promise<Admin> => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
};

export const updateAdmin = async (id: string, admin: Partial<Omit<Admin, 'ID'>>): Promise<Admin> => {
    const response = await api.put(`/admins/${id}`, admin);
    return response.data;
};

export const deleteAdmin = async (id: string): Promise<void> => {
    await api.delete(`/admins/${id}`);
};