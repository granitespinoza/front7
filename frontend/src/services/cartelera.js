import api from './api';

export const listarPeliculas = () =>
  api.get('/cartelera');

export const obtenerPelicula = id =>
  api.get(`/cartelera/${id}`);
