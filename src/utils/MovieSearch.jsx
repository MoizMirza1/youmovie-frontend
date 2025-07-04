import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiSearch } from "react-icons/fi";

const MovieSearch = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  let cancelToken = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setLoading(true);
      setError(null);
      if (cancelToken.current) {
        cancelToken.current.cancel("Operation canceled due to new request");
      }
      cancelToken.current = axios.CancelToken.source();

      try {
        const response = await axios.get("https://youmovie-o9a9.vercel.app/api/tmdb/search", {
          params: { query },
          cancelToken: cancelToken.current.token,
        });
        setSearchResults(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError("Error fetching search results");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      const selectedMovie = searchResults[selectedIndex];
      window.location.href = `/movies/video/watch/${selectedMovie.id}`;
    }
  };

  return (
    <div className="relative flex items-center" ref={searchRef}>
      <FiSearch
        className="text-white text-2xl cursor-pointer hover:text-netflix-red transition"
        onClick={() => setSearchOpen(true)}
      />
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
          onKeyDown={handleKeyDown}
        />

        {loading && <p className="text-white text-sm">Loading...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-gray-900 rounded-md shadow-lg mt-2 max-h-72 overflow-y-auto">
            {searchResults.map((movie, index) => (
              <Link
                key={movie.id}
                to={`/movies/video/watch/${movie.id}`}
                className={`flex items-center px-4 py-3 text-white hover:bg-gray-700 transition space-x-4 ${
                  index === selectedIndex ? "bg-gray-700" : ""
                }`}
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                  setSearchResults([]);
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  className="w-12 h-16 rounded-md object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{movie.title}</p>
                </div>
                <button className="bg-netflix-red text-white px-3 py-1 rounded-md flex-shrink-0">
                  ▶
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;