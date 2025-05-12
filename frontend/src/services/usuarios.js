// src/services/usuarios.js
import api from './api';

/**
 * Login con JSON-Server filtrando por email y password.
 * Devuelve { token, user } simulando un JWT.
 */
export async function login({ email, password }) {
  // JSON-Server soporta queries ?email=...&password=...
  const res = await api.get(
    `/usuarios?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );
  const users = res.data;
  if (!users.length) {
    const error = new Error('Credenciales inválidas');
    error.response = { data: { error: 'Credenciales inválidas' }, status: 401 };
    throw error;
  }
  const user = users[0];
  // Simula un token
  return { token: 'fake-jwt-token', user };
}

/**
 * Registro de nuevo usuario: POST /usuarios
 */
export async function registrar({ username, email, password, dni }) {
  const res = await api.post('/usuarios', { username, email, password, dni });
  return res.data;
}

/**
 * Obtener un usuario por ID: GET /usuarios/:id
 */
export async function obtenerUsuario(id) {
  const res = await api.get(`/usuarios/${id}`);
  return res.data;
}

/**
 * Obtener usuario actual:
 * Aquí tendrías que leer el ID desde el token o localStorage.
 * Para el mock, simplemente devolvemos /usuarios/1
 */
export async function obtenerUsuarioActual() {
  // Si guardas el userId cuando haces login:
  const saved = JSON.parse(localStorage.getItem('user') || 'null');
  if (saved?.id) {
    return obtenerUsuario(saved.id);
  }
  const error = new Error('No hay usuario autenticado');
  error.response = { status: 401, data: { error: error.message } };
  throw error;
}