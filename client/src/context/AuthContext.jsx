import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { USER_ROLES } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get('/users/current');
      setUser({ ...response.data.user, role: USER_ROLES.USER });
    } catch (error) {
      try {
        const adminResponse = await api.get('/admin/current');
        setUser({ ...adminResponse.data.admin, role: USER_ROLES.ADMIN });
      } catch (adminError) {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials, isAdmin = false) => {
    try {
      const endpoint = isAdmin ? '/admin/login' : '/users/login';
      await api.post(endpoint, credentials);
      await checkAuthStatus();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('Registration data:', userData);
      const response = await api.post('/users/register', userData);
      console.log('Registration response:', response.data);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error.response?.data || error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    try {
      const endpoint = user?.role === USER_ROLES.ADMIN ? '/admin/logout' : '/users/logout';
      await api.post(endpoint);
      setUser(null);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Logout failed' 
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === USER_ROLES.ADMIN
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 