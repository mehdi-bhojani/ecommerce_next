"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, Tag, Trash2 } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import CheckoutCard from '@/components/website/CheckoutPageComponent/CheckoutCard'
import CouponDialog from '@/components/website/CheckoutPageComponent/CouponDialog'
import CheckoutDetails from '@/components/website/CheckoutPageComponent/CheckoutDetails'

const page = () => {



  const [value, setValue] = React.useState("")

  const [ProductCheckout, setProductCheckout] = useState([
    {id:123,
      OriginalPrice: 2450,
      DiscountedPrice: 4900,
      Discount: -50,
      ProductName: 'crinkle satin full sleeve shirt',
      Sizes: ['S', 'M', 'L', 'XL'],
      img: '/assets/Checkout/girlcloth.png'
    },
    {id:657,
      OriginalPrice: 1395,
      DiscountedPrice: 1800,
      Discount: -22,
      ProductName: 'crinkle satin full sleeve shirt',
      Sizes: ['Medium', 'Large', 'XLarge'],
      img: '/assets/Checkout/girlcloth.png'
    }
  ]);


  const handleRemove = (index:number) => {
    const updatedCheckout = ProductCheckout.filter((item, i) => item.id !== index);
    setProductCheckout(updatedCheckout);
  };

  const SubTotal=ProductCheckout.reduce((total, product) => {
    return total + product.OriginalPrice;
  }, 0)

  function Convert_to_Format(num:number){
    return  new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  }



  return (
    <div className='flex flex-row gap-1 sm:mx-20 sm:mt-5 '>
      <div className='flex flex-col gap-1 w-3/5 mb-10 m-2  hidden sm:block'>
       <CheckoutDetails className={``} />
      </div>
{/* those devices which are not mobile put sm  */}
      <div className='flex flex-col gap-1 w-full sm:w-2/5'>

        <div className='bg-white sm:m-2 sm:p-2'>
          <span className='font-semibold'> Coupons</span>
          <div className="flex items-center justify-between p-4  border-gray-200 ">
            <div className="flex items-center gap-1">
              <Tag />
              <h2 className="text-lg font-semibold">Apply Coupons</h2>
            </div>
            <CouponDialog>
            <button className="px-4 py-2 text-pink-600 border border-pink-600 rounded-md hover:bg-pink-50">
              APPLY
            </button>
            </CouponDialog>
          </div>
        </div>

        <div>



          <div className="p-6 bg-white rounded-lg shadow-lg  sm:max-w-md mx-auto ">
          {ProductCheckout.map((product, index) => (
        <CheckoutCard 
          key={product.id} 
          ProductCheckout={product}
          onRemove={() => handleRemove(product.id)} 
        />
      ))}

            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Subtotal</span>
                <span className="text-sm font-medium text-gray-700">{Convert_to_Format(SubTotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Delivery Charges</span>
                <span className="text-sm font-medium text-gray-700">{Convert_to_Format(200)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{Convert_to_Format(SubTotal+200)}</span>
              </div>
            </div>
          </div>

        </div>

<div>
<Button variant={'destructive'} className='px-12 w-full mt-5 sm:hidden '  type='submit'><Link href={'/checkout/AddDetail'}>Proceed</Link></Button>
</div>
      </div>

    </div>
  )
}

export default page