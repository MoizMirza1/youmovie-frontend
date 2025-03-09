import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import logo from "../../Assets/Images/logo-without-text.png";
import profilePic from "../../Assets/Images/HomepageImages/defaultProfile.jpeg";
import { AuthContext } from "../../context/AuthContext";

const MovieNavbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const searchRef = useRef(null);
  const profileRef = useRef(null);
  let cancelToken = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSearchResults([]);
      }
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

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.length > 2) {
      if (cancelToken.current) {
        cancelToken.current.cancel("Operation canceled due to new request");
      }

      cancelToken.current = axios.CancelToken.source();

      try {
        const response = await axios.get("https://youmovie-production.up.railway.app/api/tmdb/search", {
          params: { query },
          cancelToken: cancelToken.current.token,
        });

        setSearchResults(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching search results:", error);
        }
      }
    } else {
      setSearchResults([]);
    }
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
          {/* Search Bar */}
          <div className="relative flex items-center" ref={searchRef}>
            <FiSearch
              className="text-white text-2xl cursor-pointer hover:text-netflix-red transition"
              onClick={() => setSearchOpen(true)}
            />

            {/* Expanding Search Input */}
            <div
              className={`absolute right-0 flex flex-col bg-gray-800 border border-gray-600 rounded-md transition-all duration-500 ${
                searchOpen ? "w-80 opacity-100 px-4 py-2" : "w-0 opacity-0"
              }`}
            >
              <input
                type="text"
                placeholder="Search movies..."
                className="bg-transparent text-white w-full outline-none"
                autoFocus
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-gray-900 rounded-md shadow-lg mt-2 max-h-72 overflow-y-auto">
                  {searchResults.map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/movie/${movie.id}`}
                      className="flex items-center px-4 py-3 text-white hover:bg-gray-700 transition space-x-4"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                    >
                      {/* Movie Poster */}
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-12 h-16 rounded-md object-cover"
                      />

                      {/* Movie Title */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{movie.title}</p>
                      </div>

                      {/* Play Button */}
                      <button className="bg-netflix-red text-white px-3 py-1 rounded-md flex-shrink-0">
                        ▶
                      </button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

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
