"use client";

import HotSaleCard from "@/Components/Shared/Cards/HotSaleCard";
import ProductSM from "@/Components/Shared/Cards/ProductSM";
import { topProducts } from "@/Components/Shared/breackpoints";
import { ChevronLeft, ChevronRight, Fire } from "@/assets/icons";
import React from "react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const RecentViewed = () => {
  const swiperParams = {
    navigation: {
      nextEl: ".custom-next-button-history",
      prevEl: ".custom-prev-button-history",
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
  return (
    <div className="container mx-auto lg:mt-32 mt-14 p-4 lg:p-0">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="ml-2 text-black lg:text-3xl text-2xl font-semibold ">
            Recently viewed
          </div>
        </div>
        <div className="flex items-center">
          <button className="custom-prev-button-history">
            <ChevronLeft w={"w-5 text-primary"} h={"w-4"} />
          </button>
          <button className="ml-2 custom-next-button-history">
            <ChevronRight w={"w-5 text-primary"} h={"w-4"} />
          </button>
        </div>
      </div>

      <div className="mt-10 w-full">
        <Swiper
          breakpoints={topProducts}
          slidesPerView={5}
          loop={true}
          spaceBetween={30}
          {...swiperParams}
          centeredSlides={false}
          autoplay={{
            delay: 7500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay, FreeMode]}
          className="w-full"
        >
          <SwiperSlide>
            <ProductSM />
          </SwiperSlide>
          <SwiperSlide>
            <ProductSM />
          </SwiperSlide>
          <SwiperSlide>
            <ProductSM />
          </SwiperSlide>
          <SwiperSlide>
            <ProductSM />
          </SwiperSlide>
          <SwiperSlide>
            <ProductSM />
          </SwiperSlide>
          <SwiperSlide>
            <ProductSM />
          </SwiperSlide>
          <SwiperSlide>
            <ProductSM />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default RecentViewed;
