"use client";

import StarProvider from "@/Components/Shared/StarProvider";
import { ChevronLeft, ChevronRight } from "@/assets/icons";
import Image from "next/image";
import React from "react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const TopProducts = () => {
  const swiperParams = {
    navigation: {
      nextEl: ".custom-next-button-top",
      prevEl: ".custom-prev-button-top",
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
    <div className="bg-[#F6F6F6] w-full h-[630px] flex items-center mt-32">
      <section className="container mx-auto flex items-center overflow-hidden">
        <div>
          <h1 className="w-[238px] text-black text-3xl font-semibold">
            Top 10 Selected Products On the Week
          </h1>
          <div className="flex mt-10 items-center">
            <button className="origin-top-left rotate-180 w-12 h-12 relative custom-prev-button-top">
              <div className="w-12 h-12 left-0 top-0 absolute origin-top-left rotate-180 bg-white bg-opacity-0 rounded-full border border-black   flex justify-center items-center">
                <ChevronLeft w={"w-6"} h={"w-6"} opacity={20} />
              </div>
            </button>
            <button className="origin-top-left opacity-80 ml-5 rotate-180 w-12 h-12 relative custom-next-button-top">
              <div className="w-12 h-12 left-0 top-0 absolute origin-top-left rotate-180 bg-white bg-opacity-0 rounded-full border border-black   flex justify-center items-center">
                <ChevronRight w={"w-6"} h={"w-6"} />
              </div>
            </button>
          </div>
        </div>
        {/* Slider Side  */}
        <div className="w-full h-full ml-10">
          <Swiper
            freeMode={true}
            slidesPerView={4}
            loop={true}
            spaceBetween={30}
            {...swiperParams}
            centeredSlides={false}
            autoplay={{
              delay: 7500,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay, FreeMode]}
            className="h-[500px]"
          >
            <SwiperSlide>
              <TopProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <TopProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <TopProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <TopProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <TopProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <TopProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <TopProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <TopProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <TopProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <TopProductCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default TopProducts;

export const TopProductCard = () => {
  return (
    <div className="w-full h-full max-h-[486px] max-w-[348px] bg-white rounded-[30px] overflow-hidden shadow-xl shadow-stone-100">
      <div className="max-h-[314px] w-full rounded-[30px] bg-stone-300 shadow-md shadow-stone-100 overflow-hidden">
        <Image
          className="w-[348px] h-[314px] bg-stone-300"
          src={
            "https://www.bdshop.com/pub/media/catalog/product/cache/eaf695a7c2edd83636a0242f7ce59484/7/1/baseus-3-in-1-universal-multi-usb-cable-camlt-su01.jpg"
          }
          width={348}
          height={314}
        />
      </div>

      <div className="flex flex-col p-7">
        <h1 className="text-black text-2xl font-semibold">
          {"Baseus 3 In 1 Universal Multi USB Cable (CAMLT-SU01)".slice(0, 20) +
            " " +
            "..."}
        </h1>
        <h4 className="text-neutral-400 mt-1 text-lg font-medium ">
          4.3m sold
        </h4>
        <div className="flex items-center mt-6 justify-between">
          <div className="flex items-center">
            <div className="text-orange-500 text-xl font-semibold">
              $ 300.98
            </div>
            <div className="text-neutral-400 ml-3 text-base font-normal">
              $350.99
            </div>
          </div>
          <div className="ml-2">
            <StarProvider number={5} />
          </div>
        </div>
      </div>
    </div>
  );
};
