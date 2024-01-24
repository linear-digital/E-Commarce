import { Star, Taka } from "@/assets/icons";
import Image from "next/image";
import React from "react";
import StarProvider from "../StarProvider";
import { api, localURL } from "@/Components/instance/api";
import Link from "next/link";
// import { useRouter } from "next/navigation";
const getReview = async (id) => {
  const res = await api.get(`/api/reviews/id/${id}`)
  return res.data
}

const ProductSM = async ({ data }) => {
  const initReview = getReview(data._id)
  const [reviews] = await Promise.all([initReview])
  const avarage = reviews?.reduce((acc, review) => acc + review?.rating, 0) / reviews?.length
  return (
    <Link href={`/products/${data?._id}`} className="flex flex-col lg:flex-row lg:h-[139px] h-auto cursor-pointer">
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
          <div style={{ visibility: avarage > 0 ? 'visible' : 'hidden' }} className="mt-1 flex items-center">
            <StarProvider number={avarage} />
            <span className="ml-2">({reviews?.length})</span>
          </div>
          
        </div>
        
      </div>
    </Link>
  );
};

export default ProductSM;
