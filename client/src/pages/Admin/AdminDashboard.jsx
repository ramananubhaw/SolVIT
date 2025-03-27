import StatsOverview from '../../components/Admin/StatsOverview';

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      <StatsOverview />
      {/* Additional dashboard widgets can be added here */}
    </div>
  );
};

export default AdminDashboard;