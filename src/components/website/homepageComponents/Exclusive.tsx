import React from 'react'
import Image from 'next/image';
const Exclusive = () => {
  return (
    <div className='text-center'>
      <span className='font-sans font-bold text-center text-3xl py-10' >
        EXCLUSIVE FOR YOU
      </span>
      <div className='flex flex-row flex-wrap justify-between '>


        <Image
          src={'/assets/home/banner1.png'}
          width={1000}
          height={1000}
          className='w-full'
          alt="Picture of the author" />




        <Image
          src={'/assets/home/banner2.png'}
          width={1000}
          height={1000}
          className='w-full'
          alt="Picture of the author" />


        <Image
          src={'/assets/home/box1.png'}
          width={1000}
          height={1000}
          className='w-6/12'
          alt="Picture of the author" />
        <Image
          src={'/assets/home/box2.png'}
          width={1000}
          height={1000}
          className='w-6/12'
          alt="Picture of the author" />

      </div>

    </div>
  )
}

export default Exclusive