import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Import Autoplay module
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

const Banner = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("userToken"));

    // Fetch trending movies from your backend
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get("https://youmovie-o9a9-106hx9a2o-moizmirza1s-projects.vercel.app//api/tmdb/trending/movies"); // Adjust your API URL if needed
        
        setTrendingMovies(response.data.results.slice(10, 20));
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };

    fetchTrendingMovies();
  }, []);

  const openModal = () => {
    if (isLoggedIn) {
      navigate(`/movies/video/${trendingMovies[activeSlide]?.id}`);
    } else {
      setModalOpen(true);
    }
  };
  

  const closeModal = () => setModalOpen(false);
  const handleLoginRedirect = () => navigate("/login");


  

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Slider */}
      {trendingMovies.length > 0 && (
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }} // Autoplay enabled
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          modules={[Autoplay]} // Add autoplay module
          className="absolute inset-0 z-0"
        >
          {trendingMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div
                className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: movie.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                    : "url('/fallback-image.jpg')",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

      {/* Main Content */}
      <div className="absolute top-0 left-0 z-20 w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 text-center">
        <h1 className="text-white text-7xl sm:text-4xl font-medium tracking-wide font-bebas">
          Next Generation of OTT Platform
        </h1>
        <hr className="mt-2 mb-6 h-0.5 w-24 mx-auto bg-gradient-to-r from-gray-700 via-red-600 to-gray-700" />
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold leading-tight text-gray-200 font-bebas">
          YouMovies First Streaming <br />
          <span className="text-red-600">OTT</span> Platform
        </h1>
        <p className="mt-6 max-w-3xl text-sm sm:text-base md:text-lg text-gray-100">
          Experience the best movie streaming with high-quality content, seamless navigation, and a vast collection of films.
        </p>

        <button
          onClick={openModal}
          className="mt-8 px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition duration-300"
        >
          Watch Now
        </button>
      </div>

      {/* Movie Info */}
      {trendingMovies.length > 0 && (
        <div className="absolute left-4 sm:left-8 bottom-16 sm:bottom-40 p-4 bg-black/60 rounded-md max-w-xs z-20 hidden sm:block">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            {trendingMovies[activeSlide]?.title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white mb-1">
            <span className="font-semibold">Rating:</span> {trendingMovies[activeSlide]?.vote_average}/10
          </p>
          <p className="text-xs sm:text-sm md:text-base text-white mb-1">
            <span className="font-semibold">Release Date:</span> {trendingMovies[activeSlide]?.release_date}
          </p>
          <p className="text-xs sm:text-sm md:text-base text-white">
            <span className="font-semibold">Overview:</span> {trendingMovies[activeSlide]?.overview.slice(0, 100)}...
          </p>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 backdrop-blur-md bg-black bg-opacity-50"></div>
          <div
            className="relative bg-cover bg-center rounded-sm p-10 text-center w-11/12 sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-5/12 transform transition-all duration-500 ease-in-out scale-100 opacity-100 border border-white"
            style={{
              backgroundImage: trendingMovies[activeSlide]?.backdrop_path
                ? `url(https://image.tmdb.org/t/p/original${trendingMovies[activeSlide]?.backdrop_path})`
                : "url('/fallback-image.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative p-8 text-white">
              <AiOutlineClose
                className="absolute top-4 right-4 text-3xl cursor-pointer hover:text-gray-300"
                onClick={closeModal}
                aria-label="Close Modal"
              />
              <h2 className="text-4xl font-semibold mb-6">Log in to Watch Now</h2>
              <p className="mb-6 text-lg">Please log in to access full content.</p>
              <button
                onClick={handleLoginRedirect}
                className="px-8 py-3 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition duration-300"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
