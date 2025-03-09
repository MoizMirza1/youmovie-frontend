import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginBg from '../../Assets/Images/loginBg.jpg';
import logo from '../../Assets/Images/LOGO-2.png';
import { Link } from 'react-router-dom';

const Registerform = ({ name, setName, email, setEmail, password, setPassword, role, setRole, handleRegister }) => {
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Empty Fields
    if (!name || !email || !password) {
      toast.error("All fields are required!", { position: "top-right" });
      return;
    }

    // Prevent users from registering as Admin
    if (role === "admin") {
      toast.error("Admins cannot self-register! Contact support.", { position: "top-right" });
      return;
    }

    try {
      await handleRegister();
      toast.success("Registration successful! 🎉", { position: "top-right" });
    } catch (error) {
      toast.error("Registration failed! Please try again.", { position: "top-right" });
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${loginBg})` }}
      className="flex justify-center items-center w-full min-h-screen bg-cover bg-center px-4"
    >
      <ToastContainer autoClose={3000} />
      
      <div className="bg-gray-900 p-8 sm:p-10 rounded-xl shadow-lg w-full max-w-md border border-gray-700">
        <div className="flex justify-center mb-4 sm:mb-6">
          <img src={logo} alt="Logo" className="w-24 sm:w-36 h-auto" />
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-white">Sign Up</h2>
<form onSubmit={handleRegister}>
          {/* Name Input */}
          <div className="mb-3 sm:mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 sm:py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Email Input */}
          <div className="mb-3 sm:mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 sm:py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Password Input */}
          <div className="mb-3 sm:mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 sm:py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Role Selection */}
          <div className="mb-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 sm:py-3 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-200 focus:outline-none"
          >
            Sign Up
          </button>

          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?
              <Link to="/login" className="text-blue-400 hover:underline ml-1">
                Sign in
              </Link>
            </p>
          </div>
        </form>

        {/* OR Separator */}
        <div className="my-5 sm:my-6 flex items-center">
          <hr className="w-full border-t border-gray-700" />
          <span className="mx-3 sm:mx-4 text-gray-500 text-sm sm:text-base">OR</span>
          <hr className="w-full border-t border-gray-700" />
        </div>

        {/* Google Login Button */}
        <div className="flex items-center justify-center">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 sm:py-3 border border-gray-600 rounded-lg text-white bg-gray-800 hover:bg-gray-700 transition duration-200">
            <img className="w-5 sm:w-6 h-5 sm:h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google logo" />
            <span className="text-sm sm:text-base">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registerform;
