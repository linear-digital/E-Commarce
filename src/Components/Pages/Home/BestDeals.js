"use client";
import ProductSM from "@/Components/Shared/Cards/ProductSM";
import React from "react";
import { useSelector } from "react-redux";

const BestDeals = () => {
  const { deviceType } = useSelector((state) => state.Tools);

  return (
    <main className="container mx-auto lg:mt-32 mt-10 px-4 lg:px-0">
      <h1 className=" text-black lg:text-3xl text-2xl font-semibold">
        Best Deals 
      </h1>
      <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-y-10 gap-y-3 gap-x-4 lg:gap-x-2 mt-10">
        {deviceType === "mobile" && (
          <>
            <ProductSM />
            <ProductSM />
            <ProductSM />
            <ProductSM />
          </>
        )}
        {deviceType === "desktop" && (
          <>
            <ProductSM />
            <ProductSM />
            <ProductSM />
            <ProductSM />
            <ProductSM />
            <ProductSM />
            <ProductSM />
            <ProductSM />
          </>
        )}
      </div>
    </main>
  );
};

export default BestDeals;
