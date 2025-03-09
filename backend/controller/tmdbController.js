const { fetchFromTMDB } = require("../services/tmdbService");

// Get Trending Movies
const getTrendingMovies = async (req, res) => {
    try {
        const data = await fetchFromTMDB("trending/movie/week");
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch trending movies" });
    }
};

// Get Trending TV Shows
const getTrendingTVShows = async (req, res) => {
    try {
        const data = await fetchFromTMDB("trending/tv/week");
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch trending TV shows" });
    }
};

// Get Movie Details by ID
const getMovieDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`movie/${id}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie details" });
    }
};


const getPopularMovies = async (req, res) => {
    try {
        const data = await fetchFromTMDB("movie/popular");
        res.json(data.results); // Return full list, slicing will be done on the frontend
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch popular movies" });
    }
};

// Get All Movie by Genres
const getMovieGenres = async (req, res) => {
    try {
        const data = await fetchFromTMDB("genre/movie/list");
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie genres" });
    }
};

// Get movies by genre
const getMoviesByGenre = async (req, res) => {
    try {
        const { genreId } = req.params;
        const data = await fetchFromTMDB("discover/movie", { with_genres: genreId });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies by genre" });
    }
};

const getNowPlayingMovies = async (req, res) => {
    try {
        const data = await fetchFromTMDB("movie/now_playing");
        res.json(data.results); // Return full list, slicing will be done on the frontend
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch now playing movies" });
    }
};

const getUpcomingMovies = async (req, res) => {
    try {
        const page = req.query.page || 1; // Default to page 1 if not provided
        const data = await fetchFromTMDB("movie/upcoming", {
            region: "US",
            language: "en-US",
            page: page, // Fetch specific page
        });
        res.json(data); 
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch upcoming movies" });
    }
};
const getPopularActors = async (req, res) => {
    try {
        // Fetch page 1 and page 2
        const page1 = await fetchFromTMDB("person/popular", { page: 1 });
        const page2 = await fetchFromTMDB("person/popular", { page: 2 });

        // Combine results from both pages
        const actors = [...page1.results, ...page2.results]; 

        res.json(actors); // Send merged results (20 actors)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch popular actors" });
    }
};
const getMarvelMovies = async (req, res) => {
    try {
        const data = await fetchFromTMDB("discover/movie", { with_companies: 420, sort_by: "release_date.desc" });
        res.json(data.results); // Send only movie results
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Marvel movies" });
    }
};
const getFeaturedMovies = async (req, res) => {
    try {
        // Fetch movies from multiple contributors (excluding Marvel Studios)
        const contributors = [174, 2, 33, 34, 420]; // Warner Bros, Universal, Sony, Pixar, Paramount
        let featuredMovies = [];

        for (let company of contributors) {
            const data = await fetchFromTMDB("discover/movie", { with_companies: company, sort_by: "popularity.desc" });
            featuredMovies.push(...data.results);
        }

        res.json(featuredMovies.slice(0, 20)); // Limit to 20 movies
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch featured movies" });
    }
};

const searchMovies = async (req, res) => {
    try {
        const { query } = req.query; // Get search query from URL parameters

        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const data = await fetchFromTMDB("search/movie", { query });
        res.json(data.results); // Return search results
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch search results" });
    }
};

const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`movie/${id}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie details" });
    }
};

const getMovieTrailer = async (req, res) => {
    try {
        const { id } = req.params; // Get movie ID from URL parameters

        const data = await fetchFromTMDB(`movie/${id}/videos`);
        
        // Filter only official YouTube trailers
        const trailers = data.results.filter(
            (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        const trailer = trailers.length > 0 ? trailers[0] : null;

        res.json(trailer); // Return the first trailer or null
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie trailer" });
    }
};

const getStreamingProviders = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`movie/${id}/watch/providers`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch streaming providers" });
    }
};

const getMovieCredits = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`movie/${id}/credits`);
        res.json(data);
      
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie credits" });
    }
};
// Get Similar Movies
const getSimilarMovies = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`movie/${id}/similar`);

        res.json(data.results);
    
    } catch (error) {
        console.error("Error fetching similar movies:", error);
        res.status(500).json({ error: "Failed to fetch similar movies" });
    }
};



module.exports = {
    getTrendingMovies,
    getTrendingTVShows,
    getMovieDetails,
    getMovieGenres,
    getMoviesByGenre,
    getPopularMovies,
    getNowPlayingMovies,
    getUpcomingMovies,
    getPopularActors,
    getMarvelMovies,
    getFeaturedMovies,
    searchMovies,
    getMovieById,
    getMovieTrailer,
    getStreamingProviders,
    getMovieCredits,
    getSimilarMovies


};
