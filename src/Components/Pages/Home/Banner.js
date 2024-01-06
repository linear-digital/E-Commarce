"use client";

import Image from "next/image";
import React from "react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  const swiperParams = {
    navigation: {
      nextEl: ".custom-next-button",
      prevEl: ".custom-prev-button",
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
    <section className="relative">
      <div className="flex h-[634px] items-center w-full relative mt-[30px]">
        <div className="absolute left-0 top-0 h-full opacity-70 hover:opacity-90 w-[50px] flex items-center">
          <div className="h-[500px] custom-prev-button  bar-left w-full bg-[#BFBEFF]"></div>
        </div>
        <section className="container mx-auto rounded-xl">
          <Swiper
            {...swiperParams}
            spaceBetween={30}
            centeredSlides={true}
            effect={"fade"}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Navigation, EffectFade, Pagination, Autoplay]}
            className="h-full w-full rounded-lg"
          >
            <SwiperSlide>
              <Image
                src={"/images/banner/banner-1.jpeg"}
                width={1920}
                height={634}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/images/banner/banner-2.jpeg"}
                width={1920}
                height={634}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/images/banner/banner-1.jpeg"}
                width={1920}
                height={634}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/images/banner/banner-2.jpeg"}
                width={1920}
                height={634}
              />
            </SwiperSlide>
          </Swiper>
        </section>

        <div className="absolute right-0 top-0 opacity-70 hover:opacity-90 h-full w-[50px] flex items-center">
          <div className="h-[500px] custom-next-button bar-right w-full bg-[#FFD6BE]"></div>
        </div>
      </div>
      <div className={`swiper-pagination`} />
    </section>
  );
};

export default Banner;
