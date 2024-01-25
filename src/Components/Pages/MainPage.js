import React from "react";
import Banner from "./Home/Banner";
import BestDeals from "./Home/BestDeals";
import TopProducts from "./Home/TopProducts";
import PopolarSearch from "./Home/PopolarSearch";
import Features from "./Home/Features";
import FlashSale from "./Home/FlashSale";
import HotSale from "./Home/HotSale";
import RecentViewed from "./Home/RecentViewed";
import Newsletter from "./Home/Newsletter";

const MainPage = () => {
  return (
    <div>
      <Banner />
      <BestDeals />
      <TopProducts />
      <PopolarSearch />
      <Features />
      <FlashSale />
      <HotSale />
      <RecentViewed mt={"lg:mt-20"}/>
      <Newsletter />
    </div>
  );
};

export default MainPage;
