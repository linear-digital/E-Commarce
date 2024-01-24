'use client'

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Multiple from "./Card/Multiple";

const Categoryes = () => {
  const { category } = useSelector((state) => state.Tools);

  return (
    <div className="py-10 px-7 hidden lg:block">
      <h3 className="text-black text-xl font-semibold ">
        Show all categories
      </h3>
      <div className="w-full max-h-[450px] mt-5 min-h-[450px] overflow-y-auto">
        <ul className="menu rounded-box">
          {
            category.map((item, index) => (
              <Multiple data={item} key={index} index={index} />
            ))
          }
        </ul>

      </div>
    </div>
  );
};

export default Categoryes;

