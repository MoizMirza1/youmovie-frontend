import React, { useState } from "react";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([
    { id: 1, user: "Ali Raza", rating: 5, comment: "Absolutely loved this movie! The storyline was gripping from start to finish." },
    { id: 2, user: "Sarah Ahmed", rating: 4, comment: "Great performances by the actors, but the ending felt a bit rushed." },
    { id: 3, user: "Hamza Khan", rating: 5, comment: "A must-watch! The cinematography and soundtrack were top-notch." },
    { id: 4, user: "Ayesha Noor", rating: 3, comment: "Decent film, but could have had better character development." },
 
  ]);

  const [newReview, setNewReview] = useState({ user: "", rating: 0, comment: "" });

  const handleReviewSubmit = () => {
    if (newReview.user && newReview.rating && newReview.comment) {
      setReviews([...reviews, { ...newReview, id: Date.now() }]);
      setNewReview({ user: "", rating: 0, comment: "" });
    }
  };

  return (
    <div className="bg-gray-900 text-white py-12 px-6 sm:px-12 lg:px-24">
      <h2 className="text-4xl font-extrabold text-center text-red-500 mb-8">User Reviews</h2>

      {/* Reviews List - Vertical */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-start gap-4">
            <FaUserCircle className="text-5xl text-gray-400" />
            <div>
              <h3 className="text-lg font-semibold">{review.user}</h3>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) =>
                  i < review.rating ? (
                    <FaStar key={i} className="text-yellow-400 text-xl" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-500 text-xl" />
                  )
                )}
              </div>
              <p className="text-gray-300">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Form */}
      <div className="mt-12 bg-gray-800 p-6 rounded-xl shadow-lg max-w-lg mx-auto">
        <h3 className="text-2xl font-semibold text-center mb-4">Add Your Review</h3>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={newReview.user}
          onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
        />
        <textarea
          placeholder="Your Review"
          className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          rows="3"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        />
        <div className="flex items-center mb-4">
          <span className="text-lg font-semibold mr-2">Rating:</span>
          {[...Array(5)].map((_, i) => (
            <button key={i} onClick={() => setNewReview({ ...newReview, rating: i + 1 })}>
              {i < newReview.rating ? <FaStar className="text-yellow-400 text-xl" /> : <FaRegStar className="text-gray-500 text-xl" />}
            </button>
          ))}
        </div>
        <button
          onClick={handleReviewSubmit}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md transition duration-300"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewsSection;
