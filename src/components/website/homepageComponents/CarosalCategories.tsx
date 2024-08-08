"use client";
import { useEffect } from "react";
import * as React from "react";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CategoryType } from "@/lib/types";


interface CarosalCategoriesProps {
  Categ: CategoryType[];
  onCategoryClick: (categoryID: string[]) => void; // Define the callback prop
}

export const CarosalCategories: React.FC<CarosalCategoriesProps> = ({
  Categ,
  onCategoryClick,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  // Function to handle click and set the selected index
  // const handleItemClick = (index: number, categoryID: string) => {
  //   setSelectedIndex(index);
  //   console.log(`Clicked category: ${categoryID}`);
  //   onCategoryClick(categoryID); // Call the callback with the category name
  // };
  const handleItemClick = (categoryID: string) => {
    onCategoryClick([categoryID]); // Call the callback with the category name
  };

  return (
    <Carousel className="w-full max-w-6xl">
      <CarouselContent className="-ml-1 items-center">
        {Categ.map((items, index) => (
          <CarouselItem
            key={index}
            className={`pl-1 basis-1/9 hover:cursor-pointer  `}
            // onClick={() => handleItemClick(index, items.name)}
            onClick={() => handleItemClick(items._id)}
            tabIndex={0} // Make the item focusable
          >
            <div className="px-1 py-3">
              <Card
                className={`rounded-full w-auto max-w-max overflow-hidden `}
              >
                <CardContent
                  className={`flex border-1 p-0 border-solid border-gray-500 max-w-max items-center justify-center ${
                    selectedIndex === index ? "bg-blue-500" : ""
                  }`}
                >
                  <div className="rounded-lg ">
                    <Image
                      className="rounded-full h-10 w-10"
                      width={100}
                      height={100}
                      src={items.image}
                      alt="the logo"
                    />
                  </div>
                  <span className="text-sm font-semibold flex-1 px-2">
                    {items.name}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
