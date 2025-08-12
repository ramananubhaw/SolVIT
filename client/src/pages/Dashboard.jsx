import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintContext';
import ComplaintCard from '../components/Complaint/ComplaintCard';
import ComplaintForm from '../components/Complaint/ComplaintForm';

const Dashboard = () => {
  const { user } = useAuth();
  const { complaints, loading, fetchComplaints } = useComplaints();

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Registration Number</p>
            <p className="mt-1 text-sm text-gray-900">{user?.reg_no}</p>
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
          <div>
            <p className="text-sm font-medium text-gray-500">Room Number</p>
            <p className="mt-1 text-sm text-gray-900">{user?.room_no}</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Register New Complaint</h2>
          <ComplaintForm onSuccess={fetchComplaints} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Complaints</h2>
          {loading ? (
            <p className="text-gray-500">Loading complaints...</p>
          ) : complaints.length === 0 ? (
            <p className="text-gray-500">No complaints registered yet.</p>
          ) : (
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <ComplaintCard key={complaint._id} complaint={complaint} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
