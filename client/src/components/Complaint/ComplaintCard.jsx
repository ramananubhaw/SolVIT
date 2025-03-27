import { Link } from 'react-router-dom';

const ComplaintCard = ({ complaint }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            <Link to={`/complaints/${complaint._id}`} className="hover:text-blue-600">
              {complaint.title}
            </Link>
          </h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(complaint.priority)}`}>
            {complaint.priority}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {complaint.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(complaint.status)}`}>
            {complaint.status}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(complaint.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3 flex justify-end">
        <Link
          to={`/complaints/${complaint._id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default ComplaintCard;