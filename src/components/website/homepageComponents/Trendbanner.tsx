import React from "react";
import Image from "next/image";
const Trendbanner = () => {
  return (
    <div className="mt-5">
      <Image
        className=" w-full "
        width={1000}
        height={1000}
        src={`/assets/home/trend.png`}
        alt="the banner"
      />
    </div>
  );
};

export default Trendbanner;
