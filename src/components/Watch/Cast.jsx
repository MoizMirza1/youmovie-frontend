import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaHeart, FaPlus } from "react-icons/fa";

const CastAndCrew = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [credits, setCredits] = useState({ cast: [], crew: [] });

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(`https://youmovie-o9a9.vercel.app/api/tmdb/movie/${movieId}`);
        setMovieDetails(res.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchCredits = async () => {
      try {
        const res = await axios.get(`https://youmovie-o9a9.vercel.app/api/tmdb/movie/${movieId}/credits`);
        setCredits(res.data);
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    };

    fetchMovieDetails();
    fetchCredits();
  }, [movieId]);

  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-16 py-10">
      {/* Main Movie Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Side - Poster & Icons */}
        <div className="relative">
          <img
            src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : "/default-poster.png"}
            alt={movieDetails.title}
            className="w-full max-w-md h-auto rounded-lg shadow-lg"
          />

          {/* Wishlist & Playlist Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-4">
            <button className="p-3 bg-red-600 rounded-full hover:bg-red-700 transition">
              <FaHeart className="text-white text-xl" />
            </button>
            <button className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition">
              <FaPlus className="text-white text-xl" />
            </button>
          </div>
        </div>

        {/* Right Side - Storyline */}
        <div className="md:col-span-2">
          <h2 className="text-4xl font-extrabold text-red-600 mb-4 tracking-wide">
            Storyline
          </h2>
          <hr className="border-red-500 w-20 mb-4" />
          <p className="text-gray-300 text-lg leading-relaxed tracking-wide md:text-xl">
            {movieDetails.overview || "No storyline available."}
          </p>

          {/* Cast & Crew Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* Cast Section */}
            <div>
              <h3 className="text-3xl font-bold text-red-600 mb-6">Cast</h3>
              <div className="space-y-6">
                {(credits.cast || []).slice(0, 5).map((actor) => (
                  <div key={actor.id} className="flex items-center gap-4">
                    <img
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "/default-profile.png"}
                      alt={actor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold">{actor.name}</p>
                      <p className="text-sm text-gray-400">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crew Section */}
            <div>
              <h3 className="text-3xl font-bold text-red-600 mb-6">Crew</h3>
              <div className="space-y-6">
                {(credits.crew || []).slice(0, 5).map((crewMember) => (
                  <div key={crewMember.id} className="flex items-center gap-4">
                    <img
                      src={crewMember.profile_path ? `https://image.tmdb.org/t/p/w185${crewMember.profile_path}` : "/default-profile.png"}
                      alt={crewMember.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold">{crewMember.name}</p>
                      <p className="text-sm text-gray-400">{crewMember.job}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastAndCrew;
