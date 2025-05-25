'use client'
import { Fire } from "@/assets/icons";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Manubar = () =>
{
  const path = usePathname();
  if (path.includes("admin")) {
    return <nav className="lg:flex hidden items-start mt-3 container mx-auto h-[50px] ">
      <ul className="flex items-center ">
        <li className="px-5 font-normal capitalize" >
          <Link href={'/admin/dashboard'}>Dashboard</Link>
        </li>
         <li className="px-5 font-normal capitalize" >
          <Link href={'/admin/transactions'}>Transactions</Link>
        </li>
        <li className="px-5 font-normal capitalize" >
          <Link href={'/admin/products'}>Products</Link>
        </li>
        <li className="px-5 font-normal capitalize" >
          <Link href={'/admin/brands'}>Brands</Link>
        </li>
       
        <li className="px-5 font-normal capitalize" >
          <Link href={'/admin/categories'}>Categories</Link>
        </li>
        <li className="px-5 font-normal capitalize" >
          <Link href={'/admin/orders'}>Orders</Link>
        </li>
      </ul>
    </nav>
  }
  return (
    <nav className="lg:flex hidden items-start mt-3 container mx-auto h-[50px] ">
      <ul className="flex items-center ">
        <li className="px-5 font-normal capitalize" >
          <Link href={'/'}>Home</Link>
        </li>
        {/* <div className="dropdown dropdown-hover">
          <div tabIndex="0" role="button" >Categories</div>
          <ul tabIndex="0" className="dropdown-content menu bg-base-100 z-20 w-[250px] p-2 shadow-lg rounded-lg">
            {
              categories?.map((category, index) =>
              {
                return (
                  <li className="font-normal capitalize" key={index}>
                    <Link href={`/categories/${category?.name}`}>{category?.name}</Link>
                  </li>
                )
              })
            }
          </ul>
        </div> */}
        <li className="px-5 font-normal capitalize" >
          <Link href={'/categories'}>Categories</Link>
        </li>
        <li className="px-5 font-normal capitalize" >
          <Link href={'/brands'}>Brands</Link>
        </li>
      </ul>

      <Link href={'/offer/hot_sales'} className="flex items-center ml-10">
        <Fire />
        <span className="ml-3 font-semibold">HOT DEALS</span>
      </Link>
    </nav>
  );
};

export default Manubar;
