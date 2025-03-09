import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronUp, FaChevronDown, FaStar, FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";

const SeriesBannerTwo = () => {
  const [series, setSeries] = useState([]);
  const [currentSeries, setCurrentSeries] = useState(null);
  const [fade, setFade] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    // Fetch the top-rated Prime Video series from your backend API
    const fetchSeries = async () => {
      try {
        const response = await axios.get("https://youmovie-production.up.railway.app/api/tmdb/prime-video/top-rated");
        setSeries(response.data); // Set the series to state
        setCurrentSeries(response.data[0]); // Set the first series as the default
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };

    fetchSeries();
  }, []);

  const updateBanner = (index) => {
    setFade(true);
    setTimeout(() => {
      setCurrentSeries(series[index]);
      setFade(false);
    }, 500);
  };

  return (
    <div className="relative w-full h-screen flex flex-col lg:flex-row items-center px-6 lg:px-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${currentSeries?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Black Fade Overlay */}
      <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}></div>

      {/* Main Container: Slider + Series Details */}
      <div className="relative w-full flex flex-col lg:flex-row items-center z-10 space-y-6 lg:space-y-0">
        {/* Left: Series Slider */}
        <div className="relative w-full lg:w-[450px] h-[450px] md:h-[500px] lg:h-[600px] bg-black bg-opacity-80 p-4 rounded-lg flex flex-col items-center shadow-lg">
          {/* Top Circular Arrow Button */}
          <button
            className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gray-700 bg-opacity-50 hover:bg-netflix-red text-white p-2 rounded-full transition duration-300"
            onClick={() => swiperRef.current.swiper.slidePrev()}
          >
            <FaChevronUp size={18} />
          </button>

          {/* Series Thumbnail Swiper */}
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Autoplay]}
            direction="vertical"
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
            }}
            spaceBetween={10}
            loop={series.length > 3}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full h-full flex flex-col justify-center"
            onSlideChange={(swiper) => updateBanner(swiper.realIndex)}
          >
            {series.map((show, index) => (
              <SwiperSlide key={show.id} className="flex justify-center">
                <div className="w-[90%] h-[120px] md:h-[150px] lg:w-[400px]">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                    alt={show.name}
                    className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Bottom Circular Arrow Button */}
          <button
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-700 bg-opacity-50 hover:bg-netflix-red text-white p-2 rounded-full transition duration-300"
            onClick={() => swiperRef.current.swiper.slideNext()}
          >
            <FaChevronDown size={18} />
          </button>
        </div>

        {/* Right: Series Details */}
        {currentSeries && (
          <div className="ml-6 md:ml-12 lg:ml-24 text-white flex flex-col space-y-4 md:space-y-6 max-w-full lg:max-w-[550px] text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg font-bebas">
              {currentSeries.name}
            </h1>

            <p className="text-sm md:text-lg leading-relaxed bg-black bg-opacity-50 p-4 rounded-lg">
              {currentSeries.overview.slice(0, 150)}...
            </p>

            <div className="flex flex-col md:flex-row items-center md:justify-center lg:justify-start space-y-2 md:space-y-0 md:space-x-6 text-base md:text-lg">
              <div className="flex items-center space-x-2">
                <FaStar className="text-yellow-400" />
                <span>{currentSeries.vote_average.toFixed(1)}/10</span>
              </div>
              <p>
                <span className="text-gray-400">First Air Date:</span> {currentSeries.first_air_date}
              </p>
            </div>

            {/* Watch Trailer Button */}
            <Link
              to={`/series/watch/${currentSeries.id}`}
              className="mt-4 md:mt-6 flex items-center bg-netflix-red text-white px-6 py-3 rounded-md text-base md:text-lg font-semibold hover:bg-red-700 transition duration-300 justify-center w-[160px] md:w-[180px] mx-auto lg:mx-0"
            >
              <FaPlay className="mr-2 text-lg" /> Watch Trailer
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeriesBannerTwo;
