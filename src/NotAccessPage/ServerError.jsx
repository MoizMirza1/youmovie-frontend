import React from "react";
import { Link } from "react-router-dom";

const ServerError = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">🚨 Server Error 🚨</h1>
      <p className="text-lg">Oops! Our backend is currently unavailable.</p>
      <p className="text-lg">Please try again later.</p>
      <Link to="/" className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md">
        Go to Home
      </Link>
    </div>
  );
};

export default ServerError;
