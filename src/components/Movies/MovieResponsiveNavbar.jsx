// ResponsiveNavbar.js
import React, { useState, useEffect } from "react";

import MovieNavbar from "../Movies/MovieNavbar"
import MobMovieNav from "../Movies/MobMovieNav";

const ResponsiveNavbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Here, we're using 640px as the breakpoint (Tailwind's "sm")
      setIsMobile(window.innerWidth < 640);
    };

    // Check on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <>{isMobile ? <MobMovieNav/> : <MovieNavbar/>}</>;
};

export default ResponsiveNavbar;
