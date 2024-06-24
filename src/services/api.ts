import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}`,
});

export default api;
