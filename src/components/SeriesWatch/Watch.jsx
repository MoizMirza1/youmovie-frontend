import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaEye, FaClock, FaCalendarAlt, FaPlay, FaPlus, FaShareAlt, FaListUl, FaTimes, FaCopy, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Watch = () => {
  const { movieId } = useParams();
  const [series, setSeries] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchSeries = async () => {
      try {
        const seriesRes = await axios.get(`https://youmovie-production.up.railway.app/api/tmdb/series/${movieId}`);
        setSeries(seriesRes.data);

        const trailerRes = await axios.get(`https://youmovie-production.up.railway.app/api/tmdb/series/${movieId}/trailer`);
        if (trailerRes.data) {
          setTrailerUrl(`https://www.youtube.com/embed/${trailerRes.data.key}`);
        }
      } catch (error) {
        console.error("Error fetching series data:", error);
        setTrailerUrl(`https://www.themoviedb.org/tv/${movieId}`); // Fallback
      }
    };

    fetchSeries();
  }, [movieId]);

  useEffect(() => {
    if (series) {
      document.title = `${series.name || "Untitled Series"} - YouMovies`;
    }
  }, [series]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(trailerUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!series) return <div className="text-center text-white p-6">Loading...</div>;

  return (
    <>
      <div>
        <title>{series.name || "Untitled Series"} - YouMovies</title>
        <meta name="description" content={series.overview || "No description available."} />

        <h1>{series.name || "Untitled Series"}</h1>
        <p>{series.overview || "No description available."}</p>
      </div>

      <div className="relative w-full h-screen text-white">
        {/* Full-Page Banner */}
        <div className="absolute inset-0 w-full h-full bg-black flex justify-center items-center">
          {isTrailerOpen ? (
            <iframe
              src={trailerUrl}
              title="Series Trailer"
              className="w-full h-full"
              allow="autoplay; fullscreen"
            ></iframe>
          ) : (
            <div
              className="w-full h-full bg-cover bg-center brightness-50"
              style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})` }}
            ></div>
          )}
          {isTrailerOpen && (
            <button
              className="absolute top-5 right-5 text-white text-3xl z-50 hover:text-gray-400 transition"
              onClick={() => setIsTrailerOpen(false)}
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Content Container */}
        {!isTrailerOpen && (
          <div className="relative z-10 flex flex-col justify-end items-start px-8 md:px-16 h-full pb-28">
            {/* Row 1: Genres */}
            <ul className="flex space-x-2 text-xs md:text-sm uppercase text-gray-300 mb-3">
              {series.genres?.map((genre) => (
                <li key={genre.id} className="bg-gray-700 px-3 py-1 rounded-md">{genre.name}</li>
              ))}
            </ul>

            {/* Row 2: Title & Description */}
            <h1 className="text-6xl md:text-9xl font-bold font-bebas">{series.name}</h1>
            <p className="mt-2 text-sm md:text-base max-w-2xl opacity-80">{series.overview?.slice(0, 150)}...</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-2 text-white bg-gray-700 rounded-lg px-4 py-1 text-sm font-extrabold"
            >
              Read More
            </button>

            {/* Row 3: Seasons, Episodes, Duration */}
            <div className="flex items-center space-x-6 mt-3 text-gray-300 text-sm md:text-base">
              <div className="flex items-center space-x-1"><FaEye className="text-white text-lg" /><span>Watching</span></div>
              <div className="flex items-center space-x-1"><FaClock className="text-white text-lg" /><span>{series.episode_run_time?.[0] || "N/A"} min</span></div>
              <div className="flex items-center space-x-1"><FaCalendarAlt className="text-white text-lg" /><span>{series.first_air_date || "N/A"}</span></div>
            </div>

            {/* Row 4: Available Languages */}
            <p className="mt-3 text-gray-300 text-sm md:text-base">
              <strong>Available in:</strong>{" "}
              {series.spoken_languages?.map((lang, index) => (
                <span key={lang.iso_639_1}>{lang.english_name}{index !== series.spoken_languages.length - 1 ? ", " : ""}</span>
              ))}
            </p>

            {/* Row 5: Buttons */}
            <div className="flex space-x-4 mt-5">
              <button onClick={() => setIsTrailerOpen(true)} className="flex items-center justify-center min-w-[40%] sm:w-40 md:w-48 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md text-sm md:text-lg font-semibold transition duration-300">
                <FaPlay className="mr-2 text-lg" /> Play Now
              </button>
              <button className="flex items-center justify-center w-40 md:w-48 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md text-sm md:text-lg font-semibold transition duration-300">
                <FaPlus className="mr-2 text-lg" /> Watchlist
              </button>

              {/* Circular Icons */}
              <div className="flex space-x-2">
                <button
                  className="w-12 h-12 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded-full transition duration-300"
                  onClick={() => setIsShareOpen(true)}
                >
                  <FaShareAlt className="text-lg" />
                </button>
                <button className="w-12 h-12 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded-full transition duration-300">
                  <FaListUl className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Full Description */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-gray-900 text-white p-8 rounded-lg w-[700px] max-w-full">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h3 className="text-4xl font-bold">{series.name}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-white text-2xl">
                  <FaTimes />
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mb-3">
                {series.genres?.map((genre) => (
                  <span key={genre.id} className="bg-red-600 px-3 py-1 rounded-md text-sm font-medium">
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-400 text-base mb-4">
                <strong>Language:</strong> {series.original_language?.toUpperCase() || "N/A"}
              </p>

              <p className="text-lg leading-relaxed">{series.overview}</p>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {isShareOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg w-80">
              <div className="flex justify-between items-center border-b pb-3 mb-3">
                <h3 className="text-lg font-semibold">Share Series</h3>
                <button onClick={() => setIsShareOpen(false)} className="text-gray-300 hover:text-white">
                  <FaTimes />
                </button>
              </div>

              <div className="flex space-x-4 justify-center mb-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(trailerUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 w-12 h-12 flex items-center justify-center rounded-full transition duration-300"
                >
                  <FaFacebook className="text-white text-xl" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(trailerUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-400 hover:bg-blue-500 w-12 h-12 flex items-center justify-center rounded-full transition duration-300"
                >
                  <FaTwitter className="text-white text-xl" />
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(trailerUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 w-12 h-12 flex items-center justify-center rounded-full transition duration-300"
                >
                  <FaWhatsapp className="text-white text-xl" />
                </a>
              </div>

              <div className="flex items-center bg-gray-800 rounded-md p-2">
                <input type="text" value={trailerUrl} readOnly className="bg-transparent text-white w-full text-sm px-2 outline-none" />
                <button onClick={handleCopyLink} className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md ml-2 transition duration-300">
                  <FaCopy />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Watch;