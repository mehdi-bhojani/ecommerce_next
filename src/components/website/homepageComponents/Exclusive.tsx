import React from "react";
import Image from "next/image";

const imageData = [
  {
    src: "/assets/home/banner1.png",
    width: 1000,
    height: 1000,
    className: "col-span-1 md:col-span-2 bg-purple-200 flex items-center justify-center w-full",
    alt: "Banner 1",
    type: "vertical",
  },
  {
    src: "/assets/home/banner2.png",
    width: 1000,
    height: 1000,
    className: "col-span-1 md:col-span-2 bg-pink-200 flex items-center justify-center w-full",
    alt: "Banner 2",
    type: "vertical",
  },
  {
    src: "/assets/home/box1.png",
    width: 1000,
    height: 1000,
    className: "col-span-1 bg-blue-200 flex items-center justify-center w-full",
    alt: "Banner 3",
    type: "horizontal",
  },
  {
    src: "/assets/home/box2.png",
    width: 1000,
    height: 1000,
    className: "col-span-1 bg-yellow-200 flex items-center justify-center w-full",
    alt: "Banner 4",
    type: "horizontal",
  },
];

const Exclusive = () => {
  return (
    <div className="text-center">
      <h1 className="font-semibold text-center text-2xl py-10">
        EXCLUSIVE FOR YOU
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {imageData.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            width={image.width}
            height={image.height}
            className={image.className}
            alt={image.alt}
          />
        ))}
      </div>
    
    </div>
  );
};

export default Exclusive;
