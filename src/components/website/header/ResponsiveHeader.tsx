
"use client"
import { Button } from '@/components/ui/button'
import { HeadsetIcon, Bell, User, Heart, ShoppingCart, Search, Package, Facebook } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { useState } from 'react'
import React from 'react'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from "next/link"

import { cn } from "@/lib/utils"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
const ResponsiveHeader = () => {
    return (
        <div className='flex fixed top-0 z-30  bg-white items-center flex-1 px-2 w-full justify-between md:hidden'>


            <Link href={'/'}>

                <Image className=' px-1' width={80}
                    height={120} src={'/assets/home/logo.png'} alt='the logo' />
            </Link>
            <div className='flex flex-row justify-center items-center '>
                <div>
                    <button className='bg-yellow-300 p-2'><Search /></button>
                </div>

                <nav>
                    <ul className='flex '>
                        <li className='px-2'>
                            <Link href="/help-center">
                                <HeadsetIcon />
                            </Link>

                        </li>
                        <li className='px-2'>
                        <Link href="/Notifications">
                            <Bell className='hover:cursor-pointer ' />
                            </Link>



                        </li>
                        {/* <li className='px-2'>


                            <User className='hover:cursor-pointer ' />



                        </li> */}
                        <li className='px-2'>

                        <Link href="/wishlist">
                            <Heart className='hover:cursor-pointer ' />
</Link>



                        </li>
                        <li className='px-2'>
                        <Link href="/Checkout">
                            <ShoppingCart className='hover:cursor-pointer ' />
                            </Link>
                        </li>



                    </ul>
                </nav>
            </div>








        </div>
    )
}

export default ResponsiveHeader