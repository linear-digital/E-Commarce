import { Feedback, Payment, Star, Timer, Track } from "@/assets/icons";
import Image from "next/image";
import React from "react";

const Features = () => {
  return (
    <div className="lg:mt-32 mt-10">
      <section className="container mx-auto">
        <div className="flex flex-wrap lg:gap-y-10 gap-y-5 lg:gap-x-10 gap-x-5 justify-center">
          <FeaturesCard
            title={"Free Delivery"}
            desc={"From $40"}
            Icon={<Track />}
          />
          <FeaturesCard
            title={"Best Quality"}
            desc={"Brand"}
            Icon={
              <div className="bg-white">
                <Star w={"50px"} h={"50px"} />
              </div>
            }
          />
          <FeaturesCard
            title={"1 Year"}
            desc={"For free return"}
            Icon={<Timer />}
          />
          <FeaturesCard
            title={"Feedback"}
            desc={"99% Real Data"}
            Icon={<Feedback />}
          />
          <FeaturesCard title={"Payment"} desc={"Secure"} Icon={<Image 
          src={'/images/credit-card.png'}
          width={60}
          height={40}
          />} />
        </div>
      </section>
    </div>
  );
};

export default Features;

export const FeaturesCard = ({ Icon, title, desc }) => {
  return (
    <div className="lg:max-w-[222px] max-w-[150px] min-w-[120px] lg:min-w-[220px] lg:max-h-[137px] max-h-[100px] lg:min-h-[137px] min-h-[100px] w-full h-full  lg:shadow-xl shadow-md shadow-stone-200 flex flex-col justify-center items-center rounded-lg relative">
      <h2 className="text-center text-black text-xl font-semibold ">{title}</h2>
      <h5 className="text-center mt-2 text-black text-base font-light">
        {desc}
      </h5>
      <div className="absolute hidden lg:block top-[-33px]">{Icon}</div>
    </div>
  );
};
