import React from 'react'
import Image from 'next/image'
import {CircleChevronLeft} from 'lucide-react'
import Link from 'next/link'
const MinHeader = () => {
    return (
        <div className='flex flex-row items-center justify-between px-12 bg-slate-400'>
                 <Link href="/">
                <div>
                    <Image className=' ' width={80}
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
                
                <span>SIGN IN</span>
            </div>

        </div>
    )
}

export default MinHeader