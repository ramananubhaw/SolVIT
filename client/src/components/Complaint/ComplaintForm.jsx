import { useState } from 'react';
import { useComplaints } from '../../context/ComplaintContext';
import { COMPLAINT_CATEGORIES } from '../../utils/constants';

const ComplaintForm = () => {
  const { registerComplaint } = useComplaints();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    category: '',
    complaint: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.category) {
      setError('Please select a category');
      return;
    }
    if (!formData.complaint || !formData.complaint.trim()) {
      setError('Please enter a description');
      return;
    }

    setLoading(true);
    try {
      const result = await registerComplaint({
        category: formData.category,
        complaint: formData.complaint
      });
      
      if (result.success) {
        setSuccess('Complaint submitted successfully');
        setFormData({ category: '', complaint: '' });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-app-dark rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Submit a Complaint</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select a category</option>
              {COMPLAINT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="complaint" className="form-label">
              Description
            </label>
            <textarea
              id="complaint"
              name="complaint"
              rows="4"
              value={formData.complaint}
              onChange={handleChange}
              placeholder="Please describe your complaint in detail..."
              className="form-input"
            />
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
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
