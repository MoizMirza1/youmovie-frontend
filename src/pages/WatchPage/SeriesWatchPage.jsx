import React from 'react'
import Watch from '../../components/SeriesWatch/Watch'
import ResponsiveNavbar from '../../components/Movies/MovieResponsiveNavbar'
import Footer from '../../components/Home/Footer'
import SeriesCast from '../../components/SeriesWatch/SeriesCast'
import { useParams } from "react-router-dom";
import Reviews from '../../components/SeriesWatch/Reviews'

const SeriesWatchPage = () => {
    const { movieId } = useParams(); 
  return (
    <div>
        <ResponsiveNavbar/>
        <Watch/>
        <SeriesCast />
        <Reviews/>
        <Footer/>
    </div>
  )
}

export default SeriesWatchPage