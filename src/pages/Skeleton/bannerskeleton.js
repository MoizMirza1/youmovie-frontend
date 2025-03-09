import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BannerSkeleton = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Skeleton */}
      <Skeleton
        className="absolute inset-0"
        height="100%"
        width="100%"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Main Content Skeleton */}
      <div className="absolute top-0 left-0 z-20 w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 py-8 text-center">
        {/* Header Skeleton */}
        <Skeleton height={40} width={300} />
        <Skeleton height={4} width={96} style={{ marginTop: '0.5rem' }} />

        {/* Main Title Skeleton */}
        <Skeleton height={60} width={500} style={{ marginTop: '1rem' }} />

        {/* Subtitle or Second Line (if needed) */}
        <Skeleton height={60} width={500} style={{ marginTop: '0.5rem' }} />

        {/* Description Skeleton */}
        <Skeleton height={20} width={600} count={3} style={{ marginTop: '1rem' }} />

        {/* Watch Now Button Skeleton */}
        <Skeleton height={50} width={200} style={{ marginTop: '2rem' }} />
      </div>

      {/* Movie Info Section Skeleton (shown on larger screens) */}
      <div className="absolute left-4 sm:left-8 bottom-16 sm:bottom-40 p-4 bg-black/60 rounded-md max-w-xs z-20 hidden sm:block">
        <Skeleton height={30} width={200} />
        <Skeleton height={20} width={150} style={{ marginTop: '0.5rem' }} />
        <Skeleton height={20} width={150} style={{ marginTop: '0.5rem' }} />
        <Skeleton height={20} width={150} style={{ marginTop: '0.5rem' }} />
        <Skeleton height={20} width={150} style={{ marginTop: '0.5rem' }} />
      </div>
    </div>
  );
};

export default BannerSkeleton;
