import axios from 'axios';

const API = process.env.REACT_APP_API_BASE;

export const getPeliculas = () => axios.get(`${API}/cartelera/peliculas`);
export const getPelicula = (id) => axios.get(`${API}/cartelera/peliculas/${id}`);
export const createPelicula = (data) => axios.post(`${API}/cartelera/peliculas`, data);
