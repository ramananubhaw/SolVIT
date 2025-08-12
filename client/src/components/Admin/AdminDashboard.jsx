import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname.split('/')[2] || 'dashboard'
  );

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { path: 'dashboard', name: 'Dashboard', icon: '📊' },
              { path: 'complaints', name: 'Complaints', icon: '📝' },
              { path: 'users', name: 'User Management', icon: '👥' }
            ].map((tab) => (
              <li key={tab.path}>
                <Link
                  to={`/admin/${tab.path}`}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === tab.path
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab(tab.path)}
                >
                  <span className="text-lg mr-3">{tab.icon}</span>
                  <span>{tab.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;