
"use client"
import React, { ReactNode, useEffect } from 'react'
import { SlidersHorizontal, Check } from 'lucide-react';
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
interface Products {

  id: number,
  brandName: string,
  name: string,
  subCategory: string,
  Category: string,
  Type: string,
  originalPrice: number,
  discountedPrice: number,
  discount: string,
  sizes: string[],
  slots: { size: string; quantity: number; }[]; // Allow multiple elements
  images: string[]

}
type SidebarProps = {
  children: ReactNode;
  setSheetOpen: (open: boolean) => void;
  sheetOpen: boolean;
};

 const Sidebar: React.FC<SidebarProps> = ({ children,setSheetOpen,sheetOpen}) => {
  // const [sheetOpen ,setSheetOpen]=useState(false)

//   function Clear(){
//     setSheetOpen(false);
//   }



//   function Apply(){
// setSheetOpen(false);
//   }

  const categories = [
    {
      title: "MEN",
      image: "/path/to/men-image.png",
      bgColor: "bg-blue-100",
    },
    {
      title: "WOMEN",
      image: "/path/to/women-image.png",
      bgColor: "bg-pink-100",
    },
    {
      title: "KIDS",
      image: "/path/to/kids-image.png",
      bgColor: "bg-yellow-100",
    },
    {
      title: "BEAUTY",
      image: "/path/to/beauty-image.png",
      bgColor: "bg-pink-200",
    },
    {
      title: "OTHERS",
      image: "/path/to/others-image.png",
      bgColor: "bg-gray-100",
    },
  ];

  // const [sheetOpen ,setSheetOpen]=useState(true)
  return (
    <div > <Sheet open={sheetOpen} onOpenChange={setSheetOpen}  >
      <SheetTrigger  asChild className='cursor-pointer'>
        {children}
      </SheetTrigger>
      <SheetContent side={'left'} className=' ' >
       <div className='bg-white h-full w-full'>
       <div className="w-full h-full overflow-y-auto">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`flex justify-between items-center ${category.bgColor} p-6 border-b-2`}
        >
          <h2 className="text-2xl font-bold">{category.title}</h2>
          {/* <span className="text-xl">&#9660;</span> */}
          {/* <Image
            src={category.image}
            alt={`${category.title} image`}
            width={150}
            height={150}
            className="object-contain"
          /> */}
        
        </div>
      ))}
    </div>
       </div>
      </SheetContent>
    </Sheet></div>
  )
}


export default Sidebar