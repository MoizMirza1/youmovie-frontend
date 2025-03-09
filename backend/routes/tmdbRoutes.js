const express = require("express");
const { getTrendingMovies,
 
    getMovieDetails,
    getMovieGenres,
    getMoviesByGenre, getPopularMovies,
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
    getSimilarMovies } = require("../controller/tmdbController.js");

const { getTrendingTVShows,
    getTVShowDetails,

    getTVShowGenres,
    getTVShowsByGenre,
    getNowAiringTVShows,
    getUpcomingTVShows,
    getTVShowCredits,
    getSimilarTVShows,
    getTVShowStreamingProviders,
    searchTVShows,
    getTVShowTrailer,
    getNetflixOriginals,
    getAiringTodayTVShows ,
    getSelectedTVShows,
    getPrimeVideoTopRatedSeries,
    DisneyFeaturedSeries,
    HotstarFeaturedMoviesAndSeries,
    getSeriesGenres,
    getSimilarGenreSeries,
    HindiSeries,
    getSeriesById,
    getSeriesTrailer }  = require("../controller/SeriesController.jsx")



const router = express.Router();


//Movie Routes
router.get("/trending/movies", getTrendingMovies);
router.get("/movie/:id", getMovieDetails);
router.get("/genres" , getMovieGenres);
router.get("/genre/:genreId/movies", getMoviesByGenre); // Get movies by genre
router.get("/movies/popular",  getPopularMovies);
router.get("/movies/now_playing", getNowPlayingMovies);
router.get("/movies/upcoming", getUpcomingMovies); 
router.get("/actors/popular", getPopularActors,); 
router.get("/marvel/movies", getMarvelMovies);
router.get("/featured/movies", getFeaturedMovies);
router.get("/search", searchMovies);
router.get("/movie/:id", getMovieById);
router.get("/movie/:id/trailer", getMovieTrailer);
router.get("/movie/:id/providers", getStreamingProviders);
router.get("/movie/:id/credits", getMovieCredits);
router.get("/movie/:id/similar", getSimilarMovies);



//Series Route

router.get("/trending", getTrendingTVShows);

// Get TV show details by ID
router.get("/:id", getTVShowDetails);

// Get popular TV shows

// Get TV show genres
router.get("/genres", getTVShowGenres);

// Get TV shows by genre
router.get("/genre/:genreId", getTVShowsByGenre);

// Get currently airing TV shows
router.get("/now_airing", getNowAiringTVShows);

// Get upcoming TV shows
router.get("/series/upcoming/netflix", getUpcomingTVShows);

// Get TV show credits (cast & crew)
router.get("/:id/credits", getTVShowCredits);

// Get similar TV shows
router.get("/:id/similar", getSimilarTVShows);

// Get streaming providers for a TV show
router.get("/:id/providers", getTVShowStreamingProviders);

// Search for TV shows
router.get("/search", searchTVShows);

// Get TV show trailer
router.get("/:id/trailer", getTVShowTrailer);



router.get("/tv/airing_today",  getAiringTodayTVShows);

router.get("/netflix/originals", getNetflixOriginals);

router.get("/series/selected", getSelectedTVShows);

router.get("/prime-video/top-rated", getPrimeVideoTopRatedSeries);

router.get("/disneyplus/featured", DisneyFeaturedSeries);


router.get("/hotstar/featured", HotstarFeaturedMoviesAndSeries);


router.get("/genres/series", getSeriesGenres);


router.get('/genre/:genreId/similar',   getSimilarGenreSeries );

router.get('/hindi/series', HindiSeries);

// Route to fetch series by ID
router.get('/series/:id', getSeriesById);

// Route to fetch trailer by series ID
router.get('/series/:id/trailer', getSeriesTrailer);

module.exports = router; 
