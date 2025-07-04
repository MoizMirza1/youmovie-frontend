import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SimilarMovie = () => {
  const { movieId } = useParams();
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const res = await axios.get(`https://youmovie-o9a9.vercel.app/api/tmdb/movie/${movieId}/similar`);
        setSimilarMovies(res.data.slice(0, 6)); // Display 6 movies
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };

    fetchSimilarMovies();
  }, [movieId]);

  return (
    <div className="bg-black text-white px-6 md:px-16 py-10">
      <h2 className="text-3xl font-bold text-red-600 mb-6">Similar Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {similarMovies.length > 0 ? (
          similarMovies.map((movie) => (
            <div key={movie.id} className="bg-gray-900 p-4 rounded-lg shadow-lg">
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/default-poster.png"}
                alt={movie.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No similar movies found.</p>
        )}
      </div>
    </div>
  );
};

export default SimilarMovie;
