import { Star } from "@/assets/icons";
import React from "react";

const StarProvider = ({ number, color , size }) => {
  return (
    <div className="flex items-center ">
      {number === 1 && (
        <>
          <div >
            <Star color={color} h={size} w={size} />
          </div>
        </>
      )}
      {number === 2 && (
        <>
          <div className="mr-1">
            <Star color={color} h={size} w={size}/>
          </div>
          <div className="mr-1">
            <Star color={color} h={size} w={size}/>
          </div>
        </>
      )}
      {number === 3 && (
        <>
          <div className="mr-1">
            <Star color={color} h={size} w={size}/>
          </div>
          <div className="mr-1">
            <Star color={color} h={size} w={size}/>
          </div>
          <div className="mr-1">
            <Star color={color} h={size} w={size}/>
          </div>
        </>
      )}
      {number === 4 && (
        <>
          <div className="mr-1">
            <Star color={color} h={size} w={size}/>
          </div>
          <div className="mr-1">
            <Star color={color} h={size} w={size}/>
          </div>
          <div className="mr-1">
            <Star color={color} h={size} w={size}/>
          </div>
          <div className="mr-1">
            <Star color={color} h={size} w={size}/>
          </div>
        </>
      )}
      {number === 5 && (
        <>
          <div className="mr-1">
            <Star color={color} h={size} w={size}/>
          </div>
          <div className="mr-1">
            <Star color={color} h={size} w={size}/>
          </div>
          <div className="mr-1">
            <Star color={color} h={size} w={size}/>
          </div>
          <div className="mr-1">
            <Star color={color} h={size} w={size}/>
          </div>
          <div className="mr-1">
            <Star color={color} h={size} w={size}/>
          </div>
        </>
      )}
    </div>
  );
};

export default StarProvider;
