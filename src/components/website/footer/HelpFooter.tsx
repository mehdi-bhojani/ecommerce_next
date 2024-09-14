import Image from 'next/image'
import React from 'react'

const HelpFooter = () => {
  return (
    <div className=' flex-row justify-evenly items-start border-b bg-gray-100 h-full  pb-12 pt-24 hidden md:flex '>


      <div className='flex flex-col gap-3 font-outfit font-bold'>
        <span>HELP & INFORMATION</span>
        <div className=' text-stone-600  flex flex-col gap-2 font-outfit  text-sm '>
          <span>Request a Call Back</span>
          <span>Contact Us</span>
          <span>FAQ & Help Center</span>
        </div>
      </div>








      <div className='flex flex-col gap-3 font-outfit font-bold'>
        <span>ABOUT CLICKY</span>
        <div className='flex flex-col gap-2 font-outfit  text-sm text-stone-600 '>
          <span>About Us</span>
          <span>Privacy Statement</span>
          <span>Terms & Conditions</span>
          <span>Returns & Refunds</span>
        </div>
      </div>


      <div className='flex flex-col gap-3 font-outfit font-bold'>

        <div className='flex flex-col gap-3 font-outfit font-bold'>
          <span>DOWNLOAD OUR APP</span>
          <div className='flex flex-col gap-2 font-outfit  text-sm text-stone-600 '>
            <div className='flex flex-row gap-1'>
              <Image className=' w-1/3 ' width={100} height={0}
                src={`/assets/home/Android-IOS-pic/Android.png`} alt='the banner' />
              <Image className=' w-1/3 ' width={100} height={0}
                src={`/assets/home/Android-IOS-pic/IOS.png`} alt='the banner' />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-3 font-outfit font-bold'>
          <span>KEEP IN TOUCH</span>
          <div className='flex flex-col gap-2 font-outfit  text-sm text-stone-600 '>
            <div className='flex flex-row gap-5'>
              <Image className=' w-1/12 h-1/12 ' width={1000} height={1000}
                src={`/assets/home/Social-medias/facebook.png`} alt='the banner' />
              <Image className='w-1/12 h-1/12 ' width={1000} height={1000}
                src={`/assets/home/Social-medias/insta.png`} alt='the banner' />
              <Image className=' w-1/12 h-1/12 ' width={1000} height={1000}
                src={`/assets/home/Social-medias/twitter.png`} alt='the banner' />
            </div>
          </div>
        </div>

      </div>


      <div className='flex flex-col gap-3 font-outfit font-bold'>
        <span>MORE FROM CLICKY</span>
        <div className='flex flex-col gap-2 font-outfit text-sm text-stone-600 '>
          <span>Sell On Clicky</span>
        </div>
      </div>


      <div className='flex flex-col gap-3 font-outfit font-bold'>
        <span>SHOPPING FROM</span>
        <div className='flex flex-col gap-2 font-outfit  text-sm text-stone-600 '>
          <span>You&aposre in Pakistan</span>
        </div>
      </div>



    </div>
  )
}

export default HelpFooter