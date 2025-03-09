import React, { useState, useEffect, useContext } from "react";
import { X } from "lucide-react"; // Importing cross icon
import Banner from "../components/Home/Banner";
import Navbar from "../components/Home/Navbar";
import About from "../components/Home/About";
import Genre from "../components/Home/Genre";
import Feature from "../components/Home/Feature";
import ProfileFeature from "../components/Home/ProfileFeauture";
import Service from "../components/Home/Service";
import Tech from "../components/Home/Tech";
import Faq from "../components/Home/Faq";
import UserReviews from "../components/Home/Reviews.jsx";
import Trending from "../components/Home/Trending.jsx";
import NewsLetter from "../components/Home/Newsletter.jsx";
import Footer from "../components/Home/Footer.jsx";
import Contributors from "../components/Home/Contributors.jsx";
import ResponsiveNavbar from "../components/Home/ResponsiveNavbar.jsx";
import { AuthContext } from "../context/AuthContext";

import { useWindowSize } from "react-use";
import Confetti from "react-confetti";


const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); 
  const { width, height } = useWindowSize(); 

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");
    if (user?.name && !hasSeenWelcome) {
      setShowModal(true);
      sessionStorage.setItem("hasSeenWelcome", "true");
    }
  }, [user]);

  const handleCloseModal = () => {
    setShowModal(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000); // Stop confetti after 3s
  };

  return (
    <div>
      <title>YouMovies - Home</title>
      <meta
        name="description"
        content="Watch trending movies online with YouMovies. Enjoy unlimited streaming with the best features!"
      />
      <meta name="keywords" content="movies, streaming, online movies, YouMovies, latest films" />
      <link rel="icon" href="/favicon.ico" />

      <ResponsiveNavbar />
      <Banner />

      {showConfetti &&  <Confetti
    width={width || window.innerWidth}
    height={height || window.innerHeight}
    numberOfPieces={1200} // More confetti for full effect
    gravity={0.7} // Faster falling speed (Default is 0.1 - 0.3)
    wind={0.02} // Slight movement effect
    tweenDuration={2000} // Faster animation
  />}

      {/* ✨ Netflix-Style Welcome Modal ✨ */}
      {showModal && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-[#141414] w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] flex flex-col lg:flex-row shadow-2xl rounded-2xl overflow-hidden relative">
            
            {/* ❌ Close Button */}
            <button
                onClick={handleCloseModal} 
              className="absolute top-4 right-4 text-white bg-gray-700 rounded-full p-2 hover:bg-gray-600 transition-all duration-300"
            >
              <X size={24} />
            </button>

            {/* Left Side - "YouMovies" Text Only (BIG) */}
            <div className="w-full lg:w-1/2 bg-[#E50914] flex flex-col items-center justify-center text-white py-8 lg:py-0">
              <h1 className="text-5xl sm:text-6xl md:text-6xl font-extrabold tracking-wide font-bebas">YouMovies</h1>
            </div>

            {/* Right Side - Welcome Text & Buttons */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 text-white text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">Welcome, {user.name}!</h2>
              <p className="text-lg sm:text-xl mt-3 text-gray-300">
                Enjoy unlimited streaming on <span className="text-[#E50914] font-semibold">YouMovies</span> 🎬
              </p>
              <button
                  onClick={handleCloseModal} 
                className="mt-6 px-8 sm:px-10 py-3 sm:py-4 bg-[#E50914] text-white text-lg sm:text-xl font-semibold rounded-full shadow-lg hover:bg-red-700 transition-all duration-300"
              >
                Let's Go!
              </button>
            </div>
          </div>

          {/* ✨ Credits & LinkedIn in One Line ✨ */}
          <div className="mt-6 flex items-center space-x-4 text-lg sm:text-xl text-gray-300">
            <a
              href="https://www.linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-all duration-300 font-semibold"
            >
              LinkedIn
            </a>
            <span className="text-gray-500">|</span>
            <p className="opacity-80">
              Designed by <span className="text-[#E50914] font-semibold">Moiz Mirza</span> 💎
            </p>
          </div>
        </div>
      )}

      <About />
      <Trending />
      <Genre />
      <Feature />
      <ProfileFeature />
      <Tech />
      <Faq />
      <Service />
      <UserReviews />
      <Contributors />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default HomePage;