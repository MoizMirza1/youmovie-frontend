import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { FaStar, FaEye, FaClock, FaCalendarAlt, FaTimes } from "react-icons/fa";
import Lottie from "lottie-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import loadingAnimation from "../../Assets/animations/loading.json";
import playAnimation from "../../Assets/animations/play.json";
import ResponsiveNavbar from "../Movies/MovieNavbar";

Modal.setAppElement("#root");

const Video = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://youmovie-production.up.railway.app/api/tmdb/movie/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTrailer = async () => {
      try {
        const response = await axios.get(`https://youmovie-production.up.railway.app/api/tmdb/movie/${movieId}/trailer`);
        if (response.data) {
          setTrailerKey(response.data.key);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchMovie();
    fetchTrailer();
  }, [movieId]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <Lottie animationData={loadingAnimation} className="w-40" />
      </div>
    );

    const handleWatchClick = () => {
      navigate(`/watch/${movieId}`);
    };

  return (
    <div className="relative w-full bg-black text-white flex flex-col">
      <ResponsiveNavbar />

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col">
        {/* Background Image */}
        <div
          className="absolute inset-0 h-[50vh] md:h-[70vh]  transition-opacity duration-500"
          style={{
            backgroundImage: loading
              ? "none"
              : `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(50%)",
          }}
        ></div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-20 min-h-[70vh] text-center md:text-left">
          {/* Movie Details */}
          <div className="max-w-[600px] space-y-6">
            {loading ? (
              <Skeleton height={40} width="80%" />
            ) : (
              <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg font-bebas">{movie.title}</h1>
            )}

            <div className="flex flex-wrap justify-center md:justify-start space-x-4 text-gray-300 text-sm md:text-lg">
              <div className="flex items-center space-x-2">
                <FaEye className="text-white" />
                {loading ? <Skeleton width={80} /> : <span>Watching</span>}
              </div>
              <div className="flex items-center space-x-2">
                <FaClock className="text-white" />
                {loading ? <Skeleton width={50} /> : <span>{movie.runtime} min</span>}
              </div>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-white" />
                {loading ? <Skeleton width={80} /> : <span>{movie.release_date}</span>}
              </div>
            </div>

            <p className="text-lg leading-relaxed opacity-90">
              {loading ? <Skeleton count={2} /> : `${movie.overview.slice(0, 150)}...`}
            </p>

            {loading ? (
              <Skeleton width={180} height={40} />
            ) : (
              <button
                onClick={() => navigate(`/movies/video/watch/${movie.id}`)}
                className="mt-4 md:mt-8 bg-red-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition duration-300 w-[180px]"
              >
                Watch Now
              </button>
            )}
          </div>

          {/* Play Trailer Button */}
          <div className="mt-6 md:mt-0 flex flex-col items-center md:items-end">
            {loading ? (
              <Skeleton width={120} height={40} />
            ) : trailerKey ? (
              <div
                className="flex flex-col items-center md:flex-row space-x-4 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="w-24 md:w-32">
                  <Lottie animationData={playAnimation} loop={true} />
                </div>
                <span className="text-white text-2xl md:text-4xl font-semibold opacity-80">
                  WATCH TRAILER
                </span>
              </div>
            ) : (
              <p className="text-gray-400">Trailer Not Available</p>
            )}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-[1000]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-[999]"
        shouldCloseOnOverlayClick={true}
      >
        <div className="relative w-[90%] md:w-[80%] max-w-4xl bg-black p-6 rounded-lg shadow-lg">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white text-3xl bg-black p-2 rounded-full hover:bg-red-600 transition duration-300"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            <FaTimes />
          </button>

          {/* Trailer Video */}
          {loading ? (
            <Skeleton height={400} />
          ) : trailerKey ? (
            <iframe
              width="100%"
              height="400"
              className="rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
              title="Movie Trailer"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-center text-gray-400">Trailer not available</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Video;
