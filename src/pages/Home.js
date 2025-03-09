import React from 'react'
import Banner from '../components/Home/Banner'
import Navbar from '../components/Home/Navbar'
import About from '../components/Home/About'
import Genre from '../components/Home/Genre'
import Feature from '../components/Home/Feature'
import ProfileFeature from '../components/Home/ProfileFeauture'
import Service from '../components/Home/Service'
import Tech from '../components/Home/Tech'
import Faq from "../components/Home/Faq";
import UserReviews  from '../components/Home/Reviews.jsx'
import Trending from '../components/Home/Trending.jsx'
import NewsLetter from '../components/Home/Newsletter.jsx'
import Footer from '../components/Home/Footer.jsx'
import Contributors from '../components/Home/Contributors.jsx'
import ResponsiveNavbar from '../components/Home/ResponsiveNavbar.jsx'

const HomePage = () => {
  return (
    <div>
      <ResponsiveNavbar/>
      <Banner/>
      <About/>
      <Trending/>
      <Genre/>
      <Feature/>
      <ProfileFeature/>
      <Tech/>
      <Faq/>
      <Service/>
      <UserReviews/>
      <Contributors/>
      <NewsLetter/>
      <Footer/>
 



    </div>
  )
}

export default HomePage