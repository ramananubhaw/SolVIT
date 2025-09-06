import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useComplaints } from '../../context/ComplaintContext';
import ComplaintCard from '../../components/Complaint/ComplaintCard';
import { COMPLAINT_STATUS, PRIORITY_LEVELS } from '../../utils/constants';

const AdminComplaints = () => {
  const { user } = useAuth();
  const { complaints, loading, fetchComplaints } = useComplaints();
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    block: ''
  });

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const filteredComplaints = complaints.filter(complaint => {
    if (filters.status && complaint.status !== filters.status) return false;
    if (filters.priority && complaint.priority !== filters.priority) return false;
    if (filters.block && complaint.block !== filters.block) return false;
    return true;
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Manage Complaints</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
            >
              <option value="">All Statuses</option>
              <option value={COMPLAINT_STATUS.PENDING}>Pending</option>
              <option value={COMPLAINT_STATUS.SOLVED}>Resolved</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
            >
              <option value="">All Priorities</option>
              <option value={PRIORITY_LEVELS.NORMAL}>Normal</option>
              <option value={PRIORITY_LEVELS.PROBLEMATIC}>Problematic</option>
              <option value={PRIORITY_LEVELS.CRITICAL}>Critical</option>
            </select>
          </div>

          <div>
            <label htmlFor="block" className="block text-sm font-medium text-gray-700">
              Block
            </label>
            <select
              id="block"
              name="block"
              value={filters.block}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
            >
              <option value="">All Blocks</option>
              <option value="MH-A">MH-A</option>
              <option value="MH-B">MH-B</option>
              <option value="MH-C">MH-C</option>
              <option value="LH-A">LH-A</option>
              <option value="LH-B">LH-B</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading complaints...</p>
        ) : filteredComplaints.length === 0 ? (
          <p className="text-gray-500">No complaints found matching the filters.</p>
        ) : (
          <div className="space-y-4">
            {filteredComplaints.map((complaint) => (
              <ComplaintCard key={complaint._id} complaint={complaint} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminComplaints; 