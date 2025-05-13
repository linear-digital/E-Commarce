"use client";

import StarProvider from "@/Components/Shared/StarProvider";
import { topProducts } from "@/Components/Shared/breackpoints";
import { ChevronLeft, ChevronRight, Taka } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const TopProducts = ({ products }) =>
{
  const swiperParams = {
    navigation: {
      nextEl: ".custom-next-button-top",
      prevEl: ".custom-prev-button-top",
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
    <div className="bg-[#F6F6F6] w-full h-auto lg:py-0 py-5 lg:h-[630px] flex items-center lg:mt-32 mt-10">
      <section className="container mx-auto flex flex-col lg:flex-row items-center overflow-hidden">
        <div className="px-5">
          <h2 className="lg:w-[238px] text-black text-2xl lg:text-3xl font-semibold">
            Top 10 Selected Products On the Week
          </h2>
          <div className="flex lg:mt-10 mt-5 items-center">
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
        {
          products?.length === 0 ?
          <div className="flex w-full mt-5 items-center justify-center">
          <h2 className=" text-primary lg:text-xl text-lg font-semibold">
            No Product Found
          </h2>
        </div>
            :

            <div className="w-full h-full lg:ml-10 mt-5 lg:p-0 p-4">
              <Swiper
                freeMode={true}
                breakpoints={topProducts}
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
                className="h-auto"
              >
                {
                  products?.map((product) => (
                    <SwiperSlide key={product._id} >
                      <TopProductCard data={product} />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </div>
        }
      </section>
    </div>
  );
};

export default TopProducts;

export const TopProductCard = ({ data }) =>
{
  return (
    <Link href={`/products/${data?._id}`} className="">
      <div className="h-[350px] rounded-xl object-cover object-center relative overflow-hidden">
<Image
        className="object-cover "
        src={
          data?.cover
        }
fill
        alt={data?.name}
      />
      </div>
      
      <div className="flex lg:flex-col flex-col-reverse pt-4">
        <h2 className="text-black text-sm lg:text-xl font-semibold">
          {data?.name?.slice(0, 30) +
            " " +
            "..."}
        </h2>
        <div className="flex items-center mt-2">
          <div className="text-[#e30613] text-sm lg:text-base font-semibold">
            <Taka />
            {data?.price - (data?.discount_percentage / 100 * data?.price)}
          </div>
          <div className="text-neutral-400 ml-2 lg:text-sm text-xs font-normal">
            <del className="flex items-center">
              <Taka /> <span>{data?.price}</span>
            </del>
          </div>
          <div className="lg:ml-2 ml-0 lg:mb-0 mb-2 flex items-center">
            <StarProvider number={5} />
          </div>
        </div>

      </div>
    </Link>
  );
};
