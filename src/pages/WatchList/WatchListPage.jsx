import React from 'react'
import Watchlist from '../../components/Profile/WatchList'
import ResponsiveNavbar from '../../components/Home/ResponsiveNavbar'
import Footer from '../../components/Home/Footer'

const WatchListPage = () => {
  return (
    <div>
              <ResponsiveNavbar/>
        <Watchlist />
        <Footer/>
    </div>
  )
}

export default WatchListPage