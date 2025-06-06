"use client";

import HotSaleCard from "@/Components/Shared/Cards/HotSaleCard";
import ProductSM from "@/Components/Shared/Cards/ProductSM";
import { hotSale } from "@/Components/Shared/breackpoints";
import { ChevronLeft, ChevronRight, Fire } from "@/assets/icons";
import React from "react";
import { useSelector } from "react-redux";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HotSale = ({ products, count }) =>
{
  const { deviceType } = useSelector((state) => state.Tools);
  const swiperParams = {
    navigation: {
      nextEl: ".custom-next-button-hot",
      prevEl: ".custom-prev-button-hot",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true, // Enable clickable pagination bullets
      renderBullet: function (index, className)
      {
        // Custom pagination bullet content
        return `<span class="${className}"></span>`;
      },
    },
  };
  return (
    <div className="container mx-auto lg:mt-32 mt-10 lg:px-0 px-4 ">
      <div className="flex justify-between">
        <div className="flex items-center justify-between">
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
      {
        products?.length === 0 && (
          <div className="flex mt-5 items-center justify-center">
            <h2 className=" text-primary lg:text-xl text-lg font-semibold">
              No Product Found
            </h2>
          </div>
        )
      }
      <div className="mt-10 w-full">
        <Swiper
          breakpoints={hotSale}
          slidesPerView={count ? count : 5}
          loop={true}
          spaceBetween={deviceType === "mobile" ? 10 : 30}
          {...swiperParams}
          centeredSlides={false}
          autoplay={{
            delay: 7500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay, FreeMode]}
          className="w-full h-auto"
        >
          {
            products?.map((data) => <SwiperSlide key={data._id}>
              <ProductSM data={data} />
            </SwiperSlide>)
          }
        </Swiper>
      </div>
    </div>
  );
};

export default HotSale;
