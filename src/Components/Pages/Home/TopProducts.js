"use client";

import StarProvider from "@/Components/Shared/StarProvider";
import { topProducts } from "@/Components/Shared/breackpoints";
import { api, localURL } from "@/Components/instance/api";
import { ChevronLeft, ChevronRight, Taka } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
  const [products, setProducts] = useState([])
  useEffect(() => {
    api.get('/api/products/quary/topTen')
      .then((res) => {
        setProducts(res.data)
      })
  }, [])
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
            className="lg:h-[500px]"
          >
            {
              products.slice(0, 10).map((product) => (
                <SwiperSlide key={product._id} >
                  <TopProductCard data={product} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default TopProducts;

export const TopProductCard = ({ data }) => {
  return (
    <Link href={`/products/${data?._id}`} className="w-full h-full lg:max-h-[520px] max-h-[340px] lg:max-w-[330px] bg-white rounded-[30px] overflow-hidden shadow-xl shadow-stone-100">
      <div className="max-h-[314px] w-full rounded-[30px] bg-stone-300 shadow-md shadow-stone-100 overflow-hidden">
        <Image
          className="w-full h-full"
          src={
            localURL + data?.cover
          }
          width={500}
          height={400}
          alt=""
        />
      </div>

      <div className="flex lg:flex-col flex-col-reverse lg:p-7 p-4">
        <h2 className="text-black text-sm lg:text-2xl font-semibold">
          {data?.name?.slice(0, 30) +
            " " +
            "..."}
        </h2>
        <div className="flex lg:flex-row flex-col-reverse lg:items-center items-start mt-3 lg:mt-4 justify-between">
          <div className="flex items-center">
            <div className="text-orange-500 text-sm lg:text-xl font-semibold">
              <Taka />
              {data?.price - (data?.discount_percentage / 100 * data?.price)}
            </div>
            <div className="text-neutral-400 ml-3 lg:text-base text-xs font-normal">
              <del>
                <Taka /> {data?.price}
              </del>
            </div>
          </div>
          <div className="lg:ml-2 ml-0 lg:mb-0 mb-2">
            <StarProvider number={5} />
          </div>
        </div>
      </div>
    </Link>
  );
};
