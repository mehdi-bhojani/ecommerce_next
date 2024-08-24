"use client"
import React, { ReactNode } from 'react'

import { FaGift, FaWhatsapp, FaEllipsisH } from 'react-icons/fa';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import { Input } from "@/components/ui/input"

import { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ClipboardCopy, Ellipsis } from 'lucide-react';


type SidebarProps = {
    children: ReactNode,
    sizes:string[],
    quantity:number,
    selectedSize:string,
    handleSizeSelect:(size:string) => void,
    increaseQuantity:() => void,
    decreaseQuantity:() => void;

};
const Sidebar3: React.FC<SidebarProps> = ({ children ,sizes,handleSizeSelect, increaseQuantity, decreaseQuantity,quantity,selectedSize}) => {
  const [sheetOpen ,setSheetOpen]=useState(false)

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

function Done(){
  setSheetOpen(false);
}


    return (
        <div > <Sheet open={sheetOpen} onOpenChange={setSheetOpen} >
            <SheetTrigger asChild className='cursor-pointer'>
                {children}
            </SheetTrigger>
            <SheetContent className={`pt-10 w-2/5 ${isOpen ? 'bg-gray-200' : ''}  `} >

            <div className="p-4 max-w-sm mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Select Size</h2>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeSelect(size)}
            className={`px-3 py-2 border rounded ${
              selectedSize === size
                ? 'bg-red-500 text-white'
                : 'bg-white text-black border-black'
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold">Select Quantity</h2>
        <div className="flex items-center mt-2">
          <button
            onClick={decreaseQuantity}
            className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded"
          >
            -
          </button>
          <span className="mx-4">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded"
          >
            +
          </button>
        </div>
      </div>

      <button onClick={Done} className="w-full mt-6 py-3 text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
        DONE
      </button>
    </div>






            </SheetContent>
        </Sheet></div>
    )
}

export default Sidebar3








