import React from 'react';
import backgroundImage from '../../Assets/Images/HomepageImages/NewsletterImage.jpg';

const Newsletter = () => {
  return (
    <div className='bg-black py-12 max-w-full'>
      <div className='mx-auto max-w-[96em] px-5 sm:px-10 md:px-20'>
        <div 
          className='relative bg-cover bg-center h-96 sm:h-[450px] md:h-96'
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* Black overlay */}
          <div className='absolute inset-0 bg-black opacity-50'></div>
          
          {/* Content on top of the overlay aligned to the left */}
          <div className='relative z-10 flex items-center h-full text-white px-5 sm:px-10 md:px-10'>
            <div className='max-w-md w-full p-6 space-y-6'>
              <h1 className='text-4xl sm:text-5xl font-bold text-red-600'>
                Join Our Newsletter
              </h1>
              <p className='text-base sm:text-lg text-left'>
                Stay updated with our latest news, tips, and special offers!
              </p>
              {/* Input field for email */}
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded'>
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
