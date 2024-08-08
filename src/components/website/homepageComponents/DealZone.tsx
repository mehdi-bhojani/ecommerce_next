import React from "react";
import Image from "next/image";
const DealZone = () => {
  return (
    <div className="text-center max-w-5xl mx-auto ">
      <h1 className="font-semibold text-center text-2xl py-10">DEAL ZONE</h1>

      <div className="flex flex-row justify-center flex-wrap gap-5">
        <Image
          className="h-[200px] w-[200px] md:w-[230px] md:h-[230px]"
          width={1000}
          height={1000}
          src={"/assets/home/circle1.png"}
          alt="the logo"
        />
        <Image
          className="h-[200px] w-[200px] md:w-[230px] md:h-[230px]"
          width={1000}
          height={1000}
          src={"/assets/home/circle2.png"}
          alt="the logo"
        />
        <Image
          className="h-[200px] w-[200px] md:w-[230px] md:h-[230px]"
          width={1000}
          height={1000}
          src={"/assets/home/circle3.png"}
          alt="the logo"
        />
        <Image
          className="h-[200px] w-[200px] md:w-[230px] md:h-[230px]"
          width={1000}
          height={1000}
          src={"/assets/home/circle4.png"}
          alt="the logo"
        />
      </div>
    </div>
  );
};

export default DealZone;
