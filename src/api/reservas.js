import axios from 'axios';

const API = process.env.REACT_APP_API_BASE;

export const getReservas = () => axios.get(`${API}/reservas/all`);
export const getReservasPorUsuario = (id) => axios.get(`${API}/reservas/usuario/${id}`);
export const getReservasPorPelicula = (id) => axios.get(`${API}/reservas/pelicula/${id}`);
export const createReserva = (data) => axios.post(`${API}/reservas`, data);
export const deleteReserva = (id) => axios.delete(`${API}/reservas/reserva/${id}`);
