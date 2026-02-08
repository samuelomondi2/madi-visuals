import axios from 'axios';

const api = axios.create({
  baseURL: process.env.FRONTEND_URL,
  withCredentials: true,
});


export default api;
