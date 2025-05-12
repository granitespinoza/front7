// src/services/reservas.js
import api from './api';

export const crearReserva    = payload => api.post('/reservar', payload);
export const obtenerReservas = userId  => api.get(`/reservas/${userId}`);
