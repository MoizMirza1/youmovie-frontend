import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import notFoundAnimation from "../Assets/animations/404.json"; // Adjust the path as needed

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-black px-4">
      {/* Lottie Animation */}
      <div className="w-80 md:w-96">
        <Lottie animationData={notFoundAnimation} loop={true} />
      </div>

    
      <p className="mt-2 text-orange-200 text-lg md:text-xl">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
