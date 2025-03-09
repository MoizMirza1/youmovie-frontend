import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Autoplay } from "swiper/modules";
import { FreeMode } from "swiper/modules";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook

const GenreSeries = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch TV series genres from the API
    const fetchGenres = async () => {
      try {
        const response = await axios.get("https://youmovie-production.up.railway.app/api/tmdb/genres/series"); // Your endpoint for fetching genres
        setGenres(response.data); // Set the genres data
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // Handle genre click and navigate to the genre's series page
  const handleGenreClick = (genreId) => {
    navigate(`/series/genre/${genreId}`); // Navigate to the page with the genre's id
  };

  return (
    <div className="bg-black py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-white text-3xl md:text-5xl font-semibold mb-6 text-center">
          Browse Series by Genre
        </h1>

        {/* Genre Carousel with Swiper */}
        <Swiper
          slidesPerView={3} // Default to showing 3 slides on large screens
          spaceBetween={10}
          freeMode={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true, // Stops autoplay on interaction
            pauseOnMouseEnter: true, // Stops when user hovers over the swiper
          }}
          modules={[FreeMode, Autoplay]}
          breakpoints={{
            640: { // For small screens, show 2 slides
              slidesPerView: 2,
            },
            480: { // For extra small screens, show 1 slide
              slidesPerView: 4,
            },
            1024: { // For larger screens, show 3 slides
              slidesPerView: 10,
            },
          }}
          className="mt-6"
        >
          {genres.map((genre) => (
            <SwiperSlide
              key={genre.id}
              className="bg-gray-800 text-white px-6 py-3 rounded-lg text-center font-semibold cursor-pointer hover:bg-[#E50914] transition duration-300 ease-in-out flex justify-center items-center h-[120px] sm:h-[150px] lg:h-[180px] overflow-hidden"
              onClick={() => handleGenreClick(genre.id)} // Trigger navigation on click
            >
              <p className="text-sm sm:text-base md:text-lg lg:text-xl truncate">{genre.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GenreSeries;
