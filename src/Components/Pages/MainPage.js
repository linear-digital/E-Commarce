import React from 'react'
import Banner from './Home/Banner'
import BestDeals from './Home/BestDeals'
import TopProducts from './Home/TopProducts'
import PopolarSearch from './Home/PopolarSearch'

const MainPage = () => {
  return (
    <div className='pb-52'>
      <Banner />
      <BestDeals />
      <TopProducts />
      <PopolarSearch />
    </div>
  )
}

export default MainPage