import React, { useEffect, useState } from "react";
import { useParams , Link } from "react-router-dom";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import Navbar from "../../components/Home/ResponsiveNavbar";
import Footer from "../../components/Home/Footer";
import loadingAnimation from "../../Assets/animations/loading.json";

const GenrePage = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const moviesResponse = await axios.get(`https://youmovie-production.up.railway.app/api/tmdb/genre/${id}/movies`);
        const genresResponse = await axios.get("https://youmovie-production.up.railway.app/api/tmdb/genres");

        setMovies(moviesResponse.data.results);

        const genre = genresResponse.data.genres.find((g) => g.id.toString() === id);
        setGenreName(genre ? genre.name : "Unknown Genre");
      } catch (error) {
        console.error("Error fetching movies or genre:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [id]);

  return (
    <div className="bg-black min-h-screen text-white">
       <title>Genre  - YouMovies</title>
      <meta name="description" content="Explore YouMovies subscription plans and enjoy unlimited access to thousands of movies with our flexible pricing options." />
     
      <Navbar />

      <div className="max-w-7xl mx-auto pt-20 px-4">
        <h1 className="text-4xl font-bold text-center">{genreName} Movies</h1>
        <hr className="my-3 w-40 mx-auto border-0 h-1 bg-gradient-to-r from-red-600 to-white" />

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Player autoplay loop src={loadingAnimation} style={{ height: "200px", width: "200px" }} />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
            {movies.map((movie) => (
              <Link to={`/movies/video/${movie.id}`} className="block">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg w-full h-80 object-cover"
              />
              <h2 className="mt-2 text-lg font-semibold text-center">{movie.title}</h2>
            </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default GenrePage;
