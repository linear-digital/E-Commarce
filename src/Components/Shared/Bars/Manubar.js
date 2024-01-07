import { Fire } from "@/assets/icons";
import Link from "next/link";
import React from "react";
import { navigations } from "./data";

const Manubar = () => {
    
  return (
    <nav className="flex items-start mt-3 container mx-auto h-[50px]">
      <ul className="flex items-center ">
        {navigations.map((navigation, index) => {
          return (
            <li className="px-5 font-normal capitalize" key={index}>
              <Link href={navigation.href}>{navigation.name}</Link>
            </li>
          );
        })}
      </ul>

      <button className="flex items-center ml-10">
        <Fire />
        <span className="ml-3 font-semibold">HOT DEALS</span>
      </button>
    </nav>
  );
};

export default Manubar;
