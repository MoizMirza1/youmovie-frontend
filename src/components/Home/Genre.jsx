import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Autoplay } from "swiper/modules"; 
import { FreeMode } from "swiper/modules";

const GenreMovies = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate(); // React Router navigation function

  useEffect(() => {
    // Fetch available genres from the API
    const fetchGenres = async () => {
      try {
        const response = await axios.get("https://youmovie-o9a9.vercel.app/api/tmdb/genres");
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // Function to handle genre click and navigate to specific genre page
  const handleGenreClick = (genreId) => {
    navigate(`/genre/${genreId}`);
  };

  return (
    <div className="bg-black py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-white text-3xl md:text-5xl font-semibold mb-6 text-center">
          Browse by Genre
        </h1>
        <hr className="my-2 w-32 mx-auto border-0 h-0.5 bg-gradient-to-r from-black via-red-600 to-black" />

        {/* Genre Carousel */}
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          freeMode={true}
          autoplay={{ 
            delay: 4000, 
            disableOnInteraction: true, // Stops autoplay on interaction
            pauseOnMouseEnter: true, // Stops when user hovers over the swiper
          }}
          modules={[FreeMode, Autoplay]}
          className="mt-6"
        >
          {genres.map((genre) => (
            <SwiperSlide
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)} // Click event to navigate
              className="bg-gray-800 text-white px-6 py-3 rounded-lg text-center text-lg font-semibold cursor-pointer hover:bg-red-600 transition duration-300 flex items-center justify-center"
              style={{ width: "auto" }}
            >
              <span className="text-xs sm:text-base md:text-lg">{genre.name}</span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GenreMovies;
