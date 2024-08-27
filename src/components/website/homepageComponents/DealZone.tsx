import React from "react";
import Image from "next/image";
const DealZone = () => {
  const images = [
    {
      src: "/assets/home/circle1.png",
      alt: "Circle 1",
    },
    {
      src: "/assets/home/circle2.png",
      alt: "Circle 2",
    },
    {
      src: "/assets/home/circle3.png",
      alt: "Circle 3",
    },
    {
      src: "/assets/home/circle4.png",
      alt: "Circle 4",
    },
  ];
  return (
    <div className="text-center max-w-5xl mx-auto ">
      <h1 className="font-semibold text-center text-2xl py-10">DEAL ZONE</h1>

      <div className="md:flex md:flex-row md:justify-center md:flex-wrap md:gap-5 grid grid-cols-2 gap-2">
      {images.map((image, index) => (
        <Image
          key={index}
          className=" md:w-[230px] md:h-[230px]"
          width={1000}
          height={1000}
          src={image.src}
          alt={image.alt}
        />
      ))}
      </div>
    </div>
  );
};

export default DealZone;
