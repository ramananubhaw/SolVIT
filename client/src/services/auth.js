import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/logout`, {}, {
    withCredentials: true
  });
  return response.data;
};

const currentUser = async () => {
  const response = await axios.get(`${API_URL}/current`, {
    withCredentials: true
  });
  return response.data;
};

const updateUser = async (userData) => {
  const response = await axios.put(`${API_URL}/update`, userData, {
    withCredentials: true
  });
  return response.data;
};

export {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUser
};