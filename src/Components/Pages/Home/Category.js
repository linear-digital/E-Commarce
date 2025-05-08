'use client'
import React from "react";
import { categoryBreackpoint } from "@/Components/Shared/breackpoints";
import { useSelector } from "react-redux";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
const Categoires = ({category}) =>
{
    const { deviceType } = useSelector((state) => state.Tools);
    if(!category) return null
    return (
        <main className="container mx-auto lg:mt-32 mt-10 px-4 lg:px-0">
            <h2 className=" text-black lg:text-3xl text-2xl font-semibold">
                Shop by Category
            </h2>
            <Swiper
                breackpoint={categoryBreackpoint}
                freeMode={true}
                spaceBetween={30}
                slidesPerView={deviceType === "mobile" ? 2 : 6}
                loop={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: true,
                }}
                modules={[Navigation, Pagination, Autoplay]}
                className="w-full mt-10"
            >
                {
                    category?.map((deal, index) => (
                        <SwiperSlide key={index} >
                            <CategoryCard data={deal} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </main>
    );
};

export default Categoires;


export const CategoryCard = ({ data }) =>
{
    const router = useRouter()
    const navigateToCategory = () =>
    {
        router.push(`/categories/${data?.name}`)
    }
    return <div className="bg-slate-100 h-[250px] flex flex-col items-center justify-center rounded cursor-pointer"
        onClick={navigateToCategory}
    >
        <div className="h-full flex items-center justify-center">
            <img src={data?.image} width={90} height={90}
                className="w-[90px] h-[90px] object-contain rounded-full bg-gray-400"
            />
        </div>
        <div className="pb-4 ml-3 flex flex-col lg:justify-between ">
            <h3 className="text-center text-primary">
                {data?.count} + Item
            </h3>
            <h2 className="mt-2 text-black text-sm lg:text-[18px] font-semibold">
                {
                    data?.name?.slice(0, 15)
                }
            </h2>
        </div>
    </div>
}