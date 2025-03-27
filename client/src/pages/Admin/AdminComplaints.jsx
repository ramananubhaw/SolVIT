import AdminComplaintList from '../../components/Admin/AdminComplaintList';

const AdminComplaints = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Complaint Management</h1>
      </div>
      <AdminComplaintList />
    </div>
  );
};

export default AdminComplaints;