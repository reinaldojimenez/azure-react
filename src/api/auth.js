import axios from './axios';

//const API = 'http://localhost:3001/api/v1'

export const loginRequest = user => axios.post(`/auth/signin`, user);

export const logoutRequest = () => axios.post(`/auth/logout`);

export const verifyTokenRequest = () => axios.get(`/auth/verify`);

export const generarQRRequest = data => axios.post(`/users/generarQR`, data);