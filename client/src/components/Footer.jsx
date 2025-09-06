const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">SolVIT</h3>
            <p className="text-sm">Your college's Hostel Complaint Management System</p>
          </div>
          <div className="text-sm">
            <p>&copy; {new Date().getFullYear()} SolVIT. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
