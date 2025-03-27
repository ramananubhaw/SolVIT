import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/complaints';

const getAllComplaints = async () => {
  const response = await axios.get(`${API_URL}/details`, {
    withCredentials: true
  });
  return response.data;
};

const registerComplaint = async (complaintData) => {
  const response = await axios.post(`${API_URL}/register`, complaintData, {
    withCredentials: true
  });
  return response.data;
};

const updateComplaint = async (id, complaintData) => {
  const response = await axios.put(`${API_URL}/update/${id}`, complaintData, {
    withCredentials: true
  });
  return response.data;
};

const deleteComplaint = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`, {
    withCredentials: true
  });
  return response.data;
};

export {
  getAllComplaints,
  registerComplaint,
  updateComplaint,
  deleteComplaint
};