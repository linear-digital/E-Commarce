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

const RecentViewed = () => {
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
        return `<span class="${className}"></span>`;
      },
    },
  };
  const [products, setProducts] = useState([])
  useEffect(() => {
    (
      async () => {
        const ipfrom = await axios.get('https://api64.ipify.org/?format=json')
        api.get(`/api/products/quary/recentView?ip=${ipfrom.data.ip}`)
          .then(res => setProducts(res.data))
      }
    )()
  }, [])
  return (
    <div className="container mx-auto lg:mt-32 mt-14 p-4 lg:p-0">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="ml-2 text-black lg:text-3xl text-2xl font-semibold ">
            Recently viewed
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
          slidesPerView={5}
          loop={true}
          spaceBetween={30}
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
            products?.map((data) => {
              return <SwiperSlide key={data?._id}>
                <RecentCard data={data} />
              </SwiperSlide>
            })
          }
        </Swiper>
      </div>
    </div>
  );
};

export default RecentViewed;

const RecentCard = ({ data }) => {
  return <Link href={`/products/${data?._id}`} className="flex flex-col lg:flex-row lg:h-[139px] h-auto cursor-pointer">
    <div className="h-full lg:max-h-[139px] min-h-[139px] max-h-[80px] min-w-[60px] lg:min-w-[120px] bg-gray-300 rounded-xl"
    >
      <Image
        className="rounded-xl w-full h-full"
        src={localURL + data?.cover} alt={""} width={200} height={200} />
    </div>
    <div className="p-2 ml-3 flex flex-col lg:justify-between ">
      <div className="text-orange-500 text-center mb-2 block lg:hidden text-xl mt-1 font-semibold">
        <Taka /> {data?.price - (data?.discount_percentage / 100 * data?.price)}
      </div>
      <h2 className=" text-black text-sm lg:text-base font-medium">
        {
          data?.name?.slice(0, 60)
        }
      </h2>
      <div className="pb-2">
        <div className="text-orange-500 text-xl mt-1 hidden lg:block font-semibold">
          <Taka />
          {data?.price - (data?.discount_percentage / 100 * data?.price)}
        </div>
      </div>
    </div>
  </Link>
}
