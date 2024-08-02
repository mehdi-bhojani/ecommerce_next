"use client"
import React from 'react'
import Image from 'next/image'
import {CircleChevronLeft} from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/website/homepageComponents/Sidebar'
const MinHeader = () => {
    return (
        <div className='flex flex-row items-center justify-between px-12 '>
                 <Link href="/">
                <div>
                    <Image className=' ' width={110}
                        height={30} src={'/assets/home/logo.png'} alt='the logo' />
                </div>
                </Link>

            <div className='flex flex-row gap-4 font-semibold text-sm items-center'>
                <Link href="/">
                <div className='flex flex-row gap-1 items-center'>
                    <CircleChevronLeft/>
                <span>BACK TO SHOPPING</span>
                </div>
                </Link>
                <Sidebar>
                <span>SIGN IN</span>

                </Sidebar>
               
            </div>

        </div>
    )
}

export default MinHeader