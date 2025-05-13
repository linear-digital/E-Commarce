"use client";
import { Taka } from "@/assets/icons";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setRepatch } from "@/redux/Tools/action";
import { api } from "@/Components/instance/api";

const ProductSM = ({ data }) =>
{
  const product = data;
  const { currentUser } = useSelector((state) => state.User);
  const { device } = useSelector((state) => state.Tools);
  const dispatch = useDispatch();
  const [inView, setIsView] = React.useState(false);
  const price =
    product?.price - (product?.discount_percentage / 100) * product?.price;
  const quantity = 1;
  const addToCart = async () =>
  {
    if (currentUser || device) {
      try {
        const cartItem = {
          email: currentUser?.email || "Guest",
          device_id: currentUser?.email ? "user" : device,
          product_id: product._id,
          variant: product?.variant[0]?.text,
          price,
          price_total: price * quantity,
          image: product?.cover,
          product_name: product?.name,
          quantity: quantity,
          product_code: product?.code,
        };
        const res = await api.post("/api/cart", cartItem);
        dispatch(setRepatch(res));
        toast.success("Your Product Added To Cart");
        document.getElementById("my_modal_4")?.showModal();
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    } else {
      setShow("login");
      toast.error("Please Login First");
    }
  };
  return (
    <div
      onMouseEnter={() => setIsView(true)}
      onMouseLeave={() => setIsView(false)}
      className="flex flex-col h-auto product-sm"
    >
      <Link
        href={`/categories/${data?.category}`}
        className="text-sm mt-2 text-primary hover:underline"
      >
        {data?.category}
      </Link>
      <div className="flex h-[60px] items-start">
        <h2 className="text-[16px] my-2 font-medium">
          {data?.name?.slice(0, 50)}
        </h2>
      </div>
      <div className="w-full h-[300px] border-b border-gray-50  relative rounded-lg overflow-hidden">
        <Image
          className="rounded-xl w-full h-full object-cover object-center bg-[#fbfcfc] p-2"
          src={data?.cover || "/images/default.png"}
          alt={""}
          fill
        />
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
          exit={{ opacity: 0, y: -100 }}
          className="flex  absolute bottom-0 left-0 right-0 justify-center product-de items-center flex-col"
        >
          <Link
            href={`/products/${data?._id}`}
            className="bg-white py-[5px] text-primary text-sm px-3 rounded"
          >
            <span className="mr-2">View Details</span>{" "}
            <FontAwesomeIcon icon={faArrowRightLong} />
          </Link>
          <button
            className="bg-primary py-[5px] text-white text-sm px-3 rounded mt-4"
            onClick={addToCart}
          >
            <span className="mr-2">Add To Cart</span>{" "}
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
        </motion.div>
      </div>
      <div className="flex items-center gap-x-2 mt-3">
        <span className="text-[#e30613] text-lg font-semibold">
          <Taka />
          {data?.sale_price -
            (data?.discount_percentage / 100) * data?.sale_price}
        </span>
        {data?.discount_percentage > 0 && (
          <del className="text-sm text-gray-500">
            <Taka />
            {data?.sale_price}
          </del>
        )}
      </div>
      <p className="text-[13px] mt-1 text-black h-[35px]">
        {data?.productDescription?.slice(0, 65)}
      </p>
    </div>
  );
};

export default ProductSM;
