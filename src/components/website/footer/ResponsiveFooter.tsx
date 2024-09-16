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
import ClientLoading from '@/components/myUi/ClientLoading';
import useNavigation from '@/shared/hooks/useNavigation';
import { getRandomColor } from '@/shared/helpers/help';

const ResponsiveFooter = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    const { navigation, loading } = useNavigation();
    if (loading) {
      return <div><ClientLoading /></div>
    }
    return (
      <motion.div
        initial={{ x: isOpen == true ? '-100%' : '' }} // Start position off-screen to the left
        animate={{ x: isOpen == true ? '0%' : '-100%' }} // Animate to on-screen position or off-screen to the right
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full mt-12  bg-white shadow-lg w-full z-50 md:hidden"
      >
        <Accordion type="single" collapsible className="w-full h-full overflow-y-auto pb-32  ">
          {navigation && navigation.length > 0 && navigation.map((category, index) => (
            <AccordionItem key={index} value={category.value}>
              <div
                key={index}
                className={`flex justify-between items-center p-6 border-b-2`}
                style={{ backgroundColor: getRandomColor() }}
              >

                <AccordionTrigger >
                  <span className="text-2xl text-black w-32 font-bold uppercase text-left">{category.value}</span>
                </AccordionTrigger>
              </div>
              <AccordionContent className='transition-all duration-300 ease-in-out'>
                {category.children.length > 0 && category.children.map((subcategory, index) => (
                  <div key={index} >
                    <div className='bg-gray-200 w-full font-bold text-xl p-2'>
                      <span>{subcategory.value}</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                      {subcategory.children.length > 0 && subcategory.children.map((subcategory2, index) => (
                        <div key={index} >
                          <div className=' p-2 font-semibold gap-2 flex flex-row justify-start items-center'>
                            <Image className=' object-cover rounded-full w-10 h-10' alt='go' width={100} height={100} src='/assets/home/Men/CasualShoes1.png' />
                            <span className=' text-lg'>{subcategory2.value}</span>
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
      icon: <House stroke='gray' />,
      alt: 'Home Icon',
      link: '/',
    },
    {
      id: 2,
      name: 'Category',
      icon: <Boxes stroke='gray' />,
      alt: 'Category Icon',
      link: '#',
    },
    {
      id: 3,
      name: 'New Arrivals',
      icon: <Flame stroke='gray' />,
      alt: 'New Arrivals Icon',
      link: '/New-Arrivals',
    },
    {
      id: 4,
      name: 'Account',
      icon: <UserRound stroke='gray' />,
      alt: 'Account Icon',
      link: '/my/account',
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
              <Link key={index} href={item.link} onClick={() => [setFlag(!Flag), setIsOpen(!isOpen)]}>
                <div className={`flex flex-col items-center ${Flag && 'font-bold text-black'}`} >
                  {React.cloneElement(item.icon, {
                    stroke: Flag ? 'black' : 'gray', // Apply conditional stroke color
                  })}
                  <span className={`text-xs mt-1 ${Flag && 'font-bold text-black'}`}>{item.name}</span>
                </div>
              </Link>
              // </CategSidebar>
            ) : (<Link key={index} href={item.link} >
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