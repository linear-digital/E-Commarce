"use client";


import { topProducts } from "@/Components/Shared/breackpoints";
import { api, localURL } from "@/Components/instance/api";
import { ChevronLeft, ChevronRight, Taka } from "@/assets/icons";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const RecentViewed = ({ mt, count, title, data, text }) => {
  const swiperParams = {
    navigation: {
      nextEl: ".custom-next-button-history",
      prevEl: ".custom-prev-button-history",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true, // Enable clickable pagination bullets
      renderBullet: function (index, className) {
        // Custom pagination bullet content
        return `<span key="${index}" class="${className}"></span>`;
      },
    },
  };
  const [products, setProducts] = useState([])
  useEffect(() => {
    (
      async () => {
        const ipfrom = await axios.get('https://api64.ipify.org/?format=json')
        if (ipfrom.data.ip !== "") {
          api.post(`/api/products/get/ip`, {
            address: ipfrom.data.ip
          })
            .then(res => setProducts(res.data))
        }
      }
    )()
  }, [])
  return (
    <div className={`container mx-auto ${mt ? mt : "lg:mt-32"}  ${text === "sm" ? "mt-5" : "p-4 mt-1"} lg:p-0`}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="ml-2 text-black lg:text-3xl text-2xl font-semibold ">
            {
              title ? title : "Recently viewed"
            }
          </div>
        </div>
        <div className="flex items-center">
          <button className="custom-prev-button-history">
            <ChevronLeft w={"w-5 text-primary"} h={"w-4"} />
          </button>
          <button className="ml-2 custom-next-button-history">
            <ChevronRight w={"w-5 text-primary"} h={"w-4"} />
          </button>
        </div>
      </div>

      <div className="mt-10 w-full">
        <Swiper
          breakpoints={topProducts}
          slidesPerView={count ? count : 5}
          loop={true}
          spaceBetween={20}
          {...swiperParams}
          centeredSlides={false}
          autoplay={{
            delay: 7500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay, FreeMode]}
          className="w-full"
        >
          {
            (data ? data : products)?.map((data) => {
              return <SwiperSlide key={data?._id}>
                <RecentCard data={data} text={text} />
              </SwiperSlide>
            })
          }
        </Swiper>
      </div>
    </div>
  );
};

export default RecentViewed;

const RecentCard = ({ data, text }) => {
  return <Link href={`/products/${data?._id}`} className="flex flex-col lg:flex-row lg:h-[139px] h-auto cursor-pointer">
    <div className="h-full lg:max-h-[139px] min-h-[139px] max-h-[80px] min-w-[60px] lg:min-w-[120px] bg-gray-300 rounded-xl"
    >
      <Image
        className="rounded-xl w-full h-full max-h-[150px] lg:max-h-auto"
        src={ data?.cover} alt={""} width={200} height={200} />
    </div>
    <div className="p-2 ml-3 flex flex-col lg:justify-between ">
      <div className="text-[#e30613] text-center mb-2 block lg:hidden text-xl mt-1 font-semibold">
        <Taka /> {data?.price - (data?.discount_percentage / 100 * data?.price)}
      </div>
      <h2 className={`text-black text-sm lg:text-${text ? text : "base"} font-medium`}>
        {
          text === "sm" ? data?.name?.slice(0, 35) + " ...." : data?.name?.slice(0, 60)
        }
      </h2>
      <div className="pb-2">
        <div className="text-[#e30613] text-xl mt-1 hidden lg:block font-semibold">
          <Taka />
          {data?.price - (data?.discount_percentage / 100 * data?.price)}
        </div>
      </div>
    </div>
  </Link>
}
