import { createContext, useContext, useState } from 'react';
import { 
  getAllComplaints as fetchAllComplaints,
  registerComplaint as createComplaint,
  updateComplaint as updateExistingComplaint,
  deleteComplaint as removeComplaint
} from '../services/complaints';

const ComplaintContext = createContext();

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllComplaints = async () => {
    setLoading(true);
    try {
      const data = await fetchAllComplaints();
      setComplaints(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const registerComplaint = async (complaintData) => {
    setLoading(true);
    try {
      const newComplaint = await createComplaint(complaintData);
      setComplaints([...complaints, newComplaint]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateComplaint = async (id, complaintData) => {
    setLoading(true);
    try {
      const updatedComplaint = await updateExistingComplaint(id, complaintData);
      setComplaints(complaints.map(c => 
        c._id === id ? updatedComplaint : c
      ));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteComplaint = async (id) => {
    setLoading(true);
    try {
      await removeComplaint(id);
      setComplaints(complaints.filter(c => c._id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComplaintContext.Provider value={{
      complaints,
      loading,
      error,
      getAllComplaints,
      registerComplaint,
      updateComplaint,
      deleteComplaint
    }}>
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => useContext(ComplaintContext);