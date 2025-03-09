import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { FreeMode, Autoplay } from "swiper/modules";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ActorList = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});

  // Fetch actors only once (memoized function)
  const fetchActors = useCallback(async () => {
    try {
      const response = await fetch("https://youmovie-production.up.railway.app/api/tmdb/actors/popular");
      const data = await response.json();

      if (data) {
        setActors(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching actors:", error);
    }
  }, []);

  useEffect(() => {
    fetchActors();
  }, [fetchActors]);

  // Memoized actors list
  const cachedActors = useMemo(() => actors, [actors]);

  // Handle image load state
  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="w-full bg-black py-10 px-6">
      <h2 className="text-3xl font-bold text-white text-left mb-6">Popular Actors</h2>

      {loading ? (
        <Swiper
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 15 },
            480: { slidesPerView: 3, spaceBetween: 20 },
            640: { slidesPerView: 4, spaceBetween: 20 },
            768: { slidesPerView: 5, spaceBetween: 25 },
            1024: { slidesPerView: 7, spaceBetween: 25 },
            1280: { slidesPerView: 10, spaceBetween: 30 },
          }}
          modules={[FreeMode, Autoplay]}
          className="w-full"
        >
          {/* Show skeleton cards while data is loading */}
          {Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide key={index} className="!w-[130px]">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md">
                <Skeleton height={130} width="100%" />
                <div className="p-2 text-center">
                  <Skeleton width={80} />
                  <Skeleton width={50} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          loop={cachedActors.length > 20}
          rewind={cachedActors.length <= 20}
          loopedSlides={15}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          freeMode={true}
          centeredSlides={cachedActors.length > 10}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 15 },
            480: { slidesPerView: 3, spaceBetween: 20 },
            640: { slidesPerView: 4, spaceBetween: 20 },
            768: { slidesPerView: 5, spaceBetween: 25 },
            1024: { slidesPerView: 7, spaceBetween: 25 },
            1280: { slidesPerView: 10, spaceBetween: 30 },
          }}
          modules={[FreeMode, Autoplay]}
          className="w-full"
        >
          {cachedActors.map((actor) => (
            <SwiperSlide key={actor.id} className="!w-[130px]">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md">
                {/* Image Skeleton Loader inside the same card */}
                {!imageLoaded[actor.id] && <Skeleton height={130} width="100%" />}

                <img
                  src={actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : "/default-avatar.png"}
                  alt={actor.name}
                  className={`w-full h-[130px] object-cover ${
                    !imageLoaded[actor.id] ? "hidden" : "block"
                  }`}
                  onLoad={() => handleImageLoad(actor.id)}
                />

                <div className="p-2 text-center">
                  <h3 className="text-white text-sm font-semibold">
                    {imageLoaded[actor.id] ? actor.name : <Skeleton width={80} />}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {imageLoaded[actor.id] ? "Actor" : <Skeleton width={50} />}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ActorList;
