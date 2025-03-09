import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

const FeaturedSection = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const response = await axios.get("https://youmovie-production.up.railway.app/api/tmdb/featured/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      }
    };

    fetchFeaturedMovies();
  }, []);

  // Function to handle movie click
  const handleMovieClick = (movieId) => {
    navigate(`/movies/video/${movieId}`);
  };

  return (
    <div className="w-full bg-black py-10 px-6">
      <h2 className="text-3xl font-bold text-white mb-6 text-left">Featured Movies</h2>

      {/* Swiper with Navigation Controls */}
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation={true}
        modules={[Navigation]}
        className="w-full"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} onClick={() => handleMovieClick(movie.id)} className="cursor-pointer">
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
              {/* Movie Poster */}
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/default-poster.jpg"}
                alt={movie.title}
                className="w-full h-[250px] object-cover"
              />
              {/* Movie Title */}
              <h3 className="text-white text-sm font-semibold p-2 text-center">{movie.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedSection;
