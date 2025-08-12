import { createContext, useContext, useState, useCallback } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const ComplaintContext = createContext(null);

export const ComplaintProvider = ({ children }) => {
  const { isAdmin } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = isAdmin ? '/admin/complaints/details' : '/users/complaints/details';
      const response = await api.get(endpoint);
      setComplaints(response.data.complaints);
      return { success: true };
    } catch (error) {
      console.error('Error fetching complaints:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch complaints' 
      };
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  const registerComplaint = async (complaintData) => {
    try {
      await api.post('/users/complaints/register', complaintData);
      await fetchComplaints();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to register complaint' 
      };
    }
  };

  const updateComplaint = async (id, reg_no, updateData) => {
    try {
      const endpoint = isAdmin ? '/admin/complaints/update' : '/users/complaints/update';
      if (updateData.status) {
        await api.put(`${endpoint}?id=${id}&reg_no=${reg_no}`, { status: updateData.status });
      } else {
        await api.put(`${endpoint}?id=${id}&reg_no=${reg_no}`, updateData);
      }
      await fetchComplaints();
      return { success: true };
    } catch (error) {
      console.error('Update error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update complaint' 
      };
    }
  };

  const deleteComplaint = async (id, reg_no) => {
    try {
      if (isAdmin) {
        await api.delete(`/admin/complaints/delete/${id}`);
      } else {
        await api.delete('/users/complaints/delete', { params: { id } });
      }
      await fetchComplaints();
      return { success: true };
    } catch (error) {
      console.error('Delete error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to delete complaint' 
      };
    }
  };

  const categorizePriority = async (id) => {
    try {
      const response = await api.post(`/admin/complaints/categorize?id=${id}`);
      if (response.data.success) {
        await fetchComplaints();
        return { success: true };
      } else {
        return { 
          success: false, 
          error: response.data.message || 'Failed to categorize complaint' 
        };
      }
    } catch (error) {
      console.error('Categorize error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to categorize complaint' 
      };
    }
  };

  const value = {
    complaints,
    loading,
    fetchComplaints,
    registerComplaint,
    updateComplaint,
    deleteComplaint,
    categorizePriority
  };

  return (
    <ComplaintContext.Provider value={value}>
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
};
