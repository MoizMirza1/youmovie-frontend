import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import logo from "../../Assets/Images/logo-without-text.png";
// Placeholder profile image (replace with user's profile picture if available)
import profilePic from "../../Assets/Images/HomepageImages/defaultProfile.jpeg";
import { AuthContext } from "../../context/AuthContext"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const { user ,setUser } = useContext(AuthContext);
  
    const navigate = useNavigate();

  const [seriesDropdownOpen, setSeriesDropdownOpen] = useState(false);
  const [moviesDropdownOpen, setMoviesDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const seriesDropdownRef = useRef(null);
  const moviesDropdownRef = useRef(null);
  const moreDropdownOpenRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        seriesDropdownRef.current &&
        !seriesDropdownRef.current.contains(event.target)
      ) {
        setSeriesDropdownOpen(false);
      }
      if (
        moviesDropdownRef.current &&
        !moviesDropdownRef.current.contains(event.target)
      ) {
        setMoviesDropdownOpen(false);
      }
      if (
        moreDropdownOpenRef.current &&
        !moreDropdownOpenRef.current.contains(event.target)
      ) {
        setMoreDropdownOpen(false);
      }
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
      await axios.post("https://youmovie-o9a9.vercel.app/api/auth/logout", {}, { headers: { Authorization: `Bearer ${token}` } });

      localStorage.removeItem("userToken");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="relative flex h-20 w-full items-center bg-black z-50">
      <div className="mx-auto flex max-w-6xl w-full items-center justify-between px-4">
       {/* Logo and Brand */}
<Link to="/" className="flex items-center space-x-3">
  <img className="w-20 h-20 mt-4" src={logo} alt="Logo" />
  <h2 className="text-white text-2xl font-bold mt-2">YouMovies</h2>
</Link>

        {/* Navigation and Profile/Login */}
        <div className="flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {/* Home */}
            <Link
              to="/"
              className="text-netflix-red hover:text-netflix-red underline-fill mr-2"
            >
              Home
            </Link>
            {/* Series with dropdown */}
            <div className="relative flex items-center space-x-2" ref={seriesDropdownRef}>
  {/* Navigate to Series Page */}
  <button
    onClick={() => navigate("/series")}
    className="text-white hover:text-netflix-red focus:outline-none underline-fill"
  >
    Series
  </button>

  {/* Toggle Dropdown */}
  <button
    onClick={() => setSeriesDropdownOpen(!seriesDropdownOpen)}
    className="flex items-center text-white hover:text-netflix-red focus:outline-none"
  >
    <FiChevronDown />
  </button>

  {/* Dropdown Menu */}
  {seriesDropdownOpen && (
    <div className="absolute left-0 mt-2 w-40 bg-black border border-gray-700 rounded-md shadow-lg z-10">
      <Link to="/series/action" className="block px-4 py-2 text-white hover:bg-gray-800">
        Action
      </Link>
      <Link to="/series/comedy" className="block px-4 py-2 text-white hover:bg-gray-800">
        Comedy
      </Link>
      <Link to="/series/drama" className="block px-4 py-2 text-white hover:bg-gray-800">
        Drama
      </Link>
    </div>
  )}
</div>


            {/* Movies with dropdown */}
            <div className="relative flex items-center space-x-2" ref={moviesDropdownRef}>
  {/* Movies Navigation Button */}
  <button
    onClick={() => navigate("/movies")}
    className="text-white hover:text-netflix-red focus:outline-none underline-fill"
  >
    Movies
  </button>

  {/* Dropdown Toggle (Arrow) */}
  <button
    onClick={() => setMoviesDropdownOpen(!moviesDropdownOpen)}
    className="text-white hover:text-netflix-red focus:outline-none"
  >
    <FiChevronDown />
  </button>

  {/* Dropdown Menu */}
  {moviesDropdownOpen && (
    <div className="absolute left-0 top-full mt-1 w-44 bg-black border border-gray-700 rounded-md shadow-lg z-10">
      <Link
        to="/genre/28"
        className="block px-4 py-2 text-white hover:bg-gray-800 underline-fill"
      >
        Action
      </Link>
      <Link
        to="genre/35"
        className="block px-4 py-2 text-white hover:bg-gray-800 underline-fill"
      >
        Comedy
      </Link>
      <Link
        to="genre/18"
        className="block px-4 py-2 text-white hover:bg-gray-800 underline-fill"
      >
        Drama
      </Link>
    </div>
  )}
</div>

            {/* More with dropdown */}
            <div className="relative" ref={moreDropdownOpenRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="flex items-center text-white hover:text-netflix-red focus:outline-none underline-fill"
              >
                More <FiChevronDown className="ml-1" />
              </button>
              {moreDropdownOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-black border border-gray-700 rounded-md shadow-lg z-10">
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-white hover:bg-gray-800 underline-fill"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-4 py-2 text-white hover:bg-gray-800 underline-fill"
                  >
                    Contact
                  </Link>
                  <Link
                    to="/pricing"
                    className="block px-4 py-2 text-white hover:bg-gray-800 underline-fill"
                  >
                    Pricing
                  </Link>
                </div>
              )}
            </div>
          </nav>
          {/* Conditional Rendering for Profile or Login */}
          {user ? (
            // If logged in, show profile dropdown
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center focus:outline-none"
              >
                <img
                  src={user?.profilePic || profilePic} // Use user's profile pic or default
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-netflix-red object-cover"
                />
                <span className="ml-2 text-white">{user?.name || "User"}</span> {/* Display user name */}
                <FiChevronDown className="ml-1 text-white" />
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-black border border-gray-700 rounded-md shadow-lg z-10">
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
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-white hover:bg-gray-800"
                    >
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
            // Otherwise, show the Login button
            <Link to="/login">
              <button className="px-10 py-2 bg-netflix-red text-white rounded-md font-bold">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
