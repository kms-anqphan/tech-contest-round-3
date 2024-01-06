import api from './api';

const API_MODEL_URL = '/user';

const login = (email, password) => {
  return api.post(`${API_MODEL_URL}/login`, {
    email,
    password
  });
}

const adminLogin = (email, password) =>
  api.post(`${API_MODEL_URL}/admin_login`, { email, password });

const AuthService = {
  login,
  adminLogin
};

export default AuthService;