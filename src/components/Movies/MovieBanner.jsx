import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";



const MovieBanner = () => {
  const [movies, setMovies] = useState([]); // Store fetched movies
  const [currentMovie, setCurrentMovie] = useState(null);
  const [fade, setFade] = useState(false);
  const swiperRef = useRef(null);


  
const navigate = useNavigate();

  // Fetch trending movies from the backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://youmovie-production.up.railway.app/api/tmdb/trending/movies"); // Adjust API endpoint
        const data = await response.json();
        if (data.results) {
          setMovies(data.results);
          setCurrentMovie(data.results[0]); // Set first movie as default
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Function to update background and movie details
  const updateBanner = (index) => {
    setFade(true);
    setTimeout(() => {
      setCurrentMovie(movies[index]);
      setFade(false);
    }, 500); // Smooth transition
  };

  return (
    <div className="relative w-full h-[80vh] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Black Fade Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* Left Content (Movie Details) */}
      {currentMovie && (
        <div className="absolute left-20 top-1/2 transform -translate-y-1/2 text-white flex flex-col space-y-6 z-10">
          <h1 className="text-7xl font-medium leading-tight drop-shadow-lg font-bebas">
            {currentMovie.title}
          </h1>

          <p className="max-w-[550px] rounded-lg text-lg leading-relaxed">
            {currentMovie.overview.slice(0, 150)}...
          </p>

          <div className="flex items-center space-x-6 text-lg">
            <div className="flex items-center space-x-2">
              <FaStar className="text-yellow-400" />
              <span>{currentMovie.vote_average.toFixed(1)}/10</span>
            </div>
            <p>
              <span className="text-gray-400">Release Date:</span> {currentMovie.release_date}
            </p>
          </div>

          <button   onClick={() => navigate(`/movies/video/${currentMovie.id}`)}
            className="mt-10 flex items-center bg-netflix-red text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition duration-300 justify-center w-[180px]">
            <FaPlay className="mr-2 text-lg" /> Watch Trailer
          </button>
        </div>
      )}

      {/* Trending Posters Swiper */}
      <div className="absolute right-10 bottom-5 bg-black bg-opacity-80 p-6 rounded-lg w-[500px] flex flex-col items-center shadow-lg z-10">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          slidesPerView={2}
          spaceBetween={20}
          loop={movies.length > 2} 
          autoplay={{ delay: 4000, disableOnInteraction: false }} 
          navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
          className="w-full"
          onSlideChange={(swiper) => updateBanner(swiper.realIndex)}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <div className="w-52 h-[300px] mx-auto">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="flex space-x-4 mt-5">
          <button
            className="prev-btn bg-gray-800 hover:bg-netflix-red text-white px-4 py-2 rounded transition duration-300"
            onClick={() => swiperRef.current.swiper.slidePrev()}
          >
            <FaChevronLeft size={18} />
          </button>
          <button
            className="next-btn bg-gray-800 hover:bg-netflix-red text-white px-4 py-2 rounded transition duration-300"
            onClick={() => swiperRef.current.swiper.slideNext()}
          >
            <FaChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;
