"use client"
import React from 'react'
import Image from 'next/image'
import {CircleChevronLeft} from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/website/homepageComponents/Sidebar'
const MinHeader = () => {
    return (
        <div className='flex flex-row items-center md:justify-between  justify-around md:px-12 '>
                 <Link href="/">
                <div>
                    <Image className=' ' width={110}
                        height={30} src={'/assets/home/logo.png'} alt='the logo' />
                </div>
                </Link>

            <div className='flex flex-row gap-4 font-semibold text-sm items-center'>
                <Link href="/">
                <div className='flex flex-row gap-1 items-center text-xs md:text-sm text-nowrap'>
                    <CircleChevronLeft/>
                <span>BACK TO SHOPPING</span>
                </div>
                </Link>
                <Sidebar>
                    <div className='text-nowrap px-2 text-xs md:text-sm'>
                    <span>SIGN IN</span>
                    </div>
              

                </Sidebar>
               
            </div>

        </div>
    )
}

export default MinHeader