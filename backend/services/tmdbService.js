const axios = require("axios");

const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

const fetchFromTMDB = async (endpoint, params = {}) => {
    try {
        const response = await axios.get(`${TMDB_API_URL}/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            params,
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error.message);
        throw error;
    }
};

module.exports = { fetchFromTMDB };
