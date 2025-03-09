const { fetchFromTMDB } = require("../services/tmdbService");

// Get Trending TV Shows
const getTrendingTVShows = async (req, res) => {
    try {
        const data = await fetchFromTMDB("trending/tv/week");
        res.json(data.results);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch trending TV shows" });
    }
};

const getNetflixOriginals = async (req, res) => {
    try {
        const data = await fetchFromTMDB("discover/tv?with_networks=213&sort_by=popularity.desc");
        res.json(data);
    } catch (error) {
        console.error("Failed to fetch Netflix Originals:", error);
        res.status(500).json({ error: "Failed to fetch Netflix Originals" });
    }
};



// Get TV Show Details by ID
const getTVShowDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`tv/${id}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch TV show details" });
    }
};

// Get Popular TV Shows
const getNetflixSeries = async (req, res) => {
    try {
        const data = await fetchFromTMDB(
            "discover/tv?with_networks=213&with_genres=18,9648,10759&sort_by=popularity.desc"
        );
        res.json(data.results);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Netflix popular series" });
    }
};





// Get TV Show Genres
const getTVShowGenres = async (req, res) => {
    try {
        const data = await fetchFromTMDB("genre/tv/list");
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch TV show genres" });
    }
};

// Get TV Shows by Genre
const getTVShowsByGenre = async (req, res) => {
    try {
        const { genreId } = req.params;
        const data = await fetchFromTMDB("discover/tv", { with_genres: genreId });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch TV shows by genre" });
    }
};

// Get Currently Airing TV Shows
const getNowAiringTVShows = async (req, res) => {
    try {
        const data = await fetchFromTMDB("tv/on_the_air");
        res.json(data.results);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch currently airing TV shows" });
    }
};

// Get Upcoming TV Shows
const getUpcomingTVShows = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const data = await fetchFromTMDB("tv/airing_today", {
            region: "US",
            language: "en-US",
            page,
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch upcoming TV shows" });
    }
};

// Get TV Show Cast & Crew
const getTVShowCredits = async (req, res) => {
    try {
        const { id } = req.params;  // Extract the TV show ID from request parameters
     
        const data = await fetchFromTMDB(`tv/${id}/credits`);

        // Check if the API response contains results
        if (data && data.cast && data.crew) {
            res.json({
                cast: data.cast,    // Return cast data
                crew: data.crew     // Return crew data
            });
        } else {
            res.status(404).json({ error: "No credits found for this TV show" });
        }
    } catch (error) {
        // Handle errors (network, TMDB issues, etc.)
        res.status(500).json({ error: "Failed to fetch TV show credits" });
    }
};


// Get Similar TV Shows
const getSimilarTVShows = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`tv/${id}/similar`);

        if (!data.results || data.results.length === 0) {
            return res.json({ message: "No relevant similar TV shows found!" });
        }

        const filteredShows = data.results
            .filter(show => show.vote_average >= 7.0 && show.vote_count > 500)
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 10);

        res.json(filteredShows);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch similar TV shows" });
    }
};

// Get TV Show Streaming Providers
const getTVShowStreamingProviders = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`tv/${id}/watch/providers`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch TV show streaming providers" });
    }
};

// Search TV Shows
const searchTVShows = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const data = await fetchFromTMDB("search/tv", { query });
        res.json(data.results);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch TV show search results" });
    }
};

// Get TV Show Trailer
const getTVShowTrailer = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchFromTMDB(`tv/${id}/videos`);

        const trailers = data.results.filter(
            (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        const trailer = trailers.length > 0 ? trailers[0] : null;

        res.json(trailer);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch TV show trailer" });
    }
};




const getAiringTodayTVShows = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const data = await fetchFromTMDB("tv/airing_today", {
            language: "en-US",
            page,
        });

        res.json(data.results);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch TV shows airing today" });
    }
};


const tmdbIDs = [
    110316, // Alice in Borderland
    66732, // Stranger Things
    93405, // Squid Game
    77169, // Cobra Kai
    84958, // Loki
    71446, // Money Heist
    99966, // All of Us Are Dead
    119051, // Wednesday
];


const getSelectedTVShows = async (req, res) => {
    try {
        // Fetch TV show details
        const tvPromises = tmdbIDs.map(id =>
            fetchFromTMDB(`tv/${id}`).catch(() => null)
        );

        // Execute all API calls in parallel
        const results = await Promise.all(tvPromises);
      

        // Filter out failed fetch results
        res.json(results.filter(Boolean));
    } catch (error) {
        console.error("Failed to fetch selected TV shows:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
};





const getPrimeVideoTopRatedSeries = async (req, res) => {
    try {
        const data = await fetchFromTMDB("discover/tv?with_networks=1024&sort_by=vote_average.desc");
        res.json(data.results);
    } catch (error) {
        console.error("Failed to fetch Prime Video top-rated series:", error);
        res.status(500).json({ error: "Failed to fetch Prime Video top-rated series" });
    }
};
const DisneyFeaturedSeries = async (req, res) => {
    try {
      const data = await fetchFromTMDB(
        `/discover/tv?with_networks=273&sort_by=vote_average.desc&page=2`
      );
      res.json(data);
    } catch (error) {
      console.error("Failed to fetch Disney+ Featured Series", error);
      res.status(500).json({ error: "Failed to fetch Disney+ series" });
    }
  };
  
  

const HotstarFeaturedMoviesAndSeries = async (req, res) => {
    try {
      const data = await fetchFromTMDB(
        `/discover/movie?with_networks=118&sort_by=vote_average.desc&page=1` // You can adjust the page parameter as needed
      );
      const seriesData = await fetchFromTMDB(
        `/discover/tv?with_networks=118&sort_by=vote_average.desc&page=1`
      );
      res.json({ movies: data.results, series: seriesData.results });
    } catch (error) {
      console.error("Failed to fetch Hotstar Movies and Series", error);
      res.status(500).json({ error: "Failed to fetch Hotstar movies and series" });
    }
  };
  




// Controller to get TV series genres
const getSeriesGenres = async (req, res) => {
  try {
    // Fetch the TV genres from TMDB
    const data = await fetchFromTMDB("genre/tv/list"); // The endpoint to fetch TV genres

    res.json(data.genres); // Send back the genres array
    
  } catch (error) {
    console.error("Error fetching TV series genres:", error);
    res.status(500).json({ error: "Failed to fetch TV series genres" });
  }
};

const getSimilarGenreSeries = async (req, res) => {
    try {
      const { genreId } = req.params; // Get the genreId from the request params
  
      // Fetch similar series for the given genreId
      const data = await fetchFromTMDB(`discover/tv?with_genres=${genreId}&sort_by=popularity.desc`);
  
      res.json(data.results); // Send back the similar series results
      
    } catch (error) {
      console.error("Error fetching similar genre series:", error);
      res.status(500).json({ error: "Failed to fetch similar genre series" });
    }
  };


  const HindiSeries =  async(req, res) =>{
    try {
        const data = await fetchFromTMDB("discover/tv?with_original_language=hi&sort_by=popularity.desc");
        res.json(data.results);
        
    } catch (error) {
        console.error("Error fetching Hindi series:", error);
        res.status(500).json({ error: "Failed to fetch Hindi series" });
    }
  }


  const getSeriesById = async (req, res) => {
    try {
        const { id } = req.params; 
      
        const data = await fetchFromTMDB(`tv/${id}`);  
        res.json(data);  // Return the series data
    } catch (error) {
        console.error('Error fetching series:', error);
        res.status(500).json({ error: 'Failed to fetch series details' });
    }
};

// Get Trailer for a Series by ID
const getSeriesTrailer = async (req, res) => {
    try {
        const { id } = req.params; // Extract series ID from request parameters
        const data = await fetchFromTMDB(`tv/${id}/videos`);  // Fetch trailers for the series
        
        // Filter for official YouTube trailers
        const trailers = data.results.filter((video) => video.type === 'Trailer' && video.site === 'YouTube');
        const trailer = trailers.length > 0 ? trailers[0] : null;  // Get the first trailer if available

        res.json(trailer);  // Return the trailer or null
    } catch (error) {
        console.error('Error fetching series trailer:', error);
        res.status(500).json({ error: 'Failed to fetch series trailer' });
    }
};
  

module.exports = {
    getTrendingTVShows,
    getTVShowDetails,
    getNetflixSeries,
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
    getAiringTodayTVShows,
    getSelectedTVShows,
    getPrimeVideoTopRatedSeries,
    DisneyFeaturedSeries,
    HotstarFeaturedMoviesAndSeries,
    getSeriesGenres,
    getSimilarGenreSeries,
    HindiSeries,
    getSeriesById,
    getSeriesTrailer
    
};
