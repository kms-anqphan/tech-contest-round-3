import axios from 'axios';

import TokenService from './TokenService';

const API_BASE_URL = 'http://appyours.kms-technology.com:14001/api';

const instance = axios.create({
  baseURL: API_BASE_URL
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      TokenService.removeUser();
    }
    return Promise.reject(error);
  }
);

export default instance;