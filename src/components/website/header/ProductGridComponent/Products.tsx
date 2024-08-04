import React, { FC, useState } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product?: {
    id: number,
    brandName: string,
    name: string,
    subCategory: string,
    Category: string,
    Type: string,
    originalPrice: number,
    discountedPrice: number,
    discount: string,
    sizes: string[],
    slots: { size: string; quantity: number; }[]; // Allow multiple elements
    images: string[]
  },
  key: number



}


const ProductCard: FC<ProductCardProps> = ({ product, key }) => {
  const [activeHearts, setActiveHearts] = useState(new Set());


  const toggleHeart = (id: number) => {
    setActiveHearts(prevActiveHearts => {
      const newActiveHearts = new Set(prevActiveHearts);
      if (newActiveHearts.has(id)) {
        newActiveHearts.delete(id);
      } else {
        newActiveHearts.add(id);
      }
      return newActiveHearts;
    });
  };



  return (
    <div className="border border-gray-200 rounded-lg p-1 relative">
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
        -{product?.discount}
      </div>
      <Image width={100} height={100} src={product?.images[0] ?? 'fallbackImage.jpg'} alt={product?.name ?? ''} className="mb-2 w-full h-64 object-cover" />
      <div className="absolute top-2 right-2">

        <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md icon-wrapper">
          <Heart key={key} onClick={() => toggleHeart(key)} id={key.toString()} size={19} className={`text-gray-500 icon ${activeHearts.has(key) ? 'active' : 'text-gray-500'}`} />
        </div>

      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500 uppercase">{product?.brandName}</p>
        <p className="text-lg font-semibold">{product?.name}</p>
        <div className="flex items-center space-x-2">
          <p className="text-gray-500 line-through">Rs {product?.originalPrice}</p>
          <p className="text-red-500 font-bold">Rs {product?.discountedPrice}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard