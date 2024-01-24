"use client";

import { api, localURL } from "@/Components/instance/api";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
  const [banners, setBanners] = useState([])

  useEffect(() => {
    api.get('/api/banners')
      .then(res => setBanners(res.data))
  }, [])

  return (
    <section className="relative lg:px-0 px-4">
      <div className="flex max-h-[634px] items-center w-full relative mt-[30px]">

        <section className="container mx-auto rounded-xl">
          <Swiper
            {...swiperParams}
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            modules={[Navigation, EffectFade, Pagination, Autoplay]}
            className="h-full w-full rounded-lg overflow-hidden"
          >
            {
              banners?.map((banner, index) => (
                <SwiperSlide key={index}>
                  <Link href={banner.link}>
                    <Image
                      src={localURL + banner.image}
                      width={1350}
                      height={500}
                      alt=""
                    />
                  </Link>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </section>

      </div>
      {/* <div className={`swiper-pagination`} /> */}
    </section>
  );
};

export default Banner;
