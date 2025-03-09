import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick"; 

const reviewsData = [
  { id: 1, name: "John Doe", rating: 5, review: "Absolutely love YouMovies! Great selection and quality." },
  { id: 2, name: "Jane Smith", rating: 5, review: "Good service, but wish there were more classic movies." },
  { id: 3, name: "Alex Johnson", rating: 5, review: "Best streaming platform! Worth every penny." },
  { id: 4, name: "Michael Lee", rating: 5, review: "Amazing experience, but needs a better search function." },
  { id: 5, name: "Sarah Kim", rating: 5, review: "I’m a huge fan of the interface, so easy to use." },
];

const UserReviews = () => {
  const [reviews, setReviews] = useState(reviewsData);
  const [newReview, setNewReview] = useState({ name: "", rating: 0, review: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.rating && newReview.review) {
      setReviews([...reviews, { ...newReview, id: reviews.length + 1 }]);
      setNewReview({ name: "", rating: 0, review: "" });
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "20px", 
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="bg-black  text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center">User Reviews</h2>
        <hr className="my-2 border-0 h-0.5 w-24 mx-auto bg-gradient-to-r from-black/80 via-netflix-red to-black/80" />

        {/* Review Slider */}
        <div className="mt-6">
        <Slider {...settings} className="gap-x-4">
  {reviews.map(({ id, name, rating, review }) => (
    <div key={id} className="w-full px-4">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg h-full flex flex-col justify-between min-h-[200px]">
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="flex text-netflix-red">
              {[...Array(rating)].map((_, i) => <FaStar key={i} />)}
            </div>
          </div>
          <p className="mt-3 text-gray-300">{review}</p>
        </div>
      </div>
    </div>
  ))}
</Slider>

        </div>

        {/* Review Form */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
  <h3 className="text-xl font-semibold text-netflix-red">Leave a Review</h3>
  <form className="mt-4" onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Your Name"
      className="w-full p-2 rounded bg-gray-700 text-white border-none mb-4"
      value={newReview.name}
      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
    />
    <select
      className="w-full p-2 rounded bg-gray-700 text-white border-none mb-4"
      value={newReview.rating}
      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
    >
      <option value="0">Select Rating</option>
      {[1, 2, 3, 4, 5].map((star) => (
        <option key={star} value={star}>{`${star} Stars`}</option>
      ))}
    </select>
    <textarea
      placeholder="Write your review..."
      className="w-full p-2 rounded bg-gray-700 text-white border-none mb-4"
      rows="3"
      value={newReview.review}
      onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
    />
    <button className="w-full bg-netflix-red p-2 rounded text-white font-bold hover:bg-red-700 transition">
      Submit Review
    </button>
  </form>
</div>

      </div>
    </div>
  );
};

export default UserReviews;
