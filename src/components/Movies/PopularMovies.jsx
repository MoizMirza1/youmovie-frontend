import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get("https://youmovie-o9a9.vercel.app/api/tmdb/movies/popular");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="w-full bg-black py-10">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-10 relative">
        {/* Heading */}
        <h1 className="text-white text-3xl font-bold mb-6">Popular Movies to Watch</h1>

        {/* Custom Navigation Arrows */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 border-2 border-white rounded-full transition-all duration-300 hover:border-[#E50914] hover:text-[#E50914]"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <FaChevronLeft size={18} className="text-white" />
        </button>

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 border-2 border-white rounded-full transition-all duration-300 hover:border-[#E50914] hover:text-[#E50914]"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <FaChevronRight size={18} className="text-white" />
        </button>

        {/* Swiper for Top 10 Movies */}
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 25 },
            1536: { slidesPerView: 6, spaceBetween: 30 },
          }}
          className="pb-10"
        >
          {movies.slice(0, 10).map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <Link to={`/movies/video/${movie.id}`} className="block">
                <div className="relative bg-gray-900 rounded-lg shadow-md transition-transform transform hover:scale-105">
                  {/* Movie Poster */}
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-80 object-cover rounded-lg"
                  />

                  {/* Number (Half Inside, Half Outside) */}
                  <span className="absolute -bottom-10 -right-6 text-9xl font-extrabold text-white opacity-90 drop-shadow-lg">
                    {index + 1}
                  </span>

                  {/* Movie Details */}
                  <div className="p-4">
                    <h2 className="text-white font-semibold text-lg">{movie.title}</h2>
                    <p className="text-gray-400 text-sm mt-1">{movie.release_date}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularMovies;
