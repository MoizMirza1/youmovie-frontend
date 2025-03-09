import React from 'react'
import Watch from '../../components/Watch/Watch'
import ResponsiveNavbar from '../../components/Movies/MovieResponsiveNavbar'
import Footer from '../../components/Home/Footer'
import Cast from '../../components/Watch/Cast'
import { useParams } from "react-router-dom";
import SimilarMovie from '../../components/Watch/SimilarMovie'
import Reviews from '../../components/SeriesWatch/Reviews'


const WatchPage = () => {
  const { movieId } = useParams(); 
  return (
    <div>
        <ResponsiveNavbar/>
        <Watch />
        <Cast movieId={movieId}/>
        <SimilarMovie movieId={movieId}/>
        <Reviews/>
        
        <Footer/>
    </div>
  )
}

export default WatchPage