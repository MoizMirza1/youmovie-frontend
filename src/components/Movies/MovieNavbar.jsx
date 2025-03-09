import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import logo from "../../Assets/Images/logo-without-text.png";
import profilePic from "../../Assets/Images/HomepageImages/defaultProfile.jpeg";
import { AuthContext } from "../../context/AuthContext";
import MovieSearch from "../../utils/MovieSearch"; // Import the new Search Component

const MovieNavbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full flex h-20 items-center px-6 z-50 transition-all duration-300 ${
        scrollY > 50 ? "bg-black bg-opacity-80 shadow-md" : "bg-black bg-opacity-100"
      }`}
    >
      <div className="mx-auto flex max-w-6xl w-full items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img className="w-20 h-20 mt-4" src={logo} alt="Logo" />
          <h2 className="text-white text-2xl font-bold mt-2">YouMovies</h2>
        </Link>

        {/* Right Section: Search + Profile + Purchase Button */}
        <div className="flex items-center space-x-6">
          {/* Search Component */}
          <MovieSearch />

          {/* Purchase Plan Button */}
          <Link to="/pricing">
            <button className="px-6 py-2 bg-netflix-red text-white rounded-md font-bold">
              Purchase Plan
            </button>
          </Link>

          {/* Profile Dropdown */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center focus:outline-none"
              >
                <img
                  src={user?.profilePic || profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-netflix-red"
                />
                <span className="ml-2 text-white">{user?.name || "User"}</span>
                <FiChevronDown className="ml-1 text-white" />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-black border border-gray-700 rounded-md shadow-lg z-10">
                  <Link to="/profile" className="block px-4 py-2 text-white hover:bg-gray-800">
                    Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-white hover:bg-gray-800">
                    Settings
                  </Link>
                  {user?.role === "admin" && (
                    <Link to="/admin" className="block px-4 py-2 text-white hover:bg-gray-800">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="px-6 py-2 bg-netflix-red text-white rounded-md font-bold">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieNavbar;
