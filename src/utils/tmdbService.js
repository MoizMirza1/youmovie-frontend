import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/tmdb"; // Change in production

export const fetchMovies = async (type = "popular", page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies/${type}?page=${page}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
