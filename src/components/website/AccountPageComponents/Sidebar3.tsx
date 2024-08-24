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
    children: ReactNode;
  };
  const Sidebar3: React.FC<SidebarProps> = ({ children }) => {


    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
  



  return (
    <div > <Sheet >
    <SheetTrigger  asChild className='cursor-pointer'>
    {children}
    </SheetTrigger>
    <SheetContent className={`pt-10 w-2/5 ${isOpen?'bg-gray-200':''}  ` } >
    
      <div className="p-6  shadow rounded-lg space-y-6">
      {/* Gift Section */}
      <div className="flex items-center space-x-4">
        <FaGift className="text-red-500 text-8xl" />
        <div>
          <h1 className="text-xl  text-gray-800">You get gift Rs. 150</h1>
          <p className="text-gray-500">I’m inviting you to use Clicky pay, A simple and secure payments app</p>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Share Options */}
      <div className="flex justify-between items-center px-8 text-gray-700">
        {/* WhatsApp */}
        <div className="flex flex-col items-center">
          <FaWhatsapp className="text-green-500 text-4xl" />
          <span className="mt-2 text-sm">WhatsApp</span>
        </div>

        {/* Copy Link */}
        <div className="flex flex-col items-center">
          <ClipboardCopy className="text-gray-500 text-4xl" />
          <span className="mt-2 text-sm">Copy Link</span>
        </div>

       
        <div onClick={toggleModal} className="flex flex-col items-center">
          <Ellipsis className="text-gray-500 text-4xl" />
          <span className="mt-2 text-sm">More</span>
        </div>
      </div>
    </div>

       

    {isOpen && (
        <div
        className={`fixed bottom-0 w-96 right-0 bg-white p-6 rounded-t-lg shadow-inner transform transition-all duration-300 ease-out ${
          isOpen==true ? "translate-y-0" : "translate-y-full"
        }`}
        >
          <button onClick={toggleModal} className="absolute top-4 right-4">
            X
          </button>
          <p className="text-center text-lg mb-4">Share via</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>Facebook</div>
            <div>LinkedIn</div>
            <div>Twitter</div>
            <div>WhatsApp</div>
            <div>Skype</div>
            <div>SMS</div>
            <div>Gmail</div>
            <div>Messenger</div>
          </div>
        </div>
      )}











    </SheetContent>
  </Sheet></div>
  )
}

export default Sidebar3


  
 
    
  
 
  
