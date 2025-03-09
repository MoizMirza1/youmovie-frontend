import React from 'react';
import { Link } from 'react-router-dom';
import FeatureImg from '../../Assets/Images/HomepageImages/Typgraph.webp';
import SecondSectionImg from '../../Assets/Images/HomepageImages/featureImage2.png'; // Replace with your actual image

const Feature = () => {
  return (
    <div className="w-full bg-black py-20">
      {/* First Section: Left Content, Right Image */}
      <div className="max-w-7xl mx-auto p-8 flex flex-col md:flex-row items-center justify-center">
        {/* Left Column - Content */}
        <div className="md:w-1/2 p-4">
          <h1 className="text-6xl font-bold mb-4 text-netflix-red">Amazing Feature</h1>
          <p className="text-gray-200 mb-6">
            Discover the benefits of our amazing feature. It enhances your experience by providing robust functionality and an intuitive interface.
          </p>
          <Link
            to="/learn-more"
            className="bg-netflix-red text-white px-6 py-2 rounded hover:bg-blue-700 transition inline-block"
          >
            Learn More
          </Link>
        </div>

        {/* Right Column - Image */}
        <div className="md:w-1/2 p-4">
          <img
            src={FeatureImg}
            alt="Feature Illustration"
            className="w-full h-auto rounded shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Feature;
