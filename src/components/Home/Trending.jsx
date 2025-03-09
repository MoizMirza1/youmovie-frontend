import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Trending = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get("https://youmovie-production.up.railway.app/api/tmdb/trending/movies");
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchTrendingMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-black py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-white text-3xl md:text-5xl font-semibold mb-6">Trending Now</h1>
        <hr className="my-2 w-32 border-0 h-0.5 bg-gradient-to-r from-black via-red-600 to-black" />

        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} className="px-2">
              <div className="rounded-lg bg-gray-800 shadow-lg overflow-hidden">
                <div className="relative group">
                  <img   src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  alt={movie.title} className="w-full h-60 object-cover rounded-t-lg" />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition duration-300"></div>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-white">{movie.title}</h2>
                  <div className="flex flex-wrap gap-2 my-2">
                    <span className="bg-gray-700 text-white px-3 py-1 rounded text-xs">Rating: {movie.vote_average}</span>
                    <span className="bg-gray-700 text-white px-3 py-1 rounded text-xs">Release: {movie.release_date}</span>
                  </div>
                  <Link
                    to={`/movies/video/${movie.id}`}
                    className="block bg-red-600 text-white text-center px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Watch Movie
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Trending;
