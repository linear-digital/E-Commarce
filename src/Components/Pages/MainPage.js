import React from "react";
import Banner from "./Home/Banner";
import BestDeals from "./Home/BestDeals";
import TopProducts from "./Home/TopProducts";
import PopolarSearch from "./Home/PopolarSearch";
import Features from "./Home/Features";
import FlashSale from "./Home/FlashSale";
import HotSale from "./Home/HotSale";
import RecentViewed from "./Home/RecentViewed";
import { api } from "../instance/api";

const getAllProducts = async () => {
  const res = await api.get('/api/products/all')
  const banners = await api.get('/api/banners')
  const quary = (await api.get('/api/products/quary/bestDeals')).data

  return {
    products: res.data,
    banners: banners.data,
    deals: quary.bestDeals,
    topTen: quary.topTen,
    popular: quary.popular,
    hotSales: quary.hotSales,
    flashSale: quary.flashSale,
    newArrival: quary.newArrival
  }
}

const MainPage = async () => {
  const initialProducts = getAllProducts()
  const [data] = await Promise.all([initialProducts])
  return (
    <div>
      <Banner
      />
      <BestDeals
      />
      <TopProducts
      />
      <PopolarSearch
      />
      <Features />
      <FlashSale />
      <HotSale />
      <RecentViewed mt={"lg:mt-20"} />
      {/* <Newsletter /> */}
    </div>
  );
};

export default MainPage;
