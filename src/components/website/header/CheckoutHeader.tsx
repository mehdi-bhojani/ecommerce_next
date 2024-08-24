
"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { CircleChevronLeft } from 'lucide-react'
import Link from 'next/link'


const CheckoutHeader = () => {

    
    return (
        <div className='flex flex-row items-center sm:justify-around sm:px-12 '>
            <Link href="/">
                <div>
                    <Image className=' ' width={110}
                        height={30} src={'/assets/home/logo.png'} alt='the logo' />
                </div>
            </Link>


            <span className='font-bold text-xl'>SHOPPING BAG</span>

            <div className=' flex-row items-center gap-1 hidden sm:flex'>
                <Image className=' ' width={30}
                    height={30} src={'/assets/Checkout/tickShield.png'} alt='the logo' />
                <span className='font-normal text-xl'>100% SECURE</span>
            </div>

        </div>
    )
}

export default CheckoutHeader