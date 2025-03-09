// MobNav.js
import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import logo from "../../Assets/Images/logo-without-text.png";
import profilePic from "../../Assets/Images/HomepageImages/NewsletterImage.jpg";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const MobNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);

  // Close profile dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.post(
        "https://youmovie-production.up.railway.app/api/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("userToken");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="bg-black text-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <img className="w-10 h-10" src={logo} alt="Logo" />
          <h2 className="ml-2 text-xl font-bold">YouMovies</h2>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col space-y-2 p-4 border-t border-gray-700">
          <Link to="/" className="hover:text-netflix-red" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/series" className="hover:text-netflix-red" onClick={() => setMenuOpen(false)}>
            Series
          </Link>
          <Link to="/movies" className="hover:text-netflix-red" onClick={() => setMenuOpen(false)}>
            Movies
          </Link>
          <Link to="/more" className="hover:text-netflix-red" onClick={() => setMenuOpen(false)}>
            More
          </Link>

          {/* User profile section */}
          {user ? (
            <div className="mt-4 border-t border-gray-700 pt-4">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none w-full"
              >
                <img
                  className="w-8 h-8 rounded-full border-2 border-netflix-red"
                  src={user?.profilePic || profilePic}
                  alt="Profile"
                />
                <span>{user?.name}</span>
                <FiChevronDown />
              </button>
              {profileDropdownOpen && (
                <div
                  ref={profileDropdownRef}
                  className="mt-2 flex flex-col space-y-2 pl-10"
                >
                  <Link
                    to="/profile"
                    className="hover:text-netflix-red"
                    onClick={() => {
                      setMenuOpen(false);
                      setProfileDropdownOpen(false);
                    }}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="hover:text-netflix-red"
                    onClick={() => {
                      setMenuOpen(false);
                      setProfileDropdownOpen(false);
                    }}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="text-left hover:text-netflix-red"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="mt-4 px-4 py-2 bg-netflix-red text-white rounded">
                Login
              </button>
            </Link>
          )}
        </nav>
      )}
    </div>
  );
};

export default MobNav;
