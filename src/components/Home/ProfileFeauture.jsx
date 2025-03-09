import React from 'react';
import { Link } from 'react-router-dom';
import SecondSectionImg from '../../Assets/Images/HomepageImages/featureImage2.png'; // Replace with your actual image

const ProfileFeature = () => {
  return (
    <div className='w-full bg-black'>
 <div className="max-w-7xl mx-auto p-8 flex flex-col md:flex-row items-center justify-center">
      {/* Left Column - Image */}
      <div className="md:w-1/2 p-4">
        <img
          src={SecondSectionImg}
          alt="Profile Feature Illustration"
          className="w-full h-auto rounded shadow-lg"
        />
      </div>

      {/* Right Column - Content */}
      <div className="md:w-1/2 p-4">
        <h1 className="text-white text-xl sm:text-3xl md:text-xl font-medium font-bebas">
          Next Generation UI And Experience
        </h1>
        <hr className="my-2 border-0 h-0.5 w-full max-w-xs bg-gradient-to-r from-black/80 via-netflix-red to-black/80" />
        <h1 className="text-6xl font-bold mb-4 text-netflix-red">Profile Feature</h1>
        <p className="text-gray-200 mb-6">
          Manage your personalized profile with ease. Customize your settings, track your activity, and enhance your experience with a user-friendly interface.
        </p>
        <Link
          to="/profile"
          className="bg-netflix-red text-white px-6 py-2 rounded hover:bg-blue-700 transition inline-block"
        >
          Explore Profile
        </Link>
      </div>
    </div>
   
    </div>
  );
};

export default ProfileFeature;
