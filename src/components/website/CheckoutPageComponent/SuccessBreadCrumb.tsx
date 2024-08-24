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
const SuccessBreadCrumb = () => {
  return (
    < Breadcrumb className='font-semibold text-black' >
   <BreadcrumbList>
   <Link href='/'>
   <BreadcrumbItem>Home</BreadcrumbItem>
   </Link>
   <BreadcrumbSeparator/>
   <Link href={`/Order-Success`}>
   <BreadcrumbItem>OrderSuccess</BreadcrumbItem>
   </Link>
   
   </BreadcrumbList>
   </Breadcrumb>
  )
}

export default SuccessBreadCrumb