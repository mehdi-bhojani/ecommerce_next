"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Boxes, ChevronDown, Flame, House, UserRound } from 'lucide-react';
import { useParams, useSearchParams } from "next/navigation";
import { usePathname } from 'next/navigation';
import CategSidebar from '../homepageComponents/CategSidebar';
import { motion } from 'framer-motion';
import { navigations } from "@/constants/data";
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
type ResponsiveFooterProps = {

};

const ResponsiveFooter: React.FC<ResponsiveFooterProps> = () => {

  const [isOpen, setIsOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };
  const Sidebar = () => {
    const categories = [
      {
        title: "men",
        image: "/path/to/men-image.png",
        bgColor: "bg-blue-400",
      },
      {
        title: "women",
        image: "/path/to/women-image.png",
        bgColor: "bg-pink-400",
      },
      {
        title: "kids",
        image: "/path/to/kids-image.png",
        bgColor: "bg-yellow-400",
      },
      {
        title: "beauty",
        image: "/path/to/beauty-image.png",
        bgColor: "bg-pink-500",
      },
      {
        title: "others",
        image: "/path/to/others-image.png",
        bgColor: "bg-gray-400",
      },
    ];
    {/* <span className="text-xl">&#9660;</span> */ }
    {/* <Image
           src={category.image}
           alt={`${category.title} image`}
           width={150}
           height={150}
           className="object-contain"
         /> */}






    return (
      <motion.div
        initial={{ x: isOpen == true ? '-100%' : '' }} // Start position off-screen to the left
        animate={{ x: isOpen == true ? '0%' : '-100%' }} // Animate to on-screen position or off-screen to the right
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full mt-12  bg-white shadow-lg w-full z-50 md:hidden"
      >
        <Accordion type="single" collapsible  className="w-full h-full overflow-y-auto pb-32  ">
          {categories.map((category, index) => (
           <AccordionItem  value={index.toString()}>
              <div
                key={index}
                className={`flex justify-between items-center ${category.bgColor} p-6 border-b-2`}
              >
                <AccordionTrigger >
                  <span className="text-2xl text-white w-32  font-bold">{category.title.toUpperCase()}</span>
                 
                </AccordionTrigger>

              </div>

              <AccordionContent>
                {navigations.find((item) => item.type == category.title)?.categories.map((navig) => (
                  <div >
                    <div className='bg-gray-200 w-full font-bold text-xl p-2'>
                      <span>{navig.Category}</span>
                    </div>

                    <div className='flex flex-col gap-1'>
                      {navig.subcategories?.map((item) => (
                        <div >
                          <div className=' p-2 font-semibold gap-2 flex flex-row justify-start items-center'> 
                          <Image className=' object-cover rounded-full w-10 h-10' alt='go' width={100} height={100} src='/assets/home/Men/CasualShoes1.png'/>
                          <span className=' text-lg'>{item.name}</span>
                          </div>
                          <Separator />
                        </div>
                      ))}

                    </div>




                  </div>

                ))}
              </AccordionContent>

              </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    )
  }



























  const [Flag, setFlag] = useState(false)
  const pathname = usePathname()
 

  const navItems = [
    {
      id: 1,
      name: 'Home',
      icon: <House  stroke='gray' />,
      alt: 'Home Icon',
      link: '/',
    },
    {
      id: 2,
      name: 'Category',
      icon: <Boxes  stroke='gray' />,
      alt: 'Category Icon',
      link: '#',
    },

    {
      id: 3,
      name: 'New Arrivals',
      icon: <Flame  stroke='gray' />,
      alt: 'New Arrivals Icon',
      link: '/New-Arrivals',
    },
    {
      id: 4,
      name: 'Account',
      icon: <UserRound  stroke='gray' />,
      alt: 'Account Icon',
      link: 'my/account',
    },
  ];
  const [sheetOpen, setSheetOpen] = useState(false)








  return (
    <div>
      <Sidebar />

      <footer className="fixed bottom-0 w-full  bg-white border-t z-50 border-gray-200  md:hidden">
        <div className="flex justify-around items-center h-16">

          {navItems.map((item, index) =>
            item.id === 2 ? (
              // <CategSidebar key={item.id} sheetOpen={sheetOpen} setSheetOpen={setSheetOpen}>
              <Link href={item.link} onClick={() => [setFlag(!Flag), setIsOpen(!isOpen)]}>
                <div className="flex flex-col items-center">
                  {item.icon}
                  <span className="text-xs mt-1">{item.name}</span>
                </div>
              </Link>
              // </CategSidebar>
            ) : (<Link href={item.link} >
              <div className="flex flex-col items-center">
                {item.icon}
                <span className="text-xs mt-1">{item.name}</span>
              </div>
            </Link>)
          )}




        </div>
      </footer>
    </div>
  )
}





export default ResponsiveFooter;