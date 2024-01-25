"use client";

import FlashSaleCard from "@/Components/Shared/Cards/FlashSaleCard";
import { flashSale } from "@/Components/Shared/breackpoints";
import { api } from "@/Components/instance/api";
import { ChevronLeft, ChevronRight } from "@/assets/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const FlashSale = ({products}) => {
  const { deviceType } = useSelector((state) => state.Tools);
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
  const [time, setTime] = useState({
    days: 7,
    hours: 10,
    minutes: 59,
    seconds: 30
  });

  // const timer = () => {
  //   if (time.seconds > 0) {
  //     setTimeout(() => {
  //       setTime({
  //         ...time,
  //         seconds: time.seconds - 1
  //       });
  //     }, 1000);
  //   }
  //   else if (time.seconds === 0) {
  //     setTime({
  //       ...time,
  //       minutes: time.minutes - 1,
  //       seconds: 59
  //     });
  //   }
  // }
  // timer()
  return (
    <div className="lg:mt-32 mt-10 ">
      <div
        className="container mx-auto lg:max-h-[371px] min-h-[371px] rounded-xl overflow-hidden relative "
        style={{
          backgroundImage:
            "url('http://localhost:3000/_next/image?url=%2Fimages%2Fbanner%2Fbanner-2.jpeg&w=1920&q=75')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className=" bg-[#FF7020F0] p-4 lg:p-0 overflow-hidden w-full h-full min-h-[371px] flex lg:flex-row flex-col lg:items-center">
          <div className="flex flex-col justify-center lg:ml-16">
            <div className="text-white lg:text-5xl text-3xl font-semibold ">Flash Sale</div>
            <div className="lg:w-[369px] text-white text-base font-normal  leading-7 mt-2">
            Brace yourself for surprise flash deals that add an element of thrill to your shopping experience. Uncover unbeatable prices on your favorite gadgets but be quick, these deals won't wait!
            </div>
            <div className="text-white lg:mt-10 mt-5 lg:text-[40px] text-[30px] font-bold  leading-7">
              0{time?.days} : {time?.hours} : {time?.minutes} : {time?.seconds}
            </div>
          </div>
          {/* Product Slider  */}
          <section className="lg:ml-10 mt-5 lg:mt-0 w-full">
            <div>
              <Swiper
                breackpoint={flashSale}
                freeMode={true}
                spaceBetween={30}
                slidesPerView={deviceType === "mobile" ? 1 : 3}
                loop={true}
                {...swiperParams}
                centeredSlides={deviceType === "mobile" ? false : true}
                autoplay={{
                  delay: 7500,
                  disableOnInteraction: false,
                }}
                modules={[Navigation, Pagination, Autoplay]}
                className="w-full"
              >
                {
                  products?.map(product => (
                    <SwiperSlide key={product?._id} className="">
                      <FlashSaleCard data={product} />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </div>
            <div className="flex lg:mt-10 mt-6 items-center">
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
              <button className="btn-primary absolute bottom-[40px] lg:bottom-[50px] right-[50px] btn-link no-underline lg:ml-[600px]">
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
