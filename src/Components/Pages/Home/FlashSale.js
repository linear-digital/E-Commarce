"use client";

import FlashSaleCard from "@/Components/Shared/Cards/FlashSaleCard";
import { ChevronLeft, ChevronRight } from "@/assets/icons";
import React from "react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const FlashSale = () => {
  const swiperParams = {
    navigation: {
      nextEl: ".custom-next-button-flash",
      prevEl: ".custom-prev-button-flash",
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
    <div className="mt-32">
      <div
        className="container mx-auto max-h-[371px] min-h-[371px] rounded-xl overflow-hidden relative"
        style={{
          backgroundImage:
            "url('http://localhost:3000/_next/image?url=%2Fimages%2Fbanner%2Fbanner-2.jpeg&w=1920&q=75')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className=" bg-[#FF7020F0] overflow-hidden w-full h-full min-h-[371px] flex items-center">
          <div className="flex flex-col justify-center ml-16">
            <div className="text-white text-5xl font-semibold ">Flash Sale</div>
            <div className="w-[369px] text-white text-base font-normal  leading-7 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </div>
            <div className="text-white mt-10 text-[40px] font-bold  leading-7">
              05 : 42 : 19 : 54
            </div>
          </div>
          {/* Product Slider  */}
          <section className="ml-10">
            <div>
              <Swiper
                slidesPerView={4}
                spaceBetween={40}
                loop={true}
                {...swiperParams}
                centeredSlides={false}
                autoplay={{
                  delay: 7500,
                  disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay, Pagination]}
              >
                <SwiperSlide className="max-w-[450px] min-w-[448px]">
                  <FlashSaleCard />
                </SwiperSlide>
                <SwiperSlide className="max-w-[450px] min-w-[448px]">
                  <FlashSaleCard />
                </SwiperSlide>
                <SwiperSlide className="max-w-[450px] min-w-[448px]">
                  <FlashSaleCard />
                </SwiperSlide>
                <SwiperSlide className="max-w-[450px] min-w-[448px]">
                  <FlashSaleCard />
                </SwiperSlide>
                <SwiperSlide className="max-w-[450px] min-w-[448px]">
                  <FlashSaleCard />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="flex mt-10 items-center">
              <div className="flex items-center">
                <button className="origin-top-left rotate-180 w-12 h-12 relative custom-prev-button-flash">
                  <div className="w-8 h-8 left-0 top-0 absolute origin-top-left rotate-180 bg-white bg-opacity-0 rounded-full border border-white   flex justify-center items-center">
                    <ChevronLeft w={"w-4 text-white"} h={"w-4"} />
                  </div>
                </button>
                <button className="origin-top-left opacity-80 ml-3 rotate-180 w-12 h-12 relative custom-next-button-flash">
                  <div className="w-8 h-8 left-0 top-0 absolute origin-top-left rotate-180 bg-white bg-opacity-0 rounded-full border border-white   flex justify-center items-center">
                    <ChevronRight w={"w-4 text-white"} h={"w-4"} />
                  </div>
                </button>
              </div>
              <button className="btn-primary absolute bottom-[50px] right-[50px] btn-link no-underline ml-[600px]">
                Learn more
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
