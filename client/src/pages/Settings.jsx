import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Settings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email_id: user?.email_id || '',
    phone_no: user?.phone_no || '',
    block: user?.block || '',
    room_no: user?.room_no || ''
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
    setSuccess('');
    setLoading(true);

    try {
      const response = await api.put('/users/update', formData);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-app-dark rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              className="form-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="block" className="form-label">Block</label>
              <select
                id="block"
                name="block"
                value={formData.block}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Block</option>
                <option value="MH-A">MH-A</option>
                <option value="MH-B">MH-B</option>
                <option value="MH-C">MH-C</option>
                <option value="LH-A">LH-A</option>
                <option value="LH-B">LH-B</option>
              </select>
            </div>

            <div>
              <label htmlFor="room_no" className="form-label">Room Number</label>
              <input
                type="number"
                id="room_no"
                name="room_no"
                value={formData.room_no}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-500 text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-app-blue hover:bg-[#1666b8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-app-blue disabled:opacity-50 transition-colors"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings; 