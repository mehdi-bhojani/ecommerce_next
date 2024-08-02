"use client"
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Products from '@/components/website/header/ProductGridComponent/Products';
import BreadCrumb from '@/components/website/header/ProductGridComponent/BreadCrumb';
import ProductHeading from '@/components/website/header/ProductGridComponent/ProductHeading';
import Filtering from '@/components/website/header/ProductGridComponent/Filtering';

import ProductItems from '@/shared/json/products.json'
const products = [

 

  { id: 1, brand: 'BRACKETS', name: 'Crinkle Satin Full Sleeve Shirt', price: '2,450', discount: '50%', originalPrice: '4,900', image: '/assets/home/Women/heels1.png' },
  { id: 2, brand: 'WEST LINE', name: 'West Line Women Black Western Top', price: '1,049', discount: '43%', originalPrice: '1,850', image: '/assets/home/Women/heels1.png' },
  { id: 3, brand: 'WEST LINE', name: 'West Line-Women Chiffon Button Down Crop Shirt', price: '1,490', discount: '34%', originalPrice: '2,250', image: '/assets/home/Women/heels1.png' },
  { id: 4, brand: 'WEST LINE', name: 'West Line-Women Chiffon Button Down Crop Shirt', price: '1,490', discount: '34%', originalPrice: '2,250', image: '/assets/home/Women/heels1.png' },
  { id: 5, brand: 'WEST LINE', name: 'West Line-Women Chiffon Button Down Crop Shirt', price: '1,490', discount: '34%', originalPrice: '2,250', image: '/assets/home/Women/heels1.png' },
  { id: 6, brand: 'WEST LINE', name: 'West Line-Women Chiffon Button Down Crop Shirt', price: '1,490', discount: '34%', originalPrice: '2,250', image: '/assets/home/Women/heels1.png' },
];


const Page = ({ params }: { params: { CategName: string } }) => {
 const TempProd=ProductItems.find(item => item.Category === params.CategName ||item.subCategory === params.CategName)
  const Prod=ProductItems.filter(item => item.Category === params.CategName ||item.subCategory === params.CategName)
  console.log(Prod)
  return (

    <div className="bg-white">
      <div className="bg-gray-100 border-b border-gray-300">
        <div className="container mx-auto px-4 py-4">
          <BreadCrumb Temp={TempProd} CategName={params.CategName} />
          <ProductHeading title={params.CategName as string} />
          <Filtering />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid py-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Products key={product.id} product={product} />
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default Page





