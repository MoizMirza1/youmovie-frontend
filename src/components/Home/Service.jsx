import React from 'react';
import { MdLocalMovies, MdChat } from 'react-icons/md';
import { FaFilm, FaUserAlt } from 'react-icons/fa';

const services = [
  {
    id: 1,
    title: 'Stream Movies',
    description: 'Enjoy a vast library of movies anytime, anywhere.',
    icon: <MdLocalMovies className="text-5xl text-netflix-red" />,
  },
  {
    id: 2,
    title: 'Exclusive Originals',
    description: 'Watch YouMovies exclusive original series and films.',
    icon: <FaFilm className="text-5xl text-netflix-red" />,
  },
  {
    id: 3,
    title: 'Chat Support',
    description: 'Get real-time assistance for all your queries.',
    icon: <MdChat className="text-5xl text-netflix-red" />,
  },
  {
    id: 4,
    title: 'User Profiles',
    description: 'Create and customize profiles for personalized recommendations.',
    icon: <FaUserAlt className="text-5xl text-netflix-red" />,
  },
];

const Service = () => {
  return (
    <div className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
      <div className="text-center p-20 flex flex-col justify-center items-center">
          <h1 className="text-white text-xl sm:text-3xl md:text-4xl font-medium font-bebas">
            YouMovies Services
          </h1>
          <hr className="my-2 border-0 h-0.5 w-full max-w-xs bg-gradient-to-r from-black/80 via-netflix-red to-black/80" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-800 rounded-lg p-6 transition transform hover:scale-105 ease-in-out duration-300"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
