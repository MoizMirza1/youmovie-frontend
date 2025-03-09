import React from "react";
import { useParams } from "react-router-dom";
import Video from "../../components/Video/Video";
import ContinueWatching from "../../components/Movies/ContinueWatching";
import UpcomingMovies from "../../components/Movies/UpcomingMovies";
import StreamingProvider from "../../components/Video/StreamingProvider";
import Footer from "../../components/Home/Footer";

const VideoPage = () => {
  const { movieId } = useParams(); // Get movieId from the URL

  return (
    <div>
      
      <Video />
      <StreamingProvider movieId={movieId} /> 
      <ContinueWatching />
      <UpcomingMovies />
      <Footer/>
    </div>
  );
};

export default VideoPage;
