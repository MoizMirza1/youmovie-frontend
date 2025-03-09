import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { FaTrashAlt } from "react-icons/fa";
import Navbar from "../Home/ResponsiveNavbar";
import Footer from "../Home/Footer";

const Watchlist = () => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user) {
        toast.error("Please log in to view your watchlist.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://youmovie-production.up.railway.app/api/auth/see/watchlist/${user._id}`);
        setWatchlist(response.data.watchlist);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
        toast.error("Failed to load watchlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [user]);

  const removeFromWatchlist = async (movieId) => {
    try {
      await axios.delete(`https://youmovie-production.up.railway.app//api/auth/remove/watchlist/${user._id}/${movieId}`);
      setWatchlist((prev) => prev.filter((movie) => movie.id !== movieId));
      toast.success("Movie removed from watchlist.");
    } catch (error) {
      console.error("Error removing movie:", error);
      toast.error("Failed to remove movie.");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading watchlist...</p>;

  return (
    <>
    <title> Watchlist -YouMovies</title>
      <meta name="description" content="Explore the latest and most popular movies on YouMovies. Watch trailers, get recommendations, and enjoy unlimited streaming!" />
      <meta name="keywords" content="movies, streaming, latest movies, Hollywood, Bollywood, Marvel, action, drama" />
      <link rel="icon" href="/favicon.ico" />
      <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Your Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className="text-gray-400 text-center">No movies in your watchlist yet.</p>
        ) : (
          <div className="space-y-4">
            {watchlist.map((movie) => (
              <div key={movie.id} className="flex items-center bg-gray-800 rounded-lg shadow-md p-4">
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="w-20 h-28 rounded-md object-cover" />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm text-gray-400">{movie.release_date}</p>
                </div>
                <button 
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="text-red-500 hover:text-red-700 transition p-2"
                >
                  <FaTrashAlt size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
    </>
   
  );
};

export default Watchlist;
