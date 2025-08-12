import { useEffect } from 'react';
import { useComplaints } from '../context/ComplaintContext';
import ComplaintCard from '../components/Complaint/ComplaintCard';

const Complaints = () => {
  const { complaints, loading, fetchComplaints } = useComplaints();

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All Complaints</h2>
        {loading ? (
          <p className="text-gray-500">Loading complaints...</p>
        ) : complaints.length === 0 ? (
          <p className="text-gray-500">No complaints found.</p>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <ComplaintCard key={complaint._id} complaint={complaint} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaints;
