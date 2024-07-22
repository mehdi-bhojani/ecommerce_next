import React from 'react'
import ban1 from '@/app/(Assets)/banner1.png';
import ban2 from '@/app/(Assets)/banner2.png';
import box1 from '@/app/(Assets)/box1.png';
import box2 from '@/app/(Assets)/box2.png';
import Image from 'next/image';
const Exclusive = () => {
  return (
    <div className='text-center'>
      <span className='font-sans font-bold text-center text-3xl py-10' >
   EXCLUSIVE FOR YOU
        </span>
        <div className='flex flex-row flex-wrap justify-between '>
   
  
   <Image 
      src={ban1}
      className='w-full'
      alt="Picture of the author"/>
   
       
     

          <Image 
      src={ban2}
       className='w-full'
      alt="Picture of the author"/>


<Image 
      src={box1}
       className='w-6/12'
      alt="Picture of the author"/>
      <Image 
      src={box2}
       className='w-6/12'
      alt="Picture of the author"/>

</div>

    </div>
  )
}

export default Exclusive