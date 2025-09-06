import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useComplaints } from '../../context/ComplaintContext';
import { COMPLAINT_STATUS, PRIORITY_LEVELS } from '../../utils/constants';

const ComplaintCard = ({ complaint }) => {
  const { isAdmin } = useAuth();
  const { updateComplaint, deleteComplaint, categorizePriority } = useComplaints();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStatusUpdate = async () => {
    setLoading(true);
    setError('');
    try {
      const newStatus = complaint.status === COMPLAINT_STATUS.PENDING ? COMPLAINT_STATUS.SOLVED : COMPLAINT_STATUS.PENDING;
      const result = await updateComplaint(complaint._id, complaint.reg_no, { status: newStatus });
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      console.error('Status update error:', err);
      setError('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await deleteComplaint(complaint._id, complaint.reg_no);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to delete complaint');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorize = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await categorizePriority(complaint._id);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to categorize complaint');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case PRIORITY_LEVELS.NORMAL:
        return 'bg-green-100 text-green-800';
      case PRIORITY_LEVELS.PROBLEMATIC:
        return 'bg-yellow-100 text-yellow-800';
      case PRIORITY_LEVELS.CRITICAL:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case PRIORITY_LEVELS.NORMAL:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case PRIORITY_LEVELS.PROBLEMATIC:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case PRIORITY_LEVELS.CRITICAL:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-app-dark shadow rounded-lg p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-white">{complaint.category}</h3>
          <p className="mt-1 text-sm text-gray-300">{complaint.complaint}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            complaint.status === COMPLAINT_STATUS.PENDING
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {complaint.status}
          </span>
          {complaint.priority && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
              {getPriorityIcon(complaint.priority)}
              {complaint.priority}
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-gray-600 pt-4">
        <div className="flex justify-between items-center text-sm text-gray-300">
          <div>
            <p>Block: {complaint.block}</p>
            <p>Room: {complaint.room_no}</p>
            {isAdmin && <p>Student: {complaint.reg_no}</p>}
          </div>
          <div className="flex space-x-2">
            {isAdmin && complaint.status === COMPLAINT_STATUS.PENDING && !complaint.priority && (
              <button
                onClick={handleCategorize}
                disabled={loading}
                className="px-3 py-1 text-sm font-medium text-app-blue hover:text-blue-400 disabled:text-gray-400"
              >
                Categorize
              </button>
            )}
            {(isAdmin || complaint.status === COMPLAINT_STATUS.PENDING) && (
              <button
                onClick={handleStatusUpdate}
                disabled={loading}
                className="px-3 py-1 text-sm font-medium text-app-blue hover:text-blue-400 disabled:text-gray-400"
              >
                {complaint.status === COMPLAINT_STATUS.PENDING ? 'Mark Resolved' : 'Reopen'}
              </button>
            )}
            {(isAdmin || complaint.status === COMPLAINT_STATUS.PENDING) && (
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-3 py-1 text-sm font-medium text-red-500 hover:text-red-400 disabled:text-gray-400"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default ComplaintCard; 