import React from "react";
import Banner from "./Home/Banner";
import BestDeals from "./Home/BestDeals";
import TopProducts from "./Home/TopProducts";
import PopolarSearch from "./Home/PopolarSearch";
import Features from "./Home/Features";
import FlashSale from "./Home/FlashSale";
import HotSale from "./Home/HotSale";
import RecentViewed from "./Home/RecentViewed";
import { fetcher } from "../instance/api";
import Categoires from "./Home/Category";
import Newsletter from "./Home/Newsletter";



const MainPage = async () =>
{
  const banners = await fetcher({
    path: "/api/banners"
  })
  const bestDeals = await fetcher({
    path: "/api/products?public=true&limit=8"
  })
  const topProducts = await fetcher({
    path: "/api/products?top_ten=true&top_ten=true&limit=10&random=true"
  })
  const popular = await fetcher({
    path: "/api/products?popular=true&limit=5&random=true"
  })
  const flash_sale = await fetcher({
    path: "/api/products?flash_sale=true&limit=10&random=true"
  })
  const hot_sales = await fetcher({
    path: "/api/products?hot_sales=true&limit=20&random=true"
  })
  const categories = await fetcher({
    path: "/api/categories?status=true"
  })
  return (
    <div>
      <Banner
        banners={banners}
      />
      <Categoires category={categories} />
      {/* New Arrivals */}
      <BestDeals
        products={bestDeals.products}
      />
      <TopProducts
        products={topProducts.products}
      />
      <PopolarSearch
        products={popular.products}
      />
      <Features />
      <FlashSale products={flash_sale.products} />
      <HotSale products={hot_sales.products} />
      <RecentViewed data={hot_sales.products} mt={"lg:mt-20"} />
      <Newsletter />
    </div>
  );
};

export default MainPage;
