import React from 'react'
import Image from 'next/image'
const DealZone = () => {
  return (
    <div className='text-center max-w-5xl mx-auto '>
 <span className='font-sans font-bold text-3xl py-10' >
   DEAL ZONE
        </span>

        <div className='flex flex-row justify-between flex-wrap  '>
        <Image className='border px-1 w-64'width={100}  
        height={100}
       src={'/assets/home/circle1.png'}  alt='the logo'/>
        <Image className='border px-1 w-64'  width={100}
        height={100}
       src={'/assets/home/circle2.png'} alt='the logo'/>
        <Image className='border px-1 w-64 '  width={100}
        height={100}
       src={'/assets/home/circle3.png'} alt='the logo'/>
        <Image className='border px-1 w-64'  width={100}
        height={100}
       src={'/assets/home/circle4.png'} alt='the logo'/>
         

       
     
       










        </div>

    </div>
  )
}

export default DealZone