import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useComplaints } from '../../context/ComplaintContext';
import { COMPLAINT_STATUS, PRIORITY_LEVELS } from '../../utils/constants';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { complaints, loading, fetchComplaints } = useComplaints();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    normal: 0,
    problematic: 0,
    critical: 0
  });

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  useEffect(() => {
    if (complaints) {
      const newStats = {
        total: complaints.length,
        pending: complaints.filter(c => c.status === COMPLAINT_STATUS.PENDING).length,
        resolved: complaints.filter(c => c.status === COMPLAINT_STATUS.SOLVED).length,
        normal: complaints.filter(c => c.priority === PRIORITY_LEVELS.NORMAL).length,
        problematic: complaints.filter(c => c.priority === PRIORITY_LEVELS.PROBLEMATIC).length,
        critical: complaints.filter(c => c.priority === PRIORITY_LEVELS.CRITICAL).length
      };
      setStats(newStats);
    }
  }, [complaints]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="mt-1 text-sm text-gray-900">{user?.email_id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Phone Number</p>
            <p className="mt-1 text-sm text-gray-900">{user?.phone_no}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Block</p>
            <p className="mt-1 text-sm text-gray-900">{user?.block}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Complaint Statistics</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Total Complaints: {stats.total}</p>
            <p className="text-sm text-gray-600">Pending: {stats.pending}</p>
            <p className="text-sm text-gray-600">Resolved: {stats.resolved}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Priority Distribution</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Normal: {stats.normal}</p>
            <p className="text-sm text-gray-600">Problematic: {stats.problematic}</p>
            <p className="text-sm text-gray-600">Critical: {stats.critical}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Recent Activity</h3>
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : complaints.length === 0 ? (
            <p className="text-sm text-gray-500">No recent complaints</p>
          ) : (
            <div className="space-y-2">
              {complaints.slice(0, 3).map((complaint) => (
                <div key={complaint._id} className="text-sm">
                  <p className="text-gray-900">{complaint.category}</p>
                  <p className="text-gray-500">{complaint.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
