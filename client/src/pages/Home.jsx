import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 mb-20 bg-white rounded-lg">
          <main className="mt-10 pt-3 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Side - Heading + Intro */}
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Welcome to</span>
                  <span className="block text-indigo-600">SolVIT</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Your college's very own online portal to register and resolve
                  complaints.
                </p>
              </div>

              {/* Right Side - Why SolVIT */}
              <div className="bg-white rounded-xl sm:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  Why SolVIT?
                </h2>
                <ul className="space-y-2 text-gray-600 text-lg sm:text-base list-disc pl-5">
                  <li className="text-xl">Register complaints online with ease</li>
                  <li className="text-xl">Track resolution status in real-time</li>
                  <li className="text-xl">Get notifications when updates are made</li>
                  <li className="text-xl">Transparent and efficient complaint handling</li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div className="relative h-56 sm:h-72 md:h-96 lg:h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
