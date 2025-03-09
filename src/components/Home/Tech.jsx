import React from 'react';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiExpress, SiSocketdotio, SiCloudinary, SiStripe } from 'react-icons/si';

const techs = [
  {
    id: 1,
    name: 'React',
    icon: <FaReact style={{ color: '#61dafb' }} className="text-5xl" />,
  },
  {
    id: 2,
    name: 'Node.js',
    icon: <FaNodeJs style={{ color: '#539E43' }} className="text-5xl" />,
  },
  {
    id: 3,
    name: 'Tailwind CSS',
    icon: <SiTailwindcss style={{ color: '#38B2AC' }} className="text-5xl" />,
  },
  {
    id: 4,
    name: 'MongoDB',
    icon: <SiMongodb style={{ color: '#4DB33D' }} className="text-5xl" />,
  },
  {
    id: 5,
    name: 'Express',
    icon: <SiExpress style={{ color: '#000000' }} className="text-5xl" />,
  },
  {
    id: 6,
    name: 'Socket.IO',
    icon: <SiSocketdotio style={{ color: '#010101' }} className="text-5xl" />,
  },
  {
    id: 7,
    name: 'Cloudinary',
    icon: <SiCloudinary style={{ color: '#F47B20' }} className="text-5xl" />,
  },
  {
    id: 8,
    name: 'Stripe',
    icon: <SiStripe style={{ color: '#6772e5' }} className="text-5xl" />,
  },
];

const Tech = () => {
  return (
    <div className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Adjusted Heading Section */}
        <div className="text-center mb-12">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold font-bebas">
            Our Tech Stack
          </h1>
          <hr className="my-2 border-0 h-0.5 w-24 mx-auto bg-gradient-to-r from-black/80 via-netflix-red to-black/80" />

        </div>

        {/* Tech Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {techs.map((tech) => (
            <div
              key={tech.id}
              className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center"
            >
              <div className="mb-4">{tech.icon}</div>
              <h3 className="text-white text-xl font-semibold">{tech.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tech;
