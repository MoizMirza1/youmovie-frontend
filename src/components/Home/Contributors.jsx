import React from 'react';

const contributors = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Frontend Developer',
    image: 'https://randomuser.me/api/portraits/men/1.jpg', // You can replace it with real images
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Backend Developer',
    image: 'https://randomuser.me/api/portraits/women/1.jpg', // You can replace it with real images
  },
  {
    id: 3,
    name: 'Alice Johnson',
    role: 'UI/UX Designer',
    image: 'https://randomuser.me/api/portraits/women/2.jpg', // You can replace it with real images
  },
  {
    id: 4,
    name: 'Bob Lee',
    role: 'DevOps Engineer',
    image: 'https://randomuser.me/api/portraits/men/2.jpg', // You can replace it with real images
  },
];

const Contributors = () => {
  return (
    <div className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Adjusted Heading Section */}
        <div className="text-center mb-12">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold font-bebas">
            Our Contributors
          </h1>
          <hr className="my-2 border-0 h-0.5 w-24 mx-auto bg-gradient-to-r from-black/80 via-netflix-red to-black/80" />
        </div>

        {/* Contributors Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {contributors.map((contributor) => (
            <div
              key={contributor.id}
              className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center"
            >
              <img
                src={contributor.image}
                alt={contributor.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-white text-xl font-semibold">{contributor.name}</h3>
              <p className="text-gray-400 text-sm">{contributor.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contributors;
