import React, { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";

const GenreSeriesPage = () => {
  const { genreId } = useParams(); // Get genreId from the URL
  const [series, setSeries] = useState([]);
  const [genreName, setGenreName] = useState(""); // Store genre name

  useEffect(() => {
    const fetchSeriesAndGenreName = async () => {
      try {
        // Fetch series for the genre
        const seriesResponse = await axios.get(
          `https://youmovie-production.up.railway.app/api/tmdb/genre/${genreId}/similar`
        );
        setSeries(seriesResponse.data); // Set the series data

        // Fetch genre name (You can fetch the genre name from your database or TMDb API)
        const genreResponse = await axios.get(
          `https://youmovie-production.up.railway.app/api/tmdb/genres/series`
        );
        const genre = genreResponse.data.find((g) => g.id === parseInt(genreId));
        setGenreName(genre ? genre.name : "Unknown Genre"); // Set the genre name
      } catch (error) {
        console.error("Error fetching series or genre:", error);
      }
    };

    fetchSeriesAndGenreName();
  }, [genreId]);

  return (
    <div className="bg-black py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-white text-3xl md:text-5xl font-semibold mb-6 text-center">
          Series for Genre: {genreName}
        </h1>
        {/* Render the series for the genre */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {series.map((serie) => (

<Link key={serie.id} to={`/series/watch/${serie.id}`} className="block">
<div className="bg-gray-800 text-white p-4 rounded-lg hover:scale-105 transition duration-300">
  <img
    src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
    alt={serie.name}
    className="w-full h-64 object-cover rounded-md"
  />
  <h3 className="text-center mt-3">{serie.name}</h3>
</div>
</Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreSeriesPage;
