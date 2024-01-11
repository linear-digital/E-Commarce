"use client";

import Image from "next/image";
import React from "react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  const swiperParams = {
    navigation: {
      nextEl: ".custom-next-button-banner",
      prevEl: ".custom-prev-button-banner",
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
    <section className="relative lg:px-0 px-4">
      <div className="flex max-h-[634px] items-center w-full relative mt-[30px]">
       
        <div className="absolute left-0 top-0 h-full opacity-70 hover:opacity-90 w-[50px] lg:flex hidden items-center">
          <div className="h-[500px] custom-prev-button-banner  bar-left-banner w-full bg-[#BFBEFF]"></div>
        </div>
        <section className="container mx-auto rounded-xl">
          <Swiper
            {...swiperParams}
            spaceBetween={30}
            centeredSlides={true}
            effect={"fade"}
            autoplay={{
              delay: 7500,
              disableOnInteraction: false,
            }}
            modules={[Navigation, EffectFade, Pagination, Autoplay]}
            className="h-full w-full rounded-lg"
          >
            <SwiperSlide className="cursor-pointer">
              <Image
                src={"/images/banner/18899194.png"}
                width={1920}
                height={634}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/images/banner/banner-2.jpeg"}
                width={1920}
                height={634}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/images/banner/banner-1.jpeg"}
                width={1920}
                height={634}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/images/banner/banner-2.jpeg"}
                width={1920}
                height={634}
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </section>

        <div className="absolute right-0 top-0 opacity-70 hover:opacity-90 h-full w-[50px] lg:flex hidden items-center">
          <div className="h-[500px] custom-next-button-banner bar-right-banner w-full bg-[#FFD6BE]"></div>
        </div>
      </div>
      <div className={`swiper-pagination`} />
    </section>
  );
};

export default Banner;
