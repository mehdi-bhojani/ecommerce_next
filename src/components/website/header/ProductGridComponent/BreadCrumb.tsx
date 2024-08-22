import React from 'react'
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import Link from 'next/link';

  interface BackBtnProps {
    myText?: {
      images: string;
      title: string;
      url: string;
    };
    
  }


 

interface BreadCrumbProps{
  
    Temp?: {
      brandName: string;
      name: string;
      subCategory: string;
      Category: string;
      Type: string;
      originalPrice: number;
      discountedPrice: number;
      discount: string;
      sizes: string[];
      slots: {
          size: string;
          quantity: number;
      }[];
      images: string[];
    };
  
  CategName: string;
    
  
}

const BreadCrumb:React.FC<BreadCrumbProps> = ({ Temp ,CategName}) => {
  console.log('bread')
  console.log(CategName)
  console.log(Temp?.subCategory)
  return (
   < Breadcrumb className='font-semibold text-black' >
   <BreadcrumbList>
   <Link href='/'>
   <BreadcrumbItem>Home</BreadcrumbItem>
   </Link>
   <BreadcrumbSeparator/>
   <Link href={`/${Temp?.Type}`}>
   <BreadcrumbItem>{Temp?.Type}</BreadcrumbItem>
   </Link>
   {(Temp?.Category && <BreadcrumbSeparator/>)}
   <Link href={`/${Temp?.Category}`}>
   <BreadcrumbItem>{Temp?.Category}</BreadcrumbItem>
   </Link>
   {(CategName===Temp?.subCategory.replace(/-/g, ' ') && <BreadcrumbSeparator/>)}
   {CategName===Temp?.subCategory.replace(/-/g, ' ') ? ( 
      <Link href={`/${Temp?.subCategory}`}>
 <BreadcrumbItem>{Temp?.subCategory}</BreadcrumbItem>
 </Link>
   ):''}
   </BreadcrumbList>
   </Breadcrumb>
  )
}

export default BreadCrumb