import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminComplaintCard from './AdminComplaintCard';

const AdminComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:5000/api/admin/complaints/details', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setComplaints(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch complaints');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const filteredComplaints = filter === 'all' 
    ? complaints 
    : complaints.filter(complaint => complaint.status === filter);

  const updateComplaintStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`http://localhost:5000/api/admin/complaints/update/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComplaints(complaints.map(complaint => 
        complaint._id === id ? { ...complaint, status } : complaint
      ));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">All Complaints</h2>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No complaints found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <AdminComplaintCard 
              key={complaint._id} 
              complaint={complaint} 
              onStatusUpdate={updateComplaintStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminComplaintList;