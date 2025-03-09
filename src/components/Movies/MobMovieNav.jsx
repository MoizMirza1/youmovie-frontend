import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import profilePic from "../../Assets/Images/HomepageImages/defaultProfile.jpeg";
import { AuthContext } from "../../context/AuthContext";

const MobMovieNav = () => {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  // Close menu, profile dropdown, and search on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-black bg-opacity-90">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Menu Icon */}
        <FiMenu
          className="text-white text-3xl cursor-pointer"
          onClick={() => setMenuOpen(true)}
        />

        {/* Search Icon */}
        <div className="relative" ref={searchRef}>
          <FiSearch
            className="text-white text-2xl cursor-pointer"
            onClick={() => setSearchOpen(!searchOpen)}
          />
          {searchOpen && (
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 bg-gray-900 rounded-md p-2 shadow-lg">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full p-2 bg-transparent text-white border border-gray-600 rounded-md outline-none"
              />
            </div>
          )}
        </div>

        {/* Profile Icon / Login Button */}
        {user ? (
          <div className="relative" ref={profileRef}>
            <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
              <img
                src={user?.profilePic || profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-red-600"
              />
            </button>
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-black border border-gray-700 rounded-md shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                >
                  Settings
                </Link>
                <Link
                  to="/purchase-plan"
                  className="block px-4 py-2 text-white hover:bg-gray-800"
                >
                  Purchase Plan
                </Link>
                <button className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="px-4 py-2 bg-red-600 text-white rounded-md font-bold">
              Login
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
          <FiX
            className="absolute top-6 right-6 text-white text-3xl cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
          <nav ref={menuRef} className="flex flex-col space-y-6 text-white text-2xl">
            <Link to="/" className="hover:text-red-500" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/movies" className="hover:text-red-500" onClick={() => setMenuOpen(false)}>
              Movies
            </Link>
            <Link to="/pricing" className="hover:text-red-500" onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>
            <Link to="/about" className="hover:text-red-500" onClick={() => setMenuOpen(false)}>
              About
            </Link>
           
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobMovieNav;
