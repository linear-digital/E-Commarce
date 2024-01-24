"use client";

import HotSaleCard from "@/Components/Shared/Cards/HotSaleCard";
import { hotSale, topProducts } from "@/Components/Shared/breackpoints";
import { api } from "@/Components/instance/api";
import { ChevronLeft, ChevronRight, Fire } from "@/assets/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HotSale = () => {
  const { deviceType } = useSelector((state) => state.Tools);
  const swiperParams = {
    navigation: {
      nextEl: ".custom-next-button-hot",
      prevEl: ".custom-prev-button-hot",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true, // Enable clickable pagination bullets
      renderBullet: function (index, className) {
        // Custom pagination bullet content
        return `<span class="${className}"></span>`;
      },
    },
  };
  const [products, setProducts] = useState([])
  useEffect(() => {
    api.get('/api/products/quary/hotSale')
      .then(res => setProducts(res.data))
  }, [])
  return (
    <div className="container mx-auto lg:mt-32 mt-10 lg:px-0 px-4 ">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Fire w={22} h={23} />
          <div className="ml-2 text-black text-3xl font-semibold ">
            Hot Sale!
          </div>
        </div>
        <div className="flex items-center">
          <button className="custom-prev-button-hot">
            <ChevronLeft w={"w-5 text-primary"} h={"w-4"} />
          </button>
          <button className="ml-2 custom-next-button-hot">
            <ChevronRight w={"w-5 text-primary"} h={"w-4"} />
          </button>
        </div>
      </div>

      <div className="mt-10 w-full">
        <Swiper
          breakpoints={hotSale}
          slidesPerView={5}
          loop={true}
          spaceBetween={deviceType === "mobile" ? 10 : 30}
          {...swiperParams}
          centeredSlides={false}
          autoplay={{
            delay: 7500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay, FreeMode]}
          className="w-full lg:min-h-[650px]"
        >
          {
            products.map((data) => <SwiperSlide key={data._id}>
              <HotSaleCard data={data} />
            </SwiperSlide>)
          }
        </Swiper>
      </div>
    </div>
  );
};

export default HotSale;
