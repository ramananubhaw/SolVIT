import UserManagement from '../../components/Admin/UserManagement';

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
      <UserManagement />
    </div>
  );
};

export default AdminUsers;