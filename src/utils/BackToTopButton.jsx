import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
    onClick={scrollToTop}
    className={`fixed bottom-5 right-5 w-16 h-16 bg-netflix-red text-white rounded-full shadow-lg transition-opacity flex items-center justify-center ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}
  >
    <FaArrowUp size={20} />
  </button>
  );
};

export default BackToTopButton;
