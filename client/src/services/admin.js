import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

export const loginAdmin = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const getAdminStats = async () => {
  const token = localStorage.getItem('adminToken');
  const response = await axios.get(`${API_URL}/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getAllUsers = async () => {
  const token = localStorage.getItem('adminToken');
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getAllComplaints = async () => {
  const token = localStorage.getItem('adminToken');
  const response = await axios.get(`${API_URL}/complaints/details`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateComplaintStatus = async (id, status) => {
  const token = localStorage.getItem('adminToken');
  const response = await axios.put(
    `${API_URL}/complaints/update/${id}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};