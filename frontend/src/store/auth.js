import { reactive, readonly } from 'vue';
import { login as apiLogin, register as apiRegister, getCurrentUser } from '../services/usuarios';

const state = reactive({ user: null, loading: false, error: null });

async function initAuth() {
  state.loading = true;
  try { const { data } = await getCurrentUser(); state.user = data; }
  catch { state.user = null; }
  finally { state.loading = false; }
}

async function login(credentials) {
  state.loading = true;
  try {
    const { data } = await apiLogin(credentials);
    state.user = data.user;
  } catch (e) {
    state.error = e.response?.data?.error;
  } finally {
    state.loading = false;
  }
}

async function register(payload) {
  state.loading = true;
  try {
    const { data } = await apiRegister(payload);
    state.user = data;
  } catch (e) {
    state.error = e.response?.data?.error;
  } finally {
    state.loading = false;
  }
}

function logout() {
  state.user = null;
}

export function useAuth() {
  return { state: readonly(state), initAuth, login, register, logout };
}
