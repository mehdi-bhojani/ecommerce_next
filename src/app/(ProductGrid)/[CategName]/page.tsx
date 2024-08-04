"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Products from '@/components/website/header/ProductGridComponent/Products';
import BreadCrumb from '@/components/website/header/ProductGridComponent/BreadCrumb';
import ProductHeading from '@/components/website/header/ProductGridComponent/ProductHeading';
import Filtering from '@/components/website/header/ProductGridComponent/Filtering';

import ProductItems from '@/shared/json/products.json'



const Page = ({ params }: { params: { CategName: string } }) => {
  const test=params.CategName.split('-');
  console.log(test)
 const TempProd=ProductItems.find(item => item.Category.replace(/-/g, ' ') ===decodeURIComponent(test.slice(1).join('-')).replace(/-/g, ' ')  &&item.Type===test[0] ||item.subCategory.replace(/-/g, ' ') === decodeURIComponent(test.slice(1).join('-')).replace(/-/g, ' ') &&item.Type===test[0])
  const Prod=ProductItems.filter(item => item.Category.replace(/-/g, ' ') === decodeURIComponent(test.slice(1).join('-')).replace(/-/g, ' ') &&item.Type===test[0] ||item.subCategory.replace(/-/g, ' ') === decodeURIComponent(test.slice(1).join('-')).replace(/-/g, ' ') &&item.Type===test[0])
  const Prod2=ProductItems.filter(item => item.Category.replace(/-/g, ' ') === decodeURIComponent(test.slice(1).join('-')).replace(/-/g, ' ') &&item.Type===test[0] ||item.subCategory.replace(/-/g, ' ') === decodeURIComponent(test.slice(1).join('-')).replace(/-/g, ' ') &&item.Type===test[0])
  console.log(Prod)


  interface Product {
    id: number;
    brandName: string;
    name: string;
    subCategory: string;
    Category: string;
    Type: string;
    originalPrice: number;
    discountedPrice: number;
    discount: string;
    sizes: string[];
    slots: { size: string; quantity: number; }[];
    images: string[];
  }



  const [Prods, setProd] = useState<Product[]>(Prod);

  // Function to sort products in ascending order based on discountedPrice
 











  return (

    <div className="bg-white">
      <div className="bg-gray-100 border-b border-gray-300">
        <div className="container mx-auto px-4 py-4">
          <BreadCrumb Temp={TempProd} CategName={decodeURIComponent(test.slice(1).join('-')).replace(/-/g, ' ')} />
          <ProductHeading title={decodeURIComponent(test.slice(1).join('-').replace(/-/g, ' ')) as string} />
          <Filtering Prods={Prods} setProd={setProd} TempProd={Prod2}  />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid py-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Prods.map((product) => (
            <Products key={product.id} product={product} />
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default Page





