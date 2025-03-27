const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Complaint Portal</h3>
              <p className="text-gray-400">Resolving your concerns efficiently</p>
            </div>
            <div className="flex space-x-4">
              <a href="/about" className="hover:text-blue-400">About</a>
              <a href="/contact" className="hover:text-blue-400">Contact</a>
              <a href="/privacy" className="hover:text-blue-400">Privacy Policy</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Complaint Portal. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;