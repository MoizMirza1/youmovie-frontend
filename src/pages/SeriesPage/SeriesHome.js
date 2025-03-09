import React from 'react'
import SeriesBanner from '../../components/Series/SeriesBanner'
import ResponsiveNavbar from '../../components/Movies/MovieResponsiveNavbar'
import Footer from '../../components/Home/Footer'
import ContinueSeries from '../../components/Series/ContinueSeries'
import PopularSeries from '../../components/Series/PopularSeries'
import UpcomingSeries from '../../components/Series/UpcomingSeries'
import SeriesBannerTwo from '../../components/Series/SeriesBannertwo'
import DisneyFeaturedSeries from '../../components/Series/DisneyFeatured'
import HotstarFeaturedMoviesAndSeries from '../../components/Series/HotstarSeries'
import GenreSeries from '../../components/Series/GenreSeries'
import HindiSeries from '../../components/Series/HindiSeries'
import Newsletter from '../../components/Home/Newsletter'

const SeriesHome = () => {
  return (
    <div>
        <ResponsiveNavbar/>
        <SeriesBanner/>
        <ContinueSeries/>
        <PopularSeries/>
        <UpcomingSeries/>
        <SeriesBannerTwo/>
        <DisneyFeaturedSeries/>
        <HotstarFeaturedMoviesAndSeries/>
        <GenreSeries/>
        <HindiSeries/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default SeriesHome