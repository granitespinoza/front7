// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? 'http://localhost:8000'            // mock JSON-Server
    : import.meta.env.VITE_API_URL,      // producción
  headers: { 'Content-Type': 'application/json' },
  // NO incluimos withCredentials para evitar CORS en dev
});

export default api;
