'use client'
import React from 'react'
import { Slider } from "@/components/ui/Slider"
import { useEffect } from 'react';
import { useState } from 'react';
import {ChevronDown} from 'lucide-react'
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




const Filtering = () => {
    const [values, setValues] = useState([250, 600]);
  const STEP = 10;
  const MIN = 100;
  const MAX = 1000;

      
    const [isOpen, setIsOpen] = useState(false);
   

    // Assuming you are using a range slider that handles two values
    const [value, setValue] = useState<number[]>([0, 1000]);
    
    const [position, setPosition] = React.useState("bottom")
    const [sortOpen, setSortOpen] = useState(false);
    const [priceRangeOpen, setPriceRangeOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="bg-gray-100 py-4 px-6">
       

      <div className="flex justify-start gap-2 items-center">
        {/* Sort Dropdown */}
        <DropdownMenu>
      <DropdownMenuTrigger className='flex flex-row items-center justify-center gap-1' asChild>
        <Button  variant="outline">Sort<ChevronDown size={14}/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>What's new</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Price Low To High</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Price High To Low</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Discount Low To High</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>

        {/* Price Range Dropdown */}
        <DropdownMenu>
      <DropdownMenuTrigger className='flex flex-row items-center justify-center gap-1' asChild>
        <Button variant="outline">Price Range<ChevronDown size={14}/></Button>
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
        onChange={setValues}
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

      <Sidebar2>
        <Button variant="outline">Filters<ChevronDown size={14}/></Button>
        </Sidebar2>
      </div>
    </div>
  )
}

export default Filtering