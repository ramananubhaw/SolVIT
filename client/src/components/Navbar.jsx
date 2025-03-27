import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const isAdmin = localStorage.getItem('adminToken');

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Complaint Portal
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                <Link to="/complaints" className="text-gray-700 hover:text-blue-600">
                  Complaints
                </Link>
                <button 
                  onClick={logout}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : isAdmin ? (
              <>
                <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600">
                  Admin Dashboard
                </Link>
                <button 
                  onClick={() => {
                    localStorage.removeItem('adminToken');
                    window.location.href = '/admin/login';
                  }}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Admin Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/register" className="text-gray-700 hover:text-blue-600">
                  Register
                </Link>
                <Link to="/admin/login" className="text-gray-700 hover:text-blue-600">
                  Admin Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;