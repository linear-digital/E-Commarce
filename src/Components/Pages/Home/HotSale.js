'use client'

import HotSaleCard from "@/Components/Shared/Cards/HotSaleCard";
import { ChevronLeft, ChevronRight, Fire } from "@/assets/icons";
import React from "react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HotSale = () => {
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
  return (
    <div className="container mx-auto mt-32">
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
          className="w-full min-h-[650px]"
        >
          <SwiperSlide>
            <HotSaleCard />
          </SwiperSlide>
          <SwiperSlide>
            <HotSaleCard />
          </SwiperSlide>
          <SwiperSlide>
            <HotSaleCard />
          </SwiperSlide>
          <SwiperSlide>
            <HotSaleCard />
          </SwiperSlide>
          <SwiperSlide>
            <HotSaleCard />
          </SwiperSlide>
          <SwiperSlide>
            <HotSaleCard />
          </SwiperSlide>
          <SwiperSlide>
            <HotSaleCard />
          </SwiperSlide>
          <SwiperSlide>
            <HotSaleCard />
          </SwiperSlide>
          <SwiperSlide>
            <HotSaleCard />
          </SwiperSlide>
          <SwiperSlide>
            <HotSaleCard />
          </SwiperSlide>
          <SwiperSlide>
            <HotSaleCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HotSale;
