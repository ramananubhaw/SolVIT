const AdminComplaintCard = ({ complaint, onStatusUpdate }) => {
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
  
    const handleStatusChange = (e) => {
      onStatusUpdate(complaint._id, e.target.value);
    };
  
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {complaint.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                By: {complaint.user.name} ({complaint.user.email})
              </p>
            </div>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(complaint.priority)}`}>
              {complaint.priority}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            {complaint.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <select
                value={complaint.status}
                onChange={handleStatusChange}
                className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(complaint.status)} focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <span className="text-xs text-gray-500">
              {new Date(complaint.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Category: <span className="font-medium">{complaint.category}</span>
          </span>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View User Details →
          </button>
        </div>
      </div>
    );
  };
  
  export default AdminComplaintCard;