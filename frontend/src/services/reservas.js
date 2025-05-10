import api from './api';

export const crearReserva = payload =>
  api.post('/reservar', payload);

export const listarReservasUsuario = userId =>
  api.get(`/reservas/${userId}`);
