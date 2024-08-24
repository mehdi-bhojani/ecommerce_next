"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Boxes, Flame, House, UserRound } from 'lucide-react';


const ResponsiveFooter = () => {
    const [Flag, setFlag] = useState(0)
    const navItems = [
        {id:1,
          name: 'Home',
          icon: <House fill={`${Flag==1?'true':'none'}`} stroke='gray'/>,
          alt: 'Home Icon',
          link: '/',
        },
        {id:2,
          name: 'Category',
          icon: <Boxes fill={`${Flag==2?'true':'none'}`}  stroke='gray'/>,
          alt: 'Category Icon',
          link: '/category',
        },
        
        {id:3,
          name: 'New Arrivals',
          icon: <Flame fill={`${Flag==3?'true':'none'}`} stroke='gray'/>,
          alt: 'New Arrivals Icon',
          link: '/new-arrivals',
        },
        {id:4,
          name: 'Account',
          icon: <UserRound fill={`${Flag==4?'true':'none'}`} stroke='gray' />,
          alt: 'Account Icon',
          link: 'my/account',
        },
      ];
  return (
    <footer className="fixed bottom-0 w-full bg-white border-t border-gray-200  md:hidden">
    <div className="flex justify-around items-center h-16">

    {navItems.map((item,index) => (
          <Link href={item.link} key={item.id} onClick={()=>setFlag(item.id)}>
           <div className="flex flex-col items-center">
             {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
              </div>
          </Link>
        ))}

     

    </div>
  </footer>
  )
}

export default ResponsiveFooter