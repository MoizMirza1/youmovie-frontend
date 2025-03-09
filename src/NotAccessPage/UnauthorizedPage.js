import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-black">
      <h1 className="text-8xl font-bold text-gray-600">🚫 Access Denied</h1>
      <p className="mt-4 text-gray-700 text-xl">You do not have permission to view this page.</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Go to Home
      </Link>
      
      
    </div>
    
  );
};

export default UnauthorizedPage;
