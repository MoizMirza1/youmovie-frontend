import React from 'react';
import backgroundImage from '../../Assets/Images/HomepageImages/AboutImg.jpg';
import laptopMockup from '../../Assets/Images/HomepageImages/AboutImg2.png';

const About = () => {



  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay for better readability */}
      <div className="bg-black bg-opacity-0 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center mt-20">
          <h1 className="text-white text-xl sm:text-3xl md:text-4xl font-medium font-bebas">
            Next Generation UI And Experience
          </h1>
          <hr className="my-2 border-0 h-0.5 w-full max-w-xs bg-gradient-to-r from-black/80 via-netflix-red to-black/80" />
        </div>
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl text-gray-300 font-extrabold leading-tight mt-8">
          YouMovies Custom OTT <br />
          <span className="text-netflix-red">Platform</span>
        </h1>
        <p className="text-md text-white max-w-2xl text-center mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, hic! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur tenetur repellendus doloribus vitae. Laborum expedita nobis rerum minus quas magnam.
        </p>
        <div className="mt-12 w-full flex justify-center">
          <img 
            src={laptopMockup} 
            alt="Laptop UI Mockup" 
            className="w-full max-w-4xl h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    
    </div>
  );
};

export default About;
