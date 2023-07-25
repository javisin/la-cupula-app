import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3001/api' : '/api',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
