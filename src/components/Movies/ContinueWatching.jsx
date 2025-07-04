import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ContinueWatching = () => {
  const [movies, setMovies] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchMixedMovies = async () => {
      try {
        const popular = await axios.get("https://youmovie-o9a9.vercel.app/api/tmdb/movies/popular");
        const trending = await axios.get("https://youmovie-o9a9.vercel.app/api/tmdb/trending/movies");
        const nowPlaying = await axios.get("https://youmovie-o9a9.vercel.app/api/tmdb/movies/now_playing");
  
        const popularMovies = popular.data.results || [];
        const trendingMovies = trending.data.results || [];
        const nowPlayingMovies = nowPlaying.data.results || [];
  
        const combinedMovies = [...popularMovies, ...trendingMovies, ...nowPlayingMovies];
  
        // ✅ Add a random progress value (0% to 100%)
        const moviesWithProgress = combinedMovies.map((movie) => ({
          ...movie,
          progress: `${Math.floor(Math.random() * 100)}%`, // Random progress
        }));
  
        const shuffledMovies = moviesWithProgress.sort(() => 0.5 - Math.random());
        setMovies(shuffledMovies.slice(0, 10));
      } catch (error) {
        console.error("Error fetching mixed movies:", error);
      }
    };
  
    fetchMixedMovies();
  }, []);
  

  return (
    <div className="w-full bg-black py-10">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-10 relative">
        {/* Heading */}
        <h1 className="text-white text-3xl font-bold mb-6">Continue Watching</h1>

        {/* Swiper with Custom Navigation */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".prev-btn",
            nextEl: ".next-btn",
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="pb-10"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="relative bg-gray-900 rounded-lg shadow-md">
                {/* Movie Thumbnail */}
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-40 object-cover"
                />

                {/* Red Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
                  <div
                    className="h-1 bg-[#E50914]"
                    style={{ width: movie.progress }}
                  ></div>
                </div>

                {/* Movie Title */}
                <div className="p-2">
                  <h2 className="text-white text-sm font-semibold">{movie.title}</h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          className="prev-btn absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 border-2 border-white rounded-full transition-all duration-300 hover:border-[#E50914] hover:text-[#E50914] hidden lg:block"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <FaChevronLeft size={20} className="text-white" />
        </button>

        <button
          className="next-btn absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 border-2 border-white rounded-full transition-all duration-300 hover:border-[#E50914] hover:text-[#E50914] hidden lg:block"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <FaChevronRight size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ContinueWatching;
