'use client'
import React, { FC, useRef } from 'react'
import { Slider } from "@/components/ui/Slider"
import { useEffect } from 'react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react'
import { Range, getTrackBackground } from 'react-range';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';
import Sidebar2 from './Sidebar2';

interface Products {

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

}

interface ProductCardProps {
  Prods: Products[];
  setProd: React.Dispatch<React.SetStateAction<Products[]>>;
  TempProd:Products[];
}



const Filtering: FC<ProductCardProps> = ({ Prods, setProd ,TempProd}) => {
 
  const [values, setValues] = useState<number[]>([0, 10000]);
  const STEP = 10;
  const MIN = 0;
  const MAX = 10000;


  

  const handleChange = (newValues:number[]) => {
    setValues(newValues);
    console.log('Hooray');
    const filteredProducts = TempProd.filter(
      (Prods) => Prods.discountedPrice >= newValues[0] && Prods.discountedPrice <= newValues[1]
    );
     setProd(filteredProducts);
  };


 


 

  const [position, setPosition] = React.useState("bottom")
 



  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


  // Function to sort products based on the current sort order
  const sortProducts = (products: Products[], order: 'asc' | 'desc') => {
    return products.slice().sort((a, b) => {
      return order === 'asc'
        ? a.discountedPrice - b.discountedPrice
        : b.discountedPrice - a.discountedPrice;
    });
  };

  // Effect hook to handle sorting whenever `prods` or `sortOrder` changes
  useEffect(() => {
    if (Prods.length) {
      const sortedProducts = sortProducts(Prods, sortOrder);
      setProd(sortedProducts);
      console.log("Sorting happened:", sortedProducts);
    }
  }, [sortOrder]);


  return (
    <div className="bg-gray-100 py-4 px-6">


      <div className="flex justify-start gap-2 items-center">
        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className='flex flex-row items-center justify-center gap-1' asChild>
            <Button variant="outline">Sort<ChevronDown size={14} /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>What&aposs new</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top">Whats New</DropdownMenuRadioItem>
              <DropdownMenuRadioItem onClick={() => setSortOrder('asc')} value="bottom">Price Low To High</DropdownMenuRadioItem>
              <DropdownMenuRadioItem onClick={() => setSortOrder('desc')} value="right">Price High To Low</DropdownMenuRadioItem>

            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Price Range Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className='flex flex-row items-center justify-center gap-1' asChild>
            <Button variant="outline">Price Range<ChevronDown size={14} /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-96 px-10 py-5">
            <div className="">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-black">{`$${values[0].toFixed(2)} - $${values[1].toFixed(2)}`}</span>
              </div>
              <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={handleChange}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '6px',
                      background: getTrackBackground({
                        values,
                        colors: ['#ccc', '#60a5fa', '#ccc'],
                        min: MIN,
                        max: MAX,
                      }),
                    }}
                    className="w-full rounded"
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '24px',
                      width: '24px',
                      backgroundColor: '#60a5fa'
                    }}
                    className="rounded-full border-2 border-black"
                  />
                )}
              />
            </div>


          </DropdownMenuContent>
        </DropdownMenu>

        <Sidebar2 Prods={Prods} TempProd={TempProd} setProd={setProd} >
          <Button variant="outline">Filters<ChevronDown size={14} /></Button>
        </Sidebar2>
      </div>
    </div>
  )
}

export default Filtering