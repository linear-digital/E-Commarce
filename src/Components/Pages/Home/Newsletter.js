import { Shape00 } from "@/assets/icons";
import React from "react";

const Newsletter = () => {
  return (
    <div className="lg:mt-32 mt-10 h-[265px] w-full bg-primary flex flex-col justify-center overflow-hidden">
      <div className="container lg:p-0 p-5 relative mx-auto lg:flex justify-between">
        <div className="absolute lg:left-[-107px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={100}
            height={90}
            viewBox="0 0 116 102"
            fill="none"
          >
            <path
              d="M32.2222 89.25C27.0667 89.25 21.9111 84.7875 19.3333 82.875C6.44444 73.95 2.57778 70.7625 0 68.85V95.625C0 99.1452 2.8859 102 6.44444 102H58C61.5585 102 64.4444 99.1452 64.4444 95.625V68.85C61.8667 70.7625 58 73.95 45.1111 82.875C42.5333 84.7875 37.3778 89.25 32.2222 89.25ZM58 51H6.44444C2.8859 51 0 53.8548 0 57.375V60.5625C5.15556 64.3875 4.51111 64.3875 23.2 77.775C25.1333 79.05 29 82.875 32.2222 82.875C35.4444 82.875 39.3111 79.05 41.2444 78.4125C59.9333 65.025 59.2889 65.025 64.4444 61.2V57.375C64.4444 53.8548 61.5585 51 58 51ZM109.556 31.875H45.1111C41.5526 31.875 38.6667 34.7298 38.6667 38.25V44.625H58C64.6881 44.625 70.2022 49.6891 70.8305 56.1438L70.8889 56.1V82.875H109.556C113.114 82.875 116 80.0202 116 76.5V38.25C116 34.7298 113.114 31.875 109.556 31.875ZM103.111 57.375H90.2222V44.625H103.111V57.375ZM32.2222 38.25C32.2222 31.2196 38.0041 25.5 45.1111 25.5H90.2222V6.375C90.2222 2.8548 87.3363 0 83.7778 0H19.3333C15.7748 0 12.8889 2.8548 12.8889 6.375V44.625H32.2222V38.25Z"
              fill="white"
              fillOpacity="0.37"
            />
          </svg>
        </div>

        <div className="absolute right-[-30px] bottom-[0px]">
          <Shape00 />
        </div>
        <div>
          <h1 className="text-white lg:text-3xl text-xl text-center lg:text-start font-bold">
            Sign Up for Newsletter
          </h1>
          <p className="lg:w-[603px] lg:mt-4 mt-2 text-white text-sm text-center lg:text-start lg:text-lg font-normal leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div>
          <div className="lg:w-[653px]  w-full relative lg:h-20 h-[60px] mt-5 lg:mt-0 bg-white rounded-xl overflow-hidden">
            <input
              type="text"
              placeholder="Enter your email here"
              className="h-full lg:w-[450px] outline-none border-none pl-4 text-base font-normal"
            />
            <button className="btn lg:w-[187px] w-[100px] bg-[#565656]  text-white btn-neutral lg:text-[15px] text-[12px] lg:h-[60px] absolute right-3 lg:top-[10px] top-[6px] font-normal">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
