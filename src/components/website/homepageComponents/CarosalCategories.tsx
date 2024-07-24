'use client'

import * as React from "react"
import Image from "next/image"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"




const categories: {
  name: string;
  subcategories?: { name: string; href: string; }[];
}[] = [
    {
      name: "BE",

      subcategories: [
        { name: 'Face', href: '#' },
        { name: 'lips', href: '#' },
        { name: 'eyes', href: '#' },
        { name: 'Shampoo & Condition', href: '#' },
        { name: 'Cleaner', href: '#' },
        { name: 'Skin Care', href: '#' },

      ]
    },
    {
      name: "B",

      subcategories: [
        { name: 'Boys Shirt', href: '#' },
        { name: 'T-shirts', href: '#' },
        { name: 'Festive Wear', href: '#' },
        { name: 'Boys Footwear', href: '#' },
        { name: 'Winter Wear', href: '#' },

      ]
    },
    {
      name: 'G',

      subcategories: [
        { name: 'Dresses', href: '#' },
        { name: 'Tops & Tees', href: '#' },
        { name: 'TumpSuit', href: '#' },
        { name: 'Winter Wear', href: '#' },
        { name: 'Bottoms', href: '#' },
        { name: 'Festive Wear', href: '#' },
        { name: 'Girls FootWear', href: '#' },
        { name: 'Bags', href: '#' },

      ]
    },
    {
      name: 'H',

      subcategories: [
        { name: 'Home Decon', href: '#' },


      ]
    },
    {
      name: 'W',

      subcategories: [
        { name: 'Shalwar Kameez', href: '#' },
        { name: 'heels', href: '#' },
        { name: 'kurtas', href: '#' },
        { name: 'pumps', href: '#' },
        { name: 'Tops & Tunics', href: '#' },
        { name: 'Sandals', href: '#' },
        { name: 'Sports Shoes', href: '#' },
        { name: 'T-Shirts & TankTops', href: '#' },
        { name: 'Sneakers', href: '#' },
        { name: 'Bottoms', href: '#' },
        { name: 'Flats', href: '#' },
        { name: 'Bags', href: '#' },
        { name: 'UnStiched', href: '#' },
        { name: 'Pants & Trousers', href: '#' },
        { name: 'Dupattas & Shawls', href: '#' },
        { name: 'Co-ord Set', href: '#' },
        { name: 'Khussa', href: '#' },
        { name: 'Jeans', href: '#' },
        { name: 'Sleepwear', href: '#' },
        { name: 'Suits', href: '#' },
        { name: 'SinterWear', href: '#' },


      ]
    },
    {
      name: 'M',

      subcategories: [
        { name: 'Sports Shoes', href: '#' },
        { name: 'Sneakers', href: '#' },
        { name: 'Casual Shoes', href: '#' },
        { name: 'Formal Shoes', href: '#' },
        { name: 'Peshawari', href: '#' },
        { name: 'Slippers', href: '#' },
        { name: 'Sandals', href: '#' },
        { name: 'T-Shirts', href: '#' },
        { name: 'Shirt', href: '#' },
        { name: 'Traditional clothing', href: '#' },
        { name: 'Bags', href: '#' },
        { name: 'Sleep & Lounge', href: '#' },
        { name: 'Hoodies', href: '#' },
        { name: 'Coats', href: '#' },
        { name: 'Jackets', href: '#' },
        { name: 'Sweaters & SweatShirts', href: '#' },
        { name: 'ActiveWear', href: '#' },
        { name: 'Jeans', href: '#' },
        { name: 'Watches', href: '#' },



      ]
    },
  ];


interface CarosalCategoriesProps {
  Categ: string;
}




export function CarosalCategories({ Categ }: CarosalCategoriesProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Function to handle click and set the selected index
  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  
  const categoryW = categories.find(category => category.name === Categ);
  return (
    <Carousel className="w-full max-w-6xl">
      <CarouselContent className="-ml-1 items-center">
      {categoryW?.subcategories?.map((items, index) => (
        <CarouselItem
          key={index}
          className={`pl-1 basis-1/9 hover:cursor-pointer  `}
          onClick={() => handleItemClick(index)}
          tabIndex={0} // Make the item focusable
        >
          <div className="px-1 py-3">
            <Card
              className={`rounded-full w-auto max-w-max w-max overflow-hidden `}
            >
             <CardContent
  className={`flex border-1 p-0 border-solid border-gray-500 max-w-max items-center justify-center ${
    selectedIndex === index ? 'bg-blue-500' : ''
  }`}
>
                <div className="rounded-lg ">
                  <Image
                    className="rounded-full h-10 w-10"
                    width={100}
                    height={100}
                    src={'/assets/home/test.png'}
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
  )
}
