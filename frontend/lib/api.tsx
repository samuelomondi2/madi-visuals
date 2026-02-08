import axios from 'axios';

const api = axios.create({
  baseURL: 'https://madi-visuals.onrender.com/api',
  withCredentials: true, // REQUIRED for sessions
});

export default api;
