import api from './api';

export interface Usuario {
  ID: string;
  NOME: string;
  SOBRENOME: string;
  EMAIL: string;
  TELEFONE: string;
  SENHA: string;
  FACULDADE_ID?: string;
  PONTO_ID?: string;
}

export const getUsuarios = async (): Promise<Usuario[]> => {
  const response = await api.get('/usuarios');
  return response.data;
};

export const createUsuario = async (usuario: Omit<Usuario, 'ID'>): Promise<Usuario> => {
    const response = await api.post('/usuarios', usuario);
    return response.data;
  };

export const getUsuario = async (id: string): Promise<Usuario> => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};

export const updateUsuario = async (id: string, usuario: Partial<Omit<Usuario, 'ID'>>): Promise<Usuario> => {
  const response = await api.put(`/usuarios/${id}`, usuario);
  return response.data;
};

export const deleteUsuario = async (id: string): Promise<void> => {
  await api.delete(`/usuarios/${id}`);
};
