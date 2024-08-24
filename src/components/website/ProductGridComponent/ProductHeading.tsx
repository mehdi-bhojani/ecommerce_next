import React from 'react'

interface ProductHeadingProps {
  title: string;  // Define the type of `title` as string
}

const ProductHeading: React.FC<ProductHeadingProps> = ({ title }) => {
  return (
    <div className='bg-gray-200 text-center w-full p-2 mt-4'>
        <span className="text-lg font-semibold  ">{title}</span>
        </div>
  )
}

export default ProductHeading