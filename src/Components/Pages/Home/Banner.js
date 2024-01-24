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

        <section className="container mx-auto rounded-xl">
          <Swiper
            {...swiperParams}
            spaceBetween={30}
            centeredSlides={true}
            effect={"fade"}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, EffectFade, Pagination, Autoplay]}
            className="h-full w-full rounded-lg overflow-hidden"
          >
            <SwiperSlide className="cursor-pointer">
              <Image
                src={"/images/banner/18899194.png"}
                width={1350}
                height={500}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/images/banner/banner-2.jpeg"}
                width={1350}
                height={500}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/images/banner/banner-1.jpeg"}
                width={1350}
                height={500}
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

      </div>
      <div className={`swiper-pagination`} />
    </section>
  );
};

export default Banner;
