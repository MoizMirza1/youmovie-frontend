import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaEye, FaClock, FaCalendarAlt, FaPlay, FaPlus, FaShareAlt, FaListUl, FaTimes, FaCopy, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext"; 

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";
import logo from "../../Assets/Images/logo-without-text.png"



const Watch = () => {

const { movieId } = useParams();
  const { user, login, logout } = useContext(AuthContext)
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);



  useEffect(() => {
    window.scrollTo(0, 0);
  
    const fetchMovie = async () => {
      try {
        const movieRes = await axios.get(`https://youmovie-o9a9.vercel.app/api/tmdb/movie/${movieId}`);
        setMovie(movieRes.data);
  
        const trailerRes = await axios.get(`https://youmovie-o9a9.vercel.app/api/tmdb/movie/${movieId}/trailer`);
      if (trailerRes.data) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailerRes.data.key}`);
     
      }

        
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setTrailerUrl(`https://www.themoviedb.org/movie/${movieId}`); // Fallback
      }
    };
    
    fetchMovie();
  }, [movieId]);

   useEffect(() => {
    if (movie) {
      
      document.title = `${movie.title} - YouMovies`;
    }
  }, [movie]);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(trailerUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToWatchlist = async () => {
    if (!user) {
      toast.error("You need to log in first!");
      return;
    }
    

    try {
      const response = await axios.post("https://youmovie-o9a9.vercel.app/api/auth/watchlist/add", {
        userId: user._id,
        movieId,

   
      });
  

      if (response.data.message) {
        toast.success(response.data.message, { position: "top-center" });
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      toast.error("Failed to add movie to watchlist", { position: "top-right" });
    }
  };

  if (!movie) return <div className="text-center text-white p-6">Loading...</div>;

  return (
    <>
     <div>
      <title>{movie.title} - YouMovies</title>
      <meta name="description" content={movie.description} />
    


    </div>
 <ToastContainer />
    <div className="relative w-full h-screen text-white">
      {/* Full-Page Banner */}
      <div className="absolute inset-0 w-full h-full bg-black flex justify-center items-center">
        {isTrailerOpen ? (
          <iframe
            src={trailerUrl}
            title="Movie Trailer"
            className="w-full h-full"
            allow="autoplay; fullscreen"
          ></iframe>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center brightness-50"
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
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
        </div>/
      {/* Content Container */}
      {!isTrailerOpen && (
          <div className="relative z-10 flex flex-col justify-end items-start px-8 md:px-16 h-full pb-28">
          {/* Row 1: Genres */}
          <ul className="flex space-x-2 text-xs md:text-sm uppercase text-gray-300 mb-3">
            {movie.genres?.map((genre) => (
              <li key={genre.id} className="bg-gray-700 px-3 py-1 rounded-md">{genre.name}</li>
            ))}
          </ul>
  
          {/* Row 2: Title & Description */}
          <h1 className="text-6xl md:text-9xl font-bold font-bebas">{movie.title}</h1>
          <p className="mt-2 text-sm md:text-base max-w-2xl opacity-80">{movie.overview.slice(0, 150)}...</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-2 text-white bg-gray-700 rounded-lg px-4 py-1 text-sm font-extrabold"
          >
            Read More
          </button>
  
          {/* Row 3: Watching, Duration, Release Date */}
          <div className="flex items-center space-x-6 mt-3 text-gray-300 text-sm md:text-base">
            <div className="flex items-center space-x-1"><FaEye className="text-white text-lg" /><span>Watching</span></div>
            <div className="flex items-center space-x-1"><FaClock className="text-white text-lg" /><span>{movie.runtime} min</span></div>
            <div className="flex items-center space-x-1"><FaCalendarAlt className="text-white text-lg" /><span>{movie.release_date}</span></div>
          </div>
  
          {/* Row 4: Available Languages */}
          <p className="mt-3 text-gray-300 text-sm md:text-base">
            <strong>Available in:</strong>{" "}
            {movie.spoken_languages?.map((lang, index) => (
              <span key={lang.iso_639_1}>{lang.english_name}{index !== movie.spoken_languages.length - 1 ? ", " : ""}</span>
            ))}
          </p>
  
          {/* Row 5: Buttons */}
          <div className="flex space-x-4 mt-5">
            <button  onClick={() => setIsTrailerOpen(true)} className="flex items-center justify-center min-w-[40%] sm:w-40 md:w-48 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md text-sm md:text-lg font-semibold transition duration-300">
              <FaPlay className="mr-2 text-lg" /> Play Now
            </button>
            <button onClick={handleAddToWatchlist} className="flex items-center justify-center w-40 md:w-48 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md text-sm md:text-lg font-semibold transition duration-300">
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
          {isTrailerOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[9999]">
              <div className="relative w-full h-full bg-black flex justify-center items-center">
                <iframe
                  src={trailerUrl}
                  title="Movie Trailer"
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                ></iframe>
                <button
                  className="absolute top-5 right-5 text-white text-3xl z-50 hover:text-gray-400 transition"
                  onClick={() => setIsTrailerOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          )}
  
        </div>
      )}
    
      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
    <div className="bg-gray-900 text-white p-8 rounded-lg w-[700px] max-w-full">
      
      {/* Title & Close Button */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h3 className="text-4xl font-bold">{movie.title}</h3>
        <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-white text-2xl">
          <FaTimes />
        </button>
      </div>

      {/* Genres */}
      <div className="flex flex-wrap gap-3 mb-3">
        {movie.genres?.map((genre) => (
          <span key={genre.id} className="bg-red-600 px-3 py-1 rounded-md text-sm font-medium">
            {genre.name}
          </span>
        ))}
      </div>

      {/* Language */}
      <p className="text-gray-400 text-base mb-4">
        <strong>Language:</strong> {movie.original_language.toUpperCase()}
      </p>

      {/* Full Description */}
      <p className="text-lg leading-relaxed">{movie.overview}</p>
    </div>
  </div>
)}

      {/* Share Modal */}
      import QRCode from "qrcode.react";

{isShareOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-gray-900 text-white p-6 rounded-lg w-80">
      <div className="flex justify-between items-center border-b pb-3 mb-3">
        <h3 className="text-lg font-semibold">Share Movie</h3>
        <button onClick={() => setIsShareOpen(false)} className="text-gray-300 hover:text-white">
          <FaTimes />
        </button>
      </div>

      {/* Social Media Links */}
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

      {/* Share Link & Copy Button */}
      <div className="flex items-center bg-gray-800 rounded-md p-2">
        <input type="text" value={trailerUrl} readOnly className="bg-transparent text-white w-full text-sm px-2 outline-none" />
        <button onClick={handleCopyLink} className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md ml-2 transition duration-300">
          <FaCopy />
        </button>
      </div>

      {/* QR Code for Trailer URL */}
      <div className="flex flex-col items-center bg-gray-900 p-4 rounded-lg shadow-lg">
      
      
      <QRCodeCanvas
        value={trailerUrl}
        size={170}
        bgColor="#ffffff"
        fgColor="#e50914" // Netflix-style red
        level="H"
        includeMargin={true}
        imageSettings={{
          src: logo, // Branded logo inside QR
          height: 40,
          width: 40,
          excavate: true,
        }}
        className="rounded-lg"
      />

<h3 className="text-white text-lg font-semibold mt-5">
        Scan to Watch the Trailer
      </h3>
    </div>
    </div>
  </div>
)}

    </div>
    </>
  );
};

export default Watch;
