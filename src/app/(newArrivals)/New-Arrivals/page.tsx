import TabCategories from '@/components/website/homepageComponents/TabCategories'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div>
         <Image
           
            src={"/assets/home/banner1.png"}
            width={1000}
            height={1000}
            className='col-span-1 mt-20 md:col-span-2 bg-purple-200 flex items-center justify-center w-full  object-cover  h-36  md:h-full md:object-fill'
            alt="Banner 1"
          />
          
      <TabCategories />
     
    </div>
  )
}

export default page