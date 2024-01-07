import { Feedback, Payment, Star, Timer, Track } from "@/assets/icons";
import Image from "next/image";
import React from "react";

const Features = () => {
  return (
    <div className="mt-32">
      <section className="container mx-auto">
        <div className="flex gap-10 justify-center">
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
    <div className="max-w-[222px] min-w-[220px] max-h-[137px] min-h-[137px] w-full h-full  shadow-xl shadow-stone-200 flex flex-col justify-center items-center rounded-lg relative">
      <h2 className="text-center text-black text-xl font-semibold ">{title}</h2>
      <h5 className="text-center mt-2 text-black text-base font-light">
        {desc}
      </h5>
      <div className="absolute top-[-33px]">{Icon}</div>
    </div>
  );
};
