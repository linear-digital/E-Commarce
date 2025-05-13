
import ProductSM from "@/Components/Shared/Cards/ProductSM";
import Link from "next/link";
import React from "react";

const PopolarSearch = ({ products }) =>
{
  return (
    <div className="lg:mt-32 mt-10 p-4 lg:p-0">
      <section className="container mx-auto">
        <div className="flex items-center justify-between">
          <h2 className=" text-black lg:text-3xl text-2xl font-semibold">
            Popular Search
          </h2>
          <Link href="/offer/popular" className=" text-primary text-lg font-semibold">
            See All
          </Link>
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
        <div className="lg:grid hidden lg:grid-cols-5 grid-cols-2 lg:gap-y-10 gap-y-3 gap-x-2 lg:mt-10 mt-5">
          {
            products?.map((deal, index) => (
              <ProductSM key={index} data={deal} />
            ))
          }
        </div>
      </section>
    </div>
  );
};

export default PopolarSearch;
