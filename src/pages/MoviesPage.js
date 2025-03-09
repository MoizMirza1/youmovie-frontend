import React from 'react'
import Footer from '../components/Home/Footer.jsx'
import MovieBanner from '../components/Movies/MovieBanner.jsx'
import PopularMovies from '../components/Movies/PopularMovies.jsx'
import ContinueWatching from '../components/Movies/ContinueWatching.jsx'
import UpcomingMovies from '../components/Movies/UpcomingMovies.jsx'
import MovieBannertwo from '../components/Movies/MovieBannertwo.jsx'
import ActorsList from '../components/Movies/ActorList.jsx'
import Genre from '../components/Home/Genre'
import Featured from '../components/Movies/Featured.jsx'
import MarvelShowcase from '../components/Movies/MarvelShowcase.jsx'
import NewsLetter from '../components/Home/Newsletter.jsx'
import ResponsiveNavbar from '../components/Movies/MovieResponsiveNavbar.jsx'

const MoviesPage = () => {
  return (
    <div>
          <ResponsiveNavbar/>
            <MovieBanner/>
            <ContinueWatching/>
            <PopularMovies/>
            <UpcomingMovies/>
            <MovieBannertwo/>
            <Featured/>
            <Genre/>
            <MarvelShowcase/>
            <ActorsList/>
            <NewsLetter/>
          <Footer/>
    </div>
  )
}

export default MoviesPage