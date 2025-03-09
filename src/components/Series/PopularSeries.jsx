import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PopularSeries = () => {
  const [series, setSeries] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchPopularSeries = async () => {
      try {
        const response = await axios.get("https://youmovie-production.up.railway.app/api/tmdb/netflix/originals");
        setSeries(response.data.results || []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching popular series:", error);
        setSeries([]); // Fallback to an empty array
      }
    };

    fetchPopularSeries();
  }, []);

  return (
    <div className="w-full bg-black py-8 md:py-10">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-10 relative">
        {/* Heading */}
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          Popular Series to Watch
        </h1>

        {/* Custom Navigation Arrows */}
        <button
          className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 p-2 border-2 border-white rounded-full 
                     transition-all duration-300 hover:border-[#E50914] hover:text-[#E50914] hidden md:block"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <FaChevronLeft size={20} className="text-white" />
        </button>

        <button
          className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 p-2 border-2 border-white rounded-full 
                     transition-all duration-300 hover:border-[#E50914] hover:text-[#E50914] hidden md:block"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <FaChevronRight size={20} className="text-white" />
        </button>

        {/* Swiper for Top 10 Series */}
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          spaceBetween={15}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 3, spaceBetween: 15 },
            768: { slidesPerView: 4, spaceBetween: 15 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
            1280: { slidesPerView: 6, spaceBetween: 25 },
          }}
          className="pb-8"
        >
          {series.slice(0, 10).map((show, index) => (
            <SwiperSlide key={show.id}>
              <Link to={`/series/watch/${show.id}`} className="block">
                <div className="relative bg-gray-900 rounded-lg shadow-md transition-transform transform hover:scale-105">
                  {/* Series Poster */}
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    className="w-full h-72 md:h-80 object-cover rounded-lg"
                  />

                  {/* Number (Responsive positioning) */}
                  <span className="absolute -bottom-6 md:-bottom-10 right-2 md:right-4 text-6xl md:text-8xl 
                                   font-extrabold text-white opacity-80 drop-shadow-lg ">
                    {index + 1}
                  </span>

                  {/* Series Details */}
                  <div className="p-3 md:p-4">
                    <h2 className="text-white font-semibold text-base md:text-lg">{show.name}</h2>
                    <p className="text-gray-400 text-xs md:text-sm mt-1">{show.first_air_date}</p>
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

export default PopularSeries;
