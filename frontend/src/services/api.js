// src/services/api.js
//
// Instancia central de Axios utilizada por *todos* los services.
// – Lee la URL base desde .env               →  VITE_API_URL
// – Envía cookies (JWT HttpOnly) en cada req →  withCredentials: true
// – Interceptor de respuesta: si el Orquestador devuelve 401,
//   redirige al usuario a /login.

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000', // ← Orquestador
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// ─────────────────────────────────────────────────────────────
// Interceptor: si la sesión expira, enviamos al login.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
