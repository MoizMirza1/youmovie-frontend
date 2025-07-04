import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const MarvelSection = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMarvelMovies = async () => {
      try {
        const response = await axios.get("https://youmovie-o9a9.vercel.app/api/tmdb/marvel/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching Marvel movies:", error);
      }
    };

    fetchMarvelMovies();
  }, []);

  return (
    <div className="w-full bg-black py-10 px-6">
      <h2 className="text-3xl font-bold text-white mb-6 text-left">Marvel Universe</h2>

      {/* Horizontal Swiper */}
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Autoplay]}
        className="w-full"
      >
        {Array.from({ length: Math.ceil(movies.length / 4) }, (_, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-4 gap-4">
              {movies.slice(index * 4, index * 4 + 4).map((movie) => (
                <div key={movie.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : "/default-backdrop.jpg"}
                    alt={movie.title}
                    className="w-full h-[200px] object-cover"
                  />
                  <h3 className="text-white text-sm font-semibold p-2 text-center">{movie.title}</h3>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MarvelSection;
