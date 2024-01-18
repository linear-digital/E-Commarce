"use client";
import StarProvider from "@/Components/Shared/StarProvider";
import { Eye, Taka } from "@/assets/icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewsStatictic from "@/app/products/Card/ReviewsStatictic";
import Specification from "@/app/products/Card/Specification";
import Description from "@/app/products/Card/Details";
import Reviews from "@/app/products/Card/Reviews";
import { api, localURL } from "@/Components/instance/api";
import Loader from "@/Components/Shared/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setRepatch } from "@/redux/Tools/action";


const link =
  "https://dropshop.com.bd/wp-content/uploads/2023/11/Fantech-MAXFIT67-MK858-RGB-Pre-Lubed-Gateron-Milky-Yellow-Switch-Mechanical-Hotswap-Keyboard.webp";

const page = ({ params }) => {
  const { currentUser } = useSelector((state) => state.User);
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
  const router = useRouter()
  //states for cart
  const [variant, setVariant] = useState("black");
  const dispatch = useDispatch()
  const addToCart = async () => {
    if (currentUser) {
      const cartItem = {
        email: currentUser?.email,
        product_id: product._id,
        variant: variant || product?.variant[0],
        price,
        price_total: price,
        image: product?.cover,
        product_name: product?.name,
        quantity: 1,
        product_code: product?.code
      };
      const res = await api.post('/api/cart', cartItem)
      if (res.status === 200) {
        router.push('/cart')
        dispatch(setRepatch(res))
      }
    }
    else {
      router.push('/login')
    }
  };
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/products/${id}`);
        setLoading(false);
        setProduct(res.data);
        setPrice(
          res.data?.price -
          (res.data?.price * res.data?.discount_percentage) / 100
        );
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

  const [currentImage, setCurrentImage] = React.useState({});
  const [activeTab, setActiveTab] = useState("specification");
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <section className="container mx-auto mt-10 shadow-lg pb-5">
        <div className="grid grid-cols-2">
          <div className="flex items-center flex-col w-full justify-center">
            <div
              className={`image-container relative max-w-[564px] overflow-hidden w-full h-full  bg-stone-100 rounded-md ${zoom ? "zoomed" : ""
                }`}
            // style={{
            //   backgroundImage: `url('${currentImage.image
            //     ? localURL + currentImage?.image
            //     : localURL + product.cover
            //     }')`,
            //   backgroundSize: 'cover',
            //   backgroundPosition: 'center',
            //   backgroundRepeat: 'no-repeat',
            // }}
            // onMouseMove={handleMouseMove}
            // onMouseLeave={handleMouseLeave}
            >
              {
                currentImage.video ?
                  <>
                    <video height={604} style={{ width: "100%" , maxHeight: "604px"}} autoPlay>
                      <source src={localURL + currentImage.image} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </>
                  :
                  <Image
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    src={
                      currentImage.image
                        ? localURL + currentImage?.image
                        : localURL + product.cover
                    }
                    className={"w-full max-h-[564px]"}
                    alt=""
                    width={1280}
                    height={729}
                  />
                // <></>
              }

            </div>
            <div className="min-h-[80px] max-h-[92px] ml-3 flex items-center justify-center max-w-[604px] mt-3">
              <button className="mr-3 custom-prev-button-details text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>

              </button>
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                {...swiperParams}
                autoplay={{ delay: 3000, disableOnInteraction: true }}
                modules={[Navigation , Autoplay]}
                className="w-full h-full"
              >
                {product?.images?.map((img, index) => (
                  <SwiperSlide>
                    <Thumb
                      image={img}
                      setCurremtImage={setCurrentImage}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="mt-5 custom-next-button-details text-primary ml-3">
                <ArrowRight />
              </button>
            </div>
          </div>

          <div className="p-5 w-full">
            <h1 className="text-black text-[26px] font-semibold ">
              {product?.name}
            </h1>
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
                <h1 className="text-orange-500 text-4xl font-semibold ">
                  <Taka />{price}
                </h1>
                <div className="text-neutral-400 text-xl font-normal ml-4 mt-3">
                  <del><Taka />{product?.price}</del>
                </div>
                <button className="bg-green-500 text-white mt-2 text-xs w-[45px] rounded-lg h-[26px] font-semibold ml-4">
                  {product?.discount_percentage}%
                </button>
              </div>
              {/*{product.brand && (*/}
              {/*  <Image*/}
              {/*    src={"/images/store.png"}*/}
              {/*    width={120}*/}
              {/*    height={30}*/}
              {/*    alt={""}*/}
              {/*  />*/}
              {/*)}*/}
            </div>
            <div className="w-[100%] h-px bg-gray-200 mt-10" />

            <div className={"mt-5"}>
              <h1 className={"mt-3 text-xl"}>Key Features</h1>
              <ul className={"list-disc mt-2 ml-5"}>
                {product?.spacification?.map((sp, key) => (
                  <li key={key}>
                    {
                      sp.key && <span className={"mr-1"}><b>{sp.key}</b> - </span>
                    }
                    {sp.value}</li>
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
                <h1 className={"text-xl-center font-semibold"}>Variants : </h1>
                <div className={"ml-4"}>
                  {product?.variant?.map((vari, key) => (
                    <button
                      onClick={() => setVariant(vari)}
                      className={`btn bg-${vari} ${variant === vari && "shadow-xl shadow-orange-200"} text-white uppercase mr-2`}
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
                <button
                  onClick={addToCart}
                  className={"btn btn-primary ml-10 w-[200px] "}
                >
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
                className={`btn ${activeTab === "specification" ? "btn-primary" : "btn-ghost"
                  } `}
              >
                Specification
              </button>
              <button
                onClick={() => setActiveTab("description")}
                className={`btn ml-5 ${activeTab === "description" ? "btn-primary" : "btn-ghost"
                  } `}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("review")}
                className={`btn ml-5 ${activeTab === "review" ? "btn-primary" : "btn-ghost"
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
      className="w-full cursor-pointer border overflow-hidden h-[92px] bg-transparent rounded-md mb-3"
    >
      {
        image.video ?
          <>
            <Image loading="lazy" src={'/images/video.png'} alt="" width={92} height={92} />
          </>
          :
          <Image loading="lazy" src={localURL + image.image} alt="" width={92} height={92} />
      }
    </div>
  );
};


const ArrowRight = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>


}