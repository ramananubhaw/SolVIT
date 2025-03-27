import { useAuth } from '../context/AuthContext';
import ComplaintList from '../components/Complaint/ComplaintList';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.name}</h1>
        <p className="text-gray-600 mt-2">
          Here you can manage your complaints and track their status.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <ComplaintList />
      </div>
    </div>
  );
};

export default Dashboard;