import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginBg from "../../Assets/Images/loginBg.jpg";
import logo from "../../Assets/Images/LOGO-2.png";

const LoginForm = ({ setloginChoice, loginChoice, password, setPassword, handleLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const isValid = await handleLogin(e); 

    if (!isValid) {
      toast.error("Incorrect Credentials. Please try again!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${loginBg})` }}
      className="flex justify-center items-center w-full min-h-screen bg-cover bg-center p-4"
    >
      <ToastContainer />
      <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-700">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-32 h-auto" />
        </div>
        <h2 className="text-xl font-semibold mb-6 text-center text-white">Login</h2>

        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter Email or Name"
              value={loginChoice}
              onChange={(e) => setloginChoice(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 pr-12"
            />
            <button
              type="button"
              className="absolute top-3 right-4 text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          <button
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none shadow-lg transition-all"
            type="submit"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-400">
              Don't have an account?
              <Link to="/register" className="text-blue-400 hover:underline ml-1">
                Sign Up
              </Link>
            </p>
          </div>
          <div className="my-6 flex items-center">
            <hr className="w-full border-t-2 border-gray-600" />
            <span className="mx-4 text-gray-400">or</span>
            <hr className="w-full border-t-2 border-gray-600" />
          </div>
          <div className="flex items-center justify-center">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg text-white hover:border-gray-400 hover:shadow transition duration-150">
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span className="ml-2">Login with Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
