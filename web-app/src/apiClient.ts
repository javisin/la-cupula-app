import axios from 'axios';
import { logout } from './util/auth';

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

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      window.location.replace('/login');
      logout();
      return;
    }

    return Promise.reject(error);
  },
);

export default apiClient;
