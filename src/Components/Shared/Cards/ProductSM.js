import { Star, Taka } from "@/assets/icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import StarProvider from "../StarProvider";
import { api, localURL } from "@/Components/instance/api";
import Link from "next/link";
// import { useRouter } from "next/navigation";


const ProductSM = ({ data }) => {

  const [reviews, setReviews] = useState([])
  useEffect(() => {
    (
      async () => {
        const res = await api.get(`/api/reviews/id/${data._id}`)
        setReviews(res.data)
      }
    )()
  }, [data])
  const avarage = reviews?.reduce((acc, review) => acc + review?.rating, 0) / reviews?.length
  return (
    <Link href={`/products/${data?._id}`} className="flex flex-col lg:flex-row lg:h-[139px] h-auto cursor-pointer">
      <div className="h-full lg:max-h-[139px] min-h-[139px] max-h-[80px] min-w-[60px] lg:min-w-[120px] bg-gray-300 rounded-xl"
      >
        <Image
          className="rounded-xl w-full h-full object-cover"
          src={localURL + data?.cover} alt={""} width={200} height={200} />
      </div>
      <div className="p-2 ml-3 flex flex-col lg:justify-between ">
        <div className="text-[#e30613] text-center mb-2 block lg:hidden text-xl mt-1 font-semibold">
          <Taka /> {data?.price - (data?.discount_percentage / 100 * data?.price)}
        </div>
        <h2 className=" text-black text-sm lg:text-base font-medium">
          {
            data?.name?.slice(0, 60)
          }
        </h2>
        <div className="pb-2">
          <div className="text-[#e30613] text-xl mt-1 hidden lg:block font-semibold">
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
