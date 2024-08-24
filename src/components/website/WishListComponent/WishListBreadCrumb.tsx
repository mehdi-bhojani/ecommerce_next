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
const WishListBreadCrumb = () => {
  return (
    < Breadcrumb className='font-semibold text-black' >
   <BreadcrumbList>
   <Link href='/'>
   <BreadcrumbItem>Home</BreadcrumbItem>
   </Link>
   <BreadcrumbSeparator/>
   <Link href={`/wishlist`}>
   <BreadcrumbItem>WishList</BreadcrumbItem>
   </Link>
   
   </BreadcrumbList>
   </Breadcrumb>
  )
}

export default WishListBreadCrumb