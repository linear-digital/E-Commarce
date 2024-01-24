"use client";
import StarProvider from "@/Components/Shared/StarProvider";
import { Eye } from "@/assets/icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewsStatictic from "@/app/products/Card/ReviewsStatictic";
import Specification from "@/app/products/Card/Specification";
import Description from "@/app/products/Card/Details";
import Reviews from "@/app/products/Card/Reviews";
import { api, localURL } from "@/Components/instance/api";
import Loader from "@/Components/Shared/Loader";

const link =
  "https://dropshop.com.bd/wp-content/uploads/2023/11/Fantech-MAXFIT67-MK858-RGB-Pre-Lubed-Gateron-Milky-Yellow-Switch-Mechanical-Hotswap-Keyboard.webp";

const page = ({ params }) => {
  const swiperParams = {
    navigation: {
      nextEl: ".custom-next-button-details",
      prevEl: ".custom-prev-button-details",
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
  const id = params.id;
  const [zoom, setZoom] = useState(false);
  const [product, setProduct] = useState({});
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  //states for cart
  const [variant, setVariant] = useState("");
  const addToCart = () => {
    const cartItem = {
      product,
      variant: variant || product?.variant[0],
      price,
    };
    console.log(cartItem)
  };
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/products/${id}`);
        setLoading(false);
        setProduct(res.data);
        // setPrice(res.data.discount_)
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, []);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    const transformValue = `translate(-${x}%, -${y}%) scale(2)`;

    setZoom(true);
    e.target.style.transform = transformValue;
  };

  const handleMouseLeave = (e) => {
    setZoom(false);
    e.target.style.transform = "none";
  };

  const [currentImage, setCurrentImage] = React.useState("");
  const [activeTab, setActiveTab] = useState("specification");
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <section className="container mx-auto mt-10 shadow-lg pb-5">
        <div className="grid grid-cols-2">
          <div className="flex items-center w-full">
            <div
              className={`image-container relative max-w-[604px] overflow-hidden  bg-stone-100 rounded-md ${
                zoom ? "zoomed" : ""
              }`}
              // style={{
              //     backgroundImage: `url(${currentImage})`,
              //     backgroundSize: 'cover',
              //     backgroundPosition: 'center',
              //     backgroundRepeat: 'no-repeat',
              //     objectFit: 'cover',
              // }}
            >
              <Image
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                src={
                  currentImage
                    ? localURL + currentImage
                    : localURL + product.cover
                }
                alt=""
                width={1280}
                height={729}
              />
            </div>
            <div className="h-[529px] w-[92px] ml-3 flex items-center justify-center flex-col">
              <button className="mb-5 custom-prev-button-details">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M2.08973 11.2307L10 3.32044L17.9103 11.2307"
                    stroke="#949494"
                    strokeWidth={4}
                  />
                </svg>
              </button>
              <Swiper
                slidesPerView={4}
                direction="vertical"
                spaceBetween={30}
                {...swiperParams}
                modules={[Navigation]}
                className="w-full"
              >
                {product?.images?.map((img, index) => (
                  <SwiperSlide>
                    <Thumb
                      image={img.image}
                      setCurremtImage={setCurrentImage}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="mt-5 custom-next-button-details">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={19}
                  viewBox="0 0 20 19"
                  fill="none"
                >
                  <path
                    d="M2.08973 8.2307L10 16.141L17.9103 8.2307"
                    stroke="#FF7020"
                    strokeWidth={4}
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-5 w-full">
            <h2 className="text-black text-[26px] font-semibold ">
              {product?.name}
            </h2>
            <div className="mt-4 flex item-center">
              <h5 className="text-orange-500 text-lg font-extrabold">4.0</h5>
              <span className="ml-3 mt-[5px]">
                <StarProvider number={5} />
              </span>
              <span className="text-zinc-400 text-lg font-normal">(223)</span>
              <div className="w-0.5 h-[31px] bg-zinc-100 rounded-[22px] mx-3" />
              <h2>
                <span className="text-neutral-900 text-lg font-bold ">
                  {product?.available}
                </span>
                <span className="text-neutral-900 text-lg font-normal ">
                  {" "}
                  Sold
                </span>
              </h2>
              <div className="w-0.5 h-[31px] bg-zinc-100 rounded-[22px] mx-3" />
              <span className="mt-[5px]">
                <Eye />
              </span>
              <div className="ml-4">
                <span className="text-neutral-900 text-lg font-bold">
                  {product?.visit}{" "}
                </span>
                <span className="text-neutral-900 text-lg font-normal ">
                  Viewed
                </span>
              </div>
            </div>
            <div className="flex justify-between mt-10">
              <div className=" flex item-center">
                <h2 className="text-orange-500 text-4xl font-semibold ">
                  $
                  {product?.discount_percentage > 0
                    ? product.price -
                      (product?.discount_percentage / 100) * product?.price
                    : product.price}
                </h2>
                <div className="text-neutral-400 text-xl font-normal ml-4 mt-3">
                  <del>${product?.price}</del>
                </div>
                <button className="bg-green-500 text-white mt-2 text-xs w-[45px] rounded-lg h-[26px] font-semibold ml-4">
                  {product?.discount_percentage}%
                </button>
              </div>
              {product.brand && (
                <Image
                  src={"/images/store.png"}
                  width={120}
                  height={30}
                  alt={""}
                />
              )}
            </div>
            <div className="w-[100%] h-px bg-gray-200 mt-10" />

            <div className={"mt-5"}>
              <h2 className={"mt-3 text-xl"}>Key Features</h2>
              <ul className={"list-disc mt-2 ml-5"}>
                {product?.spacification?.map((sp, key) => (
                  <li key={key}>{sp.value}</li>
                ))}
              </ul>
              <div className={"py-2"}>
                <a
                  href={"#specification"}
                  className={" btn-link text-primary "}
                >
                  More Specification
                </a>
              </div>
              <div className={"flex items-center mt-8"} id={"specification"}>
                <h2 className={"text-xl-center font-semibold"}>Variants : </h2>
                <div className={"ml-4"}>
                  {product?.variant?.map((vari, key) => (
                    <button
                      onClick={() => setVari(vari)}
                      className={`btn bg-${vari} text-white uppercase`}
                    >
                      {vari}
                    </button>
                  ))}
                </div>
              </div>
              <div className={"mt-7"}>
                <button className={"btn btn-primary w-[200px] "}>
                  Buy Now
                </button>
                <button onClick={addToCart} className={"btn btn-primary ml-10 w-[200px] "}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={"container mx-auto mt-20"}>
        <div className={"flex items-start"}>
          <div className="w-[375px] min-w-[375px] h-[824px] bg-orange-500 rounded-xl">
            <ReviewsStatictic />
          </div>
          <section className={"ml-10 w-full"}>
            <div className={"flex items-center "}>
              <button
                onClick={() => setActiveTab("specification")}
                className={`btn ${
                  activeTab === "specification" ? "btn-primary" : "btn-ghost"
                } `}
              >
                Specification
              </button>
              <button
                onClick={() => setActiveTab("description")}
                className={`btn ml-5 ${
                  activeTab === "description" ? "btn-primary" : "btn-ghost"
                } `}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("review")}
                className={`btn ml-5 ${
                  activeTab === "review" ? "btn-primary" : "btn-ghost"
                } `}
              >
                Reviews
              </button>
            </div>
            <div>
              {activeTab === "specification" && (
                <Specification data={product?.key_features} />
              )}
              {activeTab === "description" && (
                <Description data={product?.descriptions} />
              )}
              {activeTab === "review" && <Reviews productId={product?._id} />}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default page;
const Thumb = ({ setCurremtImage, image }) => {
  return (
    <div
      onClick={() => setCurremtImage(image)}
      className="w-full cursor-pointer border overflow-hidden h-[92px] bg-stone-100 rounded-md mb-3"
    >
      <Image src={localURL + image} alt="" width={92} height={92} />
    </div>
  );
};
