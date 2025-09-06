import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email_id: '',
    phone_no: '',
    block: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/admin/register', {
        name: formData.name,
        email_id: formData.email_id,
        phone_no: formData.phone_no,
        block: formData.block,
        password: formData.password
      });
      
      navigate('/admin/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-app-dark rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Register Admin Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="email_id" className="form-label">Email</label>
            <input
              type="email"
              id="email_id"
              name="email_id"
              value={formData.email_id}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="phone_no" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="phone_no"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="block" className="form-label">Block</label>
            <select
              id="block"
              name="block"
              value={formData.block}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select Block</option>
              {/* <!-- MH Blocks --> */}
              <option value="MH-A">MH-A</option>
              <option value="MH-B">MH-B</option>
              <option value="MH-C">MH-C</option>
              <option value="MH-D">MH-D</option>
              <option value="MH-E">MH-E</option>
              <option value="MH-F">MH-F</option>
              <option value="MH-G">MH-G</option>
              <option value="MH-H">MH-H</option>
              <option value="MH-J">MH-J</option>
              <option value="MH-K">MH-K</option>
              <option value="MH-L">MH-L</option>
              <option value="MH-M">MH-M</option>
              <option value="MH-N">MH-N</option>
              <option value="MH-P">MH-P</option>
              <option value="MH-Q">MH-Q</option>
              <option value="MH-R">MH-R</option>
              <option value="MH-S">MH-S</option>
              <option value="MH-T">MH-T</option>

              {/* <!-- LH Blocks --> */}
              <option value="LH-A">LH-A</option>
              <option value="LH-B">LH-B</option>
              <option value="LH-C">LH-C</option>
              <option value="LH-D">LH-D</option>
              <option value="LH-E">LH-E</option>
              <option value="LH-F">LH-F</option>
              <option value="LH-G">LH-G</option>
              <option value="LH-H">LH-H</option>
              <option value="LH-J">LH-J</option>

              {/* <!-- Main Hostel Offices --> */}
              <option value="MH-*">MH Main Office</option>
              <option value="LH-*">LH Main Office</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="8"
              className="form-input"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-app-blue hover:bg-[#1666b8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-app-blue disabled:opacity-50 transition-colors"
          >
            {loading ? 'Registering...' : 'Register Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister; 