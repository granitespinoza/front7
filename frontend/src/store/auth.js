// src/store/auth.js
import { reactive } from 'vue';
import { login as apiLogin, obtenerUsuarioActual } from '../services/usuarios';

export function useAuth() {
  const state = reactive({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token')
  });

  async function initAuth() {
    try {
      const user = await obtenerUsuarioActual();
      state.user = user;
      state.isAuthenticated = true;
    } catch {
      state.user = null;
      state.isAuthenticated = false;
    }
  }

  async function login(credentials) {
    const { token, user } = await apiLogin(credentials);
    state.user = user;
    state.token = token;
    state.isAuthenticated = true;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  async function logout() {
    state.user = null;
    state.token = null;
    state.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return { ...state, initAuth, login, logout };
}
