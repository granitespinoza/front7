import api from './api';

export const register = payload =>
  api.post('/usuarios/register', payload);

export const login = credentials =>
  api.post('/usuarios/login', credentials);

export const getCurrentUser = () =>
  api.get('/usuarios/me');

export const getUserById = id =>
  api.get(`/usuarios/${id}`);
