import axios from 'axios';

const API = process.env.REACT_APP_API_BASE;

export const register = (data) => axios.post(`${API}/usuarios/register`, data);
export const login = (data) => axios.post(`${API}/usuarios/login`, data);
export const getUser = (id) => axios.get(`${API}/usuarios/${id}`);
export const updateUser = (id, data) => axios.put(`${API}/usuarios/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API}/usuarios/${id}`);