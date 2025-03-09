import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const UpcomingSeries = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);
  const placeholderImage = "https://via.placeholder.com/500x750?text=No+Image";

  useEffect(() => {
    const fetchUpcomingSeries = async () => {
      try {
        const response = await axios.get(
          "https://youmovie-production.up.railway.app/api/tmdb/series/upcoming/netflix/?page=2" 
        );
        setSeries(response.data.results || []);
      } catch (error) {
        console.error("Error fetching upcoming series:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingSeries();
  }, []);

  return (
    <div className="w-full bg-black py-10">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-10 relative">
        {/* Heading */}
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          TV Series
        </h1>

        {/* Navigation Buttons */}
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-2 z-10">
          <button
            className="p-2 bg-black/50 border-2 border-white rounded-full transition-all duration-300 hover:border-[#E50914] hover:text-[#E50914]"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FaChevronLeft size={18} className="text-white" />
          </button>

          <button
            className="p-2 bg-black/50 border-2 border-white rounded-full transition-all duration-300 hover:border-[#E50914] hover:text-[#E50914]"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FaChevronRight size={18} className="text-white" />
          </button>
        </div>

        {/* Swiper for Upcoming Series */}
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          spaceBetween={10}
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
          {loading ? (
  [...Array(10)].map((_, index) => (
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
) : series.length === 0 ? (
  <div className="text-white text-center text-xl py-10">
    No Upcoming Series
  </div>
) : (
  series.slice(0, 10).map((show) => (
    <SwiperSlide key={show.id}>
      <div className="relative bg-gray-900 rounded-lg shadow-md">
        <img
          src={
            show.poster_path
              ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
              : placeholderImage
          }
          alt={show.name}
          className="w-full h-64 md:h-80 object-cover rounded-lg"
        />
        <div className="p-3">
          <h2 className="text-white font-semibold text-sm md:text-lg">
            {show.name}
          </h2>
          <p className="text-gray-400 text-xs md:text-sm mt-1">
            {show.first_air_date}
          </p>
        </div>
      </div>
    </SwiperSlide>
  ))
)}

        </Swiper>
      </div>
    </div>
  );
};

export default UpcomingSeries;
