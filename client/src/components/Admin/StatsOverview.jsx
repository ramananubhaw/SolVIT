import { useEffect, useState } from 'react';
import { getAdminStats } from '../../services/admin';

const StatsOverview = () => {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    openComplaints: 0,
    resolvedComplaints: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        setError(err.message || 'Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 rounded-lg bg-gray-100 animate-pulse h-24"></div>
        ))}
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Complaints" 
        value={stats.totalComplaints} 
        icon="📋"
        color="bg-blue-100 text-blue-600"
      />
      <StatCard 
        title="Open Complaints" 
        value={stats.openComplaints} 
        icon="🔓"
        color="bg-yellow-100 text-yellow-600"
      />
      <StatCard 
        title="Resolved" 
        value={stats.resolvedComplaints} 
        icon="✅"
        color="bg-green-100 text-green-600"
      />
      <StatCard 
        title="Total Users" 
        value={stats.totalUsers} 
        icon="👥"
        color="bg-purple-100 text-purple-600"
      />
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className={`p-6 rounded-lg ${color} flex flex-col`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </div>
);

export default StatsOverview;