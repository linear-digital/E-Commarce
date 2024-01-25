
"use client";

import StarProvider from "@/Components/Shared/StarProvider";
import { Eye, Taka } from "@/assets/icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewsStatictic from "@/app/products/Card/ReviewsStatictic";
import Specification from "@/app/products/Card/Specification";
import Description from "@/app/products/Card/Details";
import Reviews from "@/app/products/Card/Reviews";
import { api, localURL } from "@/Components/instance/api";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setRepatch } from "@/redux/Tools/action";
import RelatedProduct from "@/Components/Pages/Home/RelatedProduct";

const Details = ({ product }) => {
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

    const [zoom, setZoom] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [price, setPrice] = useState(0);
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
    const [related, setRelated] = useState([]);

    useEffect(() => {
        (async () => {
            // const ipfrom = await axios.get('https://api64.ipify.org/?format=json')
            // const res = await api.get(`/api/products/${id}?ip=${ipfrom.data.ip}`);
            const rels = await api.post(`/api/products/search/any`, { search: product?.category })
            setRelated(rels.data)
            setPrice(
                product?.price -
                (product?.price * product?.discount_percentage) / 100
            );
            setVariant(product?.variant[0]?.text);
        })();
    }, [product]);
    useEffect(() => {
        (async () => {
            try {
                const res = await api.get(`/api/reviews/id/${product._id}`);
                setReviews(res.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [product])
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

    return (
        <div>
            <section className="container mx-auto lg:mt-10 mt-4 shadow-lg pb-5 lg:px-0 px-4">
                <div className="grid lg:grid-cols-2 grid-cols-1">
                    <div className="w-full lg:hidden">
                        <Swiper
                            autoplay={{ delay: 7000, disableOnInteraction: true }}
                            pagination={{
                                dynamicBullets: true,
                                clickable: true,

                            }}
                            modules={[Navigation, Autoplay, Pagination]}
                            className="w-full max-h-[350px] h-full"
                        >
                            {product?.images?.map((img, index) => (
                                <SwiperSlide key={index} className="w-full">
                                    <div
                                        className={`image-container relative overflow-hidden w-full h-full  bg-stone-100 rounded-md ${zoom ? "zoomed" : ""
                                            }`}
                                    >
                                        {
                                            img.video ?
                                                <>
                                                    <video height={604} style={{ width: "100%", maxHeight: "100%" }} controls >
                                                        <source src={localURL + img.image} type="video/mp4" />

                                                        Your browser does not support the video tag.
                                                    </video>
                                                </>
                                                :
                                                <Image
                                                    onMouseMove={handleMouseMove}
                                                    onMouseLeave={handleMouseLeave}
                                                    src={
                                                        localURL + img.image
                                                    }
                                                    className={"w-full h-full"}
                                                    alt=""
                                                    width={1280}
                                                    height={729}
                                                />
                                            // <></>
                                        }
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="lg:flex hidden items-center flex-col w-full justify-center">
                        <div
                            className={`image-container relative max-w-[564px] overflow-hidden w-full h-full  bg-stone-100 rounded-md ${zoom ? "zoomed" : ""
                                }`}
                        >
                            {
                                currentImage.video ?
                                    <>
                                        <video height={604} style={{ width: "100%" }} controls >
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
                                modules={[Navigation, Autoplay]}
                                className="w-full h-full"
                            >
                                {product?.images?.map((img, index) => (
                                    <SwiperSlide key={index} className="min-w-[90px]">
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

                    <div className="lg:p-5 w-full mt-3">
                        <h1 className="text-black lg:text-[26px] text-[20px] font-semibold ">
                            {product?.name}
                        </h1>
                        <div className="mt-4 flex item-center">
                            <h5 className="text-orange-500 text-lg font-extrabold">4.0</h5>
                            <span className="ml-3 mt-[5px]">
                                <StarProvider number={5} />
                            </span>
                            <span className="text-zinc-400 lg:text-lg text-sm font-normal">(
                                {reviews.length}
                                )</span>

                            <div className="w-0.5 h-[31px] bg-zinc-100 rounded-[22px] mx-3" />
                            <span className="mt-[5px]">
                                <Eye />
                            </span>
                            <div className="ml-4">
                                <span className="text-neutral-900 lg:text-lg text-sm font-bold">
                                    {product?.visit}{" "}
                                </span>
                                <span className="text-neutral-900 lg:text-lg text-sm font-normal ">
                                    Visit
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between lg:mt-10 mt-4">
                            <div className=" flex item-center">
                                <h2 className="text-orange-500 lg:text-4xl text-3xl font-semibold ">
                                    <Taka />{price}
                                </h2>
                                <div className="text-neutral-400 text-xl font-normal ml-4 mt-3">
                                    <del><Taka />{product?.price}</del>
                                </div>
                                <button className="bg-green-500 text-white mt-2 text-xs w-[45px] rounded-lg h-[26px] font-semibold ml-4">
                                    {product?.discount_percentage}%
                                </button>
                            </div>
                        </div>
                        <div className="w-[100%] h-px bg-gray-200 lg:mt-10 mt-3" />

                        <div className={"lg:mt-5"}>
                            <h2 className={"mt-3 text-xl"}>Key Features</h2>
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

                            <div className={"flex items-center lg:mt-8 mt-3"} id={"specification"}>
                                <h2 className={"text-xl-center font-semibold"}>Variants : </h2>
                                <div className={"ml-4"}>
                                    {product?.variant?.map((vari, key) => (
                                        <button
                                            key={key}
                                            onClick={() => setVariant(vari.text)}
                                            className={`btn bg-white ${variant === vari.text && "shadow-xl shadow-orange-200 border-orange-400 border-2"} text-black uppercase mr-2`}
                                        >
                                            {vari.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {
                                !product?.inStock && <button className="text-red-500 text-xl font-semibold mt-3">Stock Out</button>
                            }
                            <div className={"mt-5 flex items-center"}>
                                <button onClick={addToCart} disabled={!product?.inStock} className={"btn btn-primary lg:w-[200px] w-[150px] lg:text-base text-sm"}>
                                    Buy Now
                                </button>
                                <button
                                    disabled={!product?.inStock}
                                    onClick={addToCart}
                                    className={"btn btn-primary ml-10 lg:w-[200px] w-[150px] lg:text-base text-sm"}
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={"container mx-auto lg:mt-20 mt-10 lg:px-0 px-3"}>
                <div className={"flex lg:flex-row flex-col-reverse items-start"}>
                    <div className="lg:max-w-[375px] lg:min-w-[375px] w-full  lg:h-[824px] h-auto bg-orange-500 rounded-xl">
                        <ReviewsStatictic reviews={reviews} />
                    </div>
                    <section className={"lg:ml-10 w-full"}>
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
                            {activeTab === "review" && <Reviews reviews={reviews} productId={product?._id} />}
                        </div>
                    </section>
                </div>
            </section>
            {
                related &&
                <RelatedProduct products={related} mt={"lg:mt-16"}/>
            }
        </div>
    );
};

export default Details;

const Thumb = ({ setCurremtImage, image }) => {
    return (
        <div
            onClick={() => setCurremtImage(image)}
            className="w-full cursor-pointer border overflow-hidden h-[92px] bg-transparent rounded-md mb-3"
        >
            {
                image.video ?
                    <>
                        <Image src={'/images/video.png'} alt="" width={92} height={92} />
                    </>
                    :
                    <Image src={localURL + image.image} alt="" width={92} height={92} />
            }
        </div>
    );
};


const ArrowRight = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>


}