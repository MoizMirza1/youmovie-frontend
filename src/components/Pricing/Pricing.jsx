import React from 'react';
import ResponsiveNavbar from '../Home/ResponsiveNavbar.jsx';
import NewsLetter from '../Home/Newsletter.jsx';
import Footer from '../Home/Footer.jsx';
import Faq from '../Home/Faq.jsx';

const Pricing = () => {
  return (
    <>
      <div>
        <ResponsiveNavbar />
        <div className="bg-black min-h-screen">
          {/* Hero Section */}
          <div className="text-center py-20 flex flex-col justify-center items-center">
            <h1 className="text-white text-lg sm:text-2xl md:text-3xl font-medium font-bebas">
              Next Generation UI & Experience
            </h1>
            <hr className="my-4 border-0 h-0.5 w-full max-w-xs bg-gradient-to-r from-black/80 via-netflix-red to-black/80" />
            <h1 className="text-white text-xl sm:text-3xl md:text-5xl font-bold font-bebas tracking-wide uppercase">
              Explore YouMovies Subscription Plans
            </h1>
            <p className="text-gray-300 text-sm sm:text-lg md:text-xl mt-4 max-w-3xl mx-auto">
              Enjoy unlimited access to a vast collection of movies with our flexible subscription plans.  
              Choose a plan that suits your entertainment needs and start streaming today!
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="flex justify-center p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-4">
              
              {/* Basic Plan */}
              <div className="bg-gray-900 border-netflix-red border-2 rounded-xl shadow-lg text-white text-center transition transform hover:scale-105 h-[550px] flex flex-col justify-between">
                <header className="bg-white py-4 rounded-t-xl">
                  <h1 className="text-2xl text-black font-semibold">Basic</h1>
                </header>
                <div className="flex flex-col flex-grow justify-center p-8">
                  <h1 className="font-extrabold text-6xl text-netflix-red">$25</h1>
                  <p className="text-lg mt-2">One-Time Payment</p>
                  <div className="my-6 text-left mx-auto w-full max-w-xs">
                    <h2 className="text-xl font-semibold mb-3">Features:</h2>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>✔ Access to 1,000+ Movies</li>
                      <li>✔ HD Streaming</li>
                      <li>✔ No Ads</li>
                      <li>✔ Watch on 1 Device</li>
                    </ul>
                  </div>
                  <button className="mt-auto px-6 py-3 bg-netflix-red text-white rounded-lg font-semibold hover:bg-red-700 transition">
                    Choose Plan
                  </button>
                </div>
              </div>

              {/* Standard Plan (Shining Middle Plan) */}
              <div className="relative group bg-gray-900 border-netflix-red border-2 rounded-xl shadow-lg text-white text-center transition transform hover:scale-105 lg:scale-110 h-[600px] flex flex-col justify-between overflow-hidden">
    {/* Shine Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out transform -translate-x-full group-hover:translate-x-full"></div>

    <header className="bg-white py-4 rounded-t-xl">
      <h1 className="text-2xl text-black font-semibold">Standard</h1>
    </header>
    <div className="flex flex-col flex-grow justify-center p-8 relative z-10">
      <h1 className="font-extrabold text-7xl text-netflix-red">$50</h1>
      <p className="text-lg mt-2">One-Time Payment</p>
      <div className="my-6 text-left mx-auto w-full max-w-xs">
        <h2 className="text-xl font-semibold mb-3">Features:</h2>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>✔ Access to 5,000+ Movies</li>
          <li>✔ Full HD Streaming</li>
          <li>✔ No Ads & Offline Download</li>
          <li>✔ Watch on 3 Devices</li>
          <li>✔ Early Access to New Releases</li>
        </ul>
      </div>
      <button className="mt-auto px-6 py-3 bg-netflix-red text-white rounded-lg font-semibold hover:bg-red-700 transition">
        Choose Plan
      </button>
    </div>
  </div>

              {/* Premium Plan */}
              <div className="bg-gray-900 border-netflix-red border-2 rounded-xl shadow-lg text-white text-center transition transform hover:scale-105 h-[550px] flex flex-col justify-between">
                <header className="bg-white py-4 rounded-t-xl">
                  <h1 className="text-2xl text-black font-semibold">Premium</h1>
                </header>
                <div className="flex flex-col flex-grow justify-center p-8">
                  <h1 className="font-extrabold text-6xl text-netflix-red">$75</h1>
                  <p className="text-lg mt-2">One-Time Payment</p>
                  <div className="my-6 text-left mx-auto w-full max-w-xs">
                    <h2 className="text-xl font-semibold mb-3">Features:</h2>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>✔ Access to 10,000+ Movies</li>
                      <li>✔ 4K Ultra HD + HDR Streaming</li>
                      <li>✔ No Ads, Offline Download & Family Sharing</li>
                      <li>✔ Watch on Unlimited Devices</li>
                      <li>✔ Exclusive Content & Behind-the-Scenes</li>
                      <li>✔ VIP Customer Support</li>
                    </ul>
                  </div>
                  <button className="mt-auto px-6 py-3 bg-netflix-red text-white rounded-lg font-semibold hover:bg-red-700 transition">
                    Choose Plan
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <Faq />
        <NewsLetter />
        <Footer />
      </div>

     
    
    </>
  );
};

export default Pricing;
