import { Star } from "@/assets/icons";
import React from "react";

const StarProvider = ({ number }) => {
  return (
    <div className="flex items-center">
      {number === 1 && (
        <>
          <div >
            <Star />
          </div>
        </>
      )}
      {number === 2 && (
        <>
          <div className="mr-1">
            <Star />
          </div>
          <div className="mr-1">
            <Star />
          </div>
        </>
      )}
      {number === 3 && (
        <>
          <div className="mr-1">
            <Star />
          </div>
          <div className="mr-1">
            <Star />
          </div>
          <div className="mr-1">
            <Star />
          </div>
        </>
      )}
      {number === 4 && (
        <>
          <div className="mr-1">
            <Star />
          </div>
          <div className="mr-1">
            <Star />
          </div>
          <div className="mr-1">
            <Star />
          </div>
          <div className="mr-1">
            <Star />
          </div>
        </>
      )}
      {number === 5 && (
        <>
          <div className="mr-1">
            <Star />
          </div>
          <div className="mr-1">
            <Star />
          </div>
          <div className="mr-1">
            <Star />
          </div>
          <div className="mr-1">
            <Star />
          </div>
          <div className="mr-1">
            <Star />
          </div>
        </>
      )}
    </div>
  );
};

export default StarProvider;
