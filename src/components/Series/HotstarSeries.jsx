import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HotstarFeaturedMoviesAndSeries = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const placeholderImage = "https://via.placeholder.com/500x750?text=No+Image";

  useEffect(() => {
    const fetchHotstarMoviesAndSeries = async () => {
      try {
        const response = await axios.get(
          "https://youmovie-o9a9.vercel.app/api/tmdb/hotstar/featured"
        );
        setMovies(response.data.movies || []);
        setSeries(response.data.series || []);
      } catch (error) {
        console.error("Error fetching Hotstar movies and series:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotstarMoviesAndSeries();
  }, []);

  return (
    <div className="w-full bg-black py-10">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-10 relative">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          Hotstar Featured Movies and Series
        </h1>

        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && movies.length === 0 && series.length === 0 && (
          <div className="text-white text-center mb-4">
            <p>No movies or series available at the moment. Please check back later.</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-2 z-10">
          <button
            ref={prevRef}
            className="p-2 bg-black/50 border-2 border-white rounded-full transition-all duration-300 hover:border-[#E50914] hover:text-[#E50914]"
          >
            <FaChevronLeft size={18} className="text-white" />
          </button>

          <button
            ref={nextRef}
            className="p-2 bg-black/50 border-2 border-white rounded-full transition-all duration-300 hover:border-[#E50914] hover:text-[#E50914]"
          >
            <FaChevronRight size={18} className="text-white" />
          </button>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={10}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 25 },
            1536: { slidesPerView: 6, spaceBetween: 30 },
          }}
          className="pb-10"
        >
          {loading
            ? [...Array(10)].map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="relative bg-gray-900 rounded-lg shadow-md p-4">
                    <Skeleton height={320} width="100%" className="rounded-lg" />
                    <div className="mt-4">
                      <Skeleton height={20} width="80%" />
                      <Skeleton height={15} width="50%" className="mt-2" />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : [...movies, ...series].map((item) => (
                <SwiperSlide key={item.id}>
                  <Link to={`/series/watch/${item.id}`} className="block">
                    <div className="relative bg-gray-900 rounded-lg shadow-md">
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : placeholderImage
                        }
                        alt={item.name || item.title}
                        className="w-full h-64 md:h-80 object-cover rounded-lg"
                      />
                      <div className="p-3">
                        <h2 className="text-white font-semibold text-sm md:text-lg">
                          {item.name || item.title}
                        </h2>
                        <p className="text-gray-400 text-xs md:text-sm mt-1">
                          {item.first_air_date || item.release_date || "Unknown Date"}
                        </p>
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

export default HotstarFeaturedMoviesAndSeries;
