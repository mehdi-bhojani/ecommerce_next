import React, { FC } from 'react'
import Image from 'next/image'
import {Heart} from 'lucide-react';

interface Product {
    id: number;
    brand: string;
    name: string;
    price: string;
    discount: string;
    originalPrice: string;
    image: string;
  }

  interface ProductCardProps {
    product: Product;
  }



  const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-1 relative">
    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
      -{product.discount}
    </div>
    <Image width={100} height={100} src={product.image} alt={product.name} className="mb-2 w-full h-64 object-cover" />
    <div className="absolute top-2 right-2">
 
    <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md icon-wrapper">
 <Heart size={19} className="text-gray-500 icon" />
</div>

    </div>
    <div className="mt-4">
      <p className="text-sm text-gray-500 uppercase">{product.brand}</p>
      <p className="text-lg font-semibold">{product.name}</p>
      <div className="flex items-center space-x-2">
        <p className="text-gray-500 line-through">Rs {product.originalPrice}</p>
        <p className="text-red-500 font-bold">Rs {product.price}</p>
      </div>
    </div>
  </div>
  )
}

export default ProductCard