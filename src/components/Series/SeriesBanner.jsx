import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const SeriesBanner = () => {
  const [series, setSeries] = useState([]);
  const [currentSeries, setCurrentSeries] = useState(null);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch("https://youmovie-o9a9.vercel.app/api/tmdb/series/selected");
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setSeries(data);
          setCurrentSeries(data[0]);
        }
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };

    fetchSeries();
  }, []);

  const updateBanner = (index) => {
    setCurrentSeries(series[index]);
  };

  return (
    <div className="relative w-full h-[80vh] flex items-center px-4 md:px-10">
      {/* Background Image */}
      {currentSeries && (
        <div
          className="absolute inset-0 transition-opacity duration-500 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${currentSeries.backdrop_path})`,
          }}
        ></div>
      )}
      <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-500" />

      {/* Swiper for Mobile Navigation */}
      <div className="absolute inset-0 z-10 md:hidden">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          loop={series.length > 1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".mobile-next-btn",
            prevEl: ".mobile-prev-btn",
          }}
          onSlideChange={(swiper) => updateBanner(swiper.realIndex)}
        >
          {series.map((show) => (
            <SwiperSlide key={show.id}>
              {/* Empty slide to control background image */}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile Navigation Buttons */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button
            className="mobile-prev-btn bg-gray-800 hover:bg-red-600 text-white px-3 py-2 rounded transition duration-300"
            onClick={() => swiperRef.current?.swiper?.slidePrev()}
          >
            <FaChevronLeft size={18} />
          </button>
          <button
            className="mobile-next-btn bg-gray-800 hover:bg-red-600 text-white px-3 py-2 rounded transition duration-300"
            onClick={() => swiperRef.current?.swiper?.slideNext()}
          >
            <FaChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Poster Cards for Desktop */}
      <div className="absolute left-4 bottom-5 bg-black bg-opacity-80 p-4 md:p-6 rounded-lg w-[90%] md:w-[500px] flex flex-col items-center shadow-lg z-10 hidden md:flex">
        <Swiper
           ref={swiperRef}
          modules={[Navigation, Autoplay]}
          direction="horizontal"
          slidesPerView={2}
          spaceBetween={20}
          loop={series.length > 2}
          autoplay={{ delay: 4000, disableOnInteraction: false }} // Autoplay enabled for desktop too
          navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
          className="w-full"
          onSlideChange={(swiper) => updateBanner(swiper.realIndex)}
          breakpoints={{
            768: { 
              autoplay: true, // Disable autoplay for tablet/desktop
              loop: false,     // Disable loop for tablet/desktop
            },
          }}
        >
          {series.map((show) => (
            <SwiperSlide key={show.id}>
              <div className="w-40 md:w-52 h-[250px] md:h-[300px] mx-auto">
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex space-x-4 mt-4">
          <button
            className="prev-btn bg-gray-800 hover:bg-red-600 text-white px-3 py-2 rounded transition duration-300"
            onClick={() => swiperRef.current?.swiper?.slidePrev()}
          >
            <FaChevronLeft size={18} />
          </button>
          <button
            className="next-btn bg-gray-800 hover:bg-red-600 text-white px-3 py-2 rounded transition duration-300"
            onClick={() => swiperRef.current?.swiper?.slideNext()}
          >
            <FaChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Series Details */}
      {currentSeries && (
        <div className="absolute right-4 md:right-20 top-1/2 transform -translate-y-1/2 text-white flex flex-col space-y-4 md:space-y-6 z-10 text-right w-full md:w-auto px-4 md:px-0">
          <h1 className="text-5xl md:text-7xl font-medium leading-tight drop-shadow-lg font-bebas text-center md:text-right">
            {currentSeries.name}
          </h1>

          <p className="max-w-[90%] md:max-w-[550px] text-base md:text-lg text-right leading-relaxed text-center md:text-right">
            {currentSeries.overview?.slice(0, 150)}...
          </p>

          <div className="flex flex-col md:flex-row justify-end items-center space-y-2 md:space-y-0 md:space-x-6 text-base md:text-lg">
            <div className="flex items-center space-x-2">
              <FaStar className="text-yellow-400" />
              <span>{currentSeries.vote_average?.toFixed(1)}/10</span>
            </div>
            <p>
              <span className="text-gray-400">First Air Date:</span> {currentSeries.first_air_date}
            </p>
          </div>

          <button
            onClick={() => navigate(`/series/watch/${currentSeries.id}`)}
            className="mt-5 md:mt-10 flex items-center bg-red-600 text-white px-5 py-2 md:px-6 md:py-3 rounded-md text-base md:text-lg font-semibold hover:bg-red-700 transition duration-300 justify-center w-1/2 md:w-[180px] self-center md:self-end"
          >
            <FaPlay className="mr-2 text-lg" /> Watch Trailer
          </button>
        </div>
      )}
    </div>
  );
};

export default SeriesBanner;
