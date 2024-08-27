import React from "react";
import Image from "next/image";

const imageData = [
  {
    src: "/assets/home/banner1.png",
    width: 3000,
    height: 3000,
    className: "col-span-2   object-cover w-full  h-36  md:h-full md:object-fill",
    alt: "Banner 1",
    type: "vertical",
  },
  {
    src: "/assets/home/banner2.png",
    width: 3000,
    height: 3000,
    className: " col-span-2  object-cover  w-full  h-36  md:h-full md:object-fill",
    alt: "Banner 2",
    type: "vertical",
  },
  {
    src: "/assets/home/box1.png",
    width: 2500,
    height: 2500,
    className: " col-span-1  object-cover  h-36  w-full md:h-full md:object-fill",
    alt: "Banner 3",
    type: "horizontal",
  },
  {
    src: "/assets/home/box2.png",
    width: 2500,
    height: 2500,
    className: "col-span-1 object-cover  h-36 w-full md:h-full md:object-fill",
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
      <div className="grid  grid-cols-2 gap-4">
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
