// src/services/usuarios.js
import api from './api';

export async function login({ email, password }) {
  const url = `/usuarios?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
  const res = await api.get(url);
  const users = res.data;
  if (!users.length) {
    const err = new Error('Credenciales inválidas');
    err.response = { data: { error: 'Credenciales inválidas' }, status: 401 };
    throw err;
  }
  return { token: 'fake-jwt-token', user: users[0] };
}

export async function registrar({ username, email, password, dni }) {
  const res = await api.post('/usuarios', { username, email, password, dni });
  return res.data;
}

export async function obtenerUsuario(id) {
  const res = await api.get(`/usuarios/${id}`);
  return res.data;
}

export async function obtenerUsuarioActual() {
  const saved = JSON.parse(localStorage.getItem('user') || 'null');
  if (saved?.id) return obtenerUsuario(saved.id);
  const error = new Error('No hay usuario autenticado');
  error.response = { status: 401, data: { error: error.message } };
  throw error;
}
