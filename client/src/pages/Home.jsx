import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Complaint Portal</h1>
        <p className="text-lg text-gray-600 mb-8">
          A platform to register and track your complaints efficiently. Get quick resolutions from our support team.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            User Login
          </Link>
          <Link
            to="/admin/login"
            className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;