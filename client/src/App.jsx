import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminComplaints from './pages/Admin/AdminComplaints';
import AdminUsers from './pages/Admin/AdminUsers';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/complaints" element={<PrivateRoute><Complaints /></PrivateRoute>} />
              
              <Route path="/admin/login" element={<AdminLogin />} />
              
              <Route element={<AdminRoute><AdminDashboard /></AdminRoute>}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/complaints" element={<AdminComplaints />} />
                <Route path="/admin/users" element={<AdminUsers />} />
              </Route>
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;