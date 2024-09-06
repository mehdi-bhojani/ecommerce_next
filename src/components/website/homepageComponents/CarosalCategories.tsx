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
  onCategoryClick: (categoryID: string[]) => void;
}

export const CarosalCategories: React.FC<CarosalCategoriesProps> = ({
  Categ,
  onCategoryClick,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<string | null>("all");
  const allIds = Categ.map((item) => item._id);
  const handleItemClick = (categoryID: string[], theSelectedIndex: string) => {
    setSelectedIndex(theSelectedIndex); 
    onCategoryClick(categoryID); 
  };

  useEffect(() => {
    handleItemClick(allIds, "all");
  }, [Categ]);

  return (
    <div className="w-full p-5 px-10">
    <Carousel className="w-full max-w-6xl">
      <CarouselContent className=" items-center">
        <CarouselItem
          className={`basis-1/10 hover:cursor-pointer`}
          onClick={() => handleItemClick(allIds, "all")}
        >
          <div className={""}>
            <Card className={`rounded-full w-auto max-w-max overflow-hidden 
                 ${ selectedIndex === "all" ? "bg-blue-300 border border-blue-600" : ""
                }`}>
              <CardContent
                className={`flex border-1 p-0 border-solid border-gray-500 max-w-max items-center justify-center `}
              >
                <div className="rounded-lg px-4 flex justify-center items-center  w-full h-10">  
                <span className="text-sm font-semibold   ">All</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        {Categ.map((items, index) => (
          <CarouselItem
            key={index}
            className={`basis-1/9 hover:cursor-pointer `}
            onClick={() => handleItemClick([items._id], items.name)}
            tabIndex={0}
          >
            <div className="px-1 py-3 ">
              <Card
                className={`rounded-full w-auto max-w-max overflow-hidden `}
              >
                <CardContent
                  className={`flex border-1 p-0 border-solid border-gray-500 max-w-max items-center justify-center flex-nowrap ${
                    selectedIndex === items?.name ? "bg-blue-300 " : ""
                  }`}
                >
                  <div className=" flex-shrink-0 w-10 h-10">
                    <Image
                      className="p-1 object-cover rounded-full"
                      width={300}
                      height={300}
                      src={items.image}
                      alt="the logo"
                    />
                  </div>
                  <span className="text-sm font-semibold flex-1 text-nowrap px-2">
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
    </div>
  );
};
