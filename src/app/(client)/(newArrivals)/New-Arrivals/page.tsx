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
        className='mt-12 md:mt-0 col-span-1 md:col-span-2 bg-purple-200 flex items-center justify-center w-full  object-cover md:h-full md:object-fill min-h-[100px]'
        alt="Banner 1"
      />

      <TabCategories />

    </div>
  )
}

export default page