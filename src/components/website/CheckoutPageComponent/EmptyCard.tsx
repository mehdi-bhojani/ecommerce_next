import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const EmptyCard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div style={{top:'-104px'}} className="text-center flex flex-col justify-center items-center  relative">
    
      <div className="mb-6">
        <Image
          src="/assets/home/empty-cart.svg" // Replace with the correct path to your image
          alt="Empty Cart"
          width={350}
          height={350}
          className="mx-auto"
        />
      </div>

    
      <span className="text-2xl font-semibold text-gray-800">
        Your Cart is <span className="text-red-500">Empty!</span>
      </span>

     
      <span className="mt-2 text-gray-600">
        Must add items to the cart before you proceed to check out.
      </span>
      <Link
      href='/'
     
        className="mt-6 bg-red-500 text-white px-4 py-2  shadow-md hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400"
      >
         <span className="inline-block mr-2">🛒</span> RETURN TO SHOP
      </Link>
    
    
    </div>
  </div>
  )
}

export default EmptyCard