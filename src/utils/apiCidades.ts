import axios from 'axios';

const BASE_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades';

export const fetchEstados = async () => {
    const response = await axios.get(`${BASE_URL}/estados`);
    return response.data;
};

export const fetchCidadesPorEstado = async (uf: any) => {
    const response = await axios.get(`${BASE_URL}/estados/${uf}/municipios`);
    return response.data;
};

export const fetchTodasCidades = async () => {
    const estados = await fetchEstados();
    const cidadesPromises = estados.map((estado: any) => fetchCidadesPorEstado(estado.sigla));
    const cidadesPorEstado = await Promise.all(cidadesPromises);
    const todasCidades = cidadesPorEstado.flat();
    return todasCidades;
};
