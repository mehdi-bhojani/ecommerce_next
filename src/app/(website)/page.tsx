import React from 'react'
import DealZone from '@/components/website/homepageComponents/DealZone';
import Exclusive from '@/components/website/homepageComponents/Exclusive';
import Carosal from '@/components/website/homepageComponents/Carosal';
import TopCategories from '@/components/website/homepageComponents/TopCategories';
function Page() {
  return (
    <div>
     
       <Carosal/>
      <div className='w-11/12 mx-auto'>
      <TopCategories/>
       <Exclusive/>
       <DealZone/>
      </div>
     
    
     

    </div>
  )
}

export default Page;