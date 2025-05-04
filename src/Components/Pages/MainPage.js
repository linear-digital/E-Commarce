import React from "react";
import Banner from "./Home/Banner";
import BestDeals from "./Home/BestDeals";
import TopProducts from "./Home/TopProducts";
import PopolarSearch from "./Home/PopolarSearch";
import Features from "./Home/Features";
import FlashSale from "./Home/FlashSale";
import HotSale from "./Home/HotSale";
import RecentViewed from "./Home/RecentViewed";
import { api, fetcher } from "../instance/api";
import Categoires from "./Home/Category";
import Newsletter from "./Home/Newsletter";



const MainPage = async () =>
{
  const bestDeals = await fetcher({
    path: "/api/products?public=true"
  })
  const topProducts = await fetcher({
    path: "/api/products?public=true&top_ten=true"
  })
  const popular = await fetcher({
    path: "/api/products?public=true&popular=true"
  })
  const flash_sale = await fetcher({
    path: "/api/products?public=true&flash_sale=true"
  })
  const hot_sales = await fetcher({
    path: "/api/products?public=true&hot_sales=true"
  })

  return (
    <div>
      <Banner
      />
      <Categoires />
      <BestDeals
        products={bestDeals}
      />
      <TopProducts
        products={topProducts}
      />
      <PopolarSearch
        products={popular}
      />
      <Features />
      <FlashSale products={flash_sale} />
      <HotSale products={hot_sales} />
      <RecentViewed mt={"lg:mt-20"} />
      <Newsletter />
    </div>
  );
};

export default MainPage;
