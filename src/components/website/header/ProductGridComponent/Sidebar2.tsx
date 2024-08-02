
"use client"
import React, { ReactNode } from 'react'
import { SlidersHorizontal,Check } from 'lucide-react';
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
type SidebarProps = {
    children: ReactNode;
};

interface SizeState {
    S: boolean;
    M: boolean;
    L: boolean;
    XL: boolean;
    XXL: boolean;
    'Free Size': boolean;
}
interface ListItem {
    id: number;
    label: string;
    count: number;
  }
  interface BrandItem {
    id: number;
    label: string;
   
  }
const options = [
    { id: 1, label: 'Size' },
    { id: 2, label: 'Brand' },
    { id: 3, label: 'Subcategory' },
  
];
const brandOptions:BrandItem[]= [
    { id: 1, label: "GulAhmed" },
    { id: 2, label: "Bata" },
    { id: 3, label: "WEST LINE" },
];
const SubCategoryOptions:BrandItem[]= [
    { id: 1, label: "Pants" },
    { id: 2, label: "Shirts" },
    { id: 3, label: "Tops" },
];
const listItems: ListItem[] = [
    {id:1, label: 'L', count: 11 },
    {id:2, label: 'S', count: 3 },
    {id:3, label: 'M', count: 8 },
    {id:4, label: 'L', count: 7 },
    {id:5, label: 'xL', count: 5 },

]
const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const [selected, setSelected] = useState<number | null>(1);
    const [selectedId, setSelectedId] = useState<number[] | null>([]);
    const [selectedIdBrand, setSelectedIdBrand] = useState<number[] | null>([]);
    const [selectedIdCateg, setSelectedIdCateg] = useState<number[] | null>([]);
    const [sizes, setSizes] = useState<SizeState>({
        S: false,
        M: true,
        L: true,
        XL: false,
        XXL: false,
        'Free Size': true
    });
    const handleSelect = (id: number) => {
        setSelectedId(prev => {
            const current = prev ?? []; // Default to empty array if prev is null or undefined
            return current.includes(id) 
              ? current.filter(selectedId => selectedId !== id) 
              : [...current, id];
     } );
      };
      const handleSelectBrand = (id: number) => {
        setSelectedIdBrand(prev => {
            const current = prev ?? []; // Default to empty array if prev is null or undefined
            return current.includes(id) 
              ? current.filter(selectedId => selectedId !== id) 
              : [...current, id];
     } );
      };
      const handleSelectCateg = (id: number) => {
        setSelectedIdCateg(prev => {
            const current = prev ?? []; // Default to empty array if prev is null or undefined
            return current.includes(id) 
              ? current.filter(selectedId => selectedId !== id) 
              : [...current, id];
     } );
      };
    
    
   




    const handleSizeChange = (size: keyof SizeState) => {
        setSizes(prevSizes => ({ ...prevSizes, [size]: !prevSizes[size] }));
    };
    return (
        <div > <Sheet  >
            <SheetTrigger asChild className='cursor-pointer'>
                {children}
            </SheetTrigger>
            <SheetContent side={'extra'}  >
                <div className="flex justify-between  items-center bg-white px-12 py-4  border-b">
                    <div className='flex flex-row gap-1 items-center  text-gray-400 justify-center'>
                        <SlidersHorizontal size={15} />
                        <span className="text-sm font-semibold ">Filter</span>
                    </div>

                    <button
                        className="text-red-600 text-sm font-medium hover:text-red-800"
                        onClick={() => console.log('Clear all filters')}
                    >
                        CLEAR ALL
                    </button>
                </div>

                <div style={{height:'85%'}} className="flex  ">

                    <div className="bg-white  text-black w-1/2 py-2">
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className={`flex flex-row justify-between px-4 py-8 cursor-pointer hover:bg-gray-100  font-semibold text-lg ${selected === option.id ? 'bg-gray-100 ' : 'hover:bg-gray-700'}`}
                                onClick={() => setSelected(option.id)}
                            >
                                <span>{option.label}</span>
                                <span>{option.id===1 ? (selectedId?.length===0 ?'':selectedId?.length) :option.id===2 ? (selectedIdBrand?.length===0 ?'':selectedIdBrand?.length):option.id===3 ? (selectedIdCateg?.length===0 ?'':selectedIdCateg?.length):'error' }</span>
                            </div>
                        ))}
                    </div>


                    <div className='bg-gray-200 w-1/2'>
                 
      {selected === 1 && listItems.map(item => (
        <div
          key={item.id}
          className={`flex justify-between items-center px-4 py-8 cursor-pointer
                      ${selectedId?.includes(item.id) ? 'bg-white text-black font-semibold' : 'bg-gray-100'}`}
          onClick={() => handleSelect(item.id)}
        >
          <div className="flex items-center gap-4">
            
            <Check color={`${selectedId?.includes(item.id) ? 'red' : 'gray'}`}/>
            {item.label}
          </div>
          <span>{item.count}</span>
        </div>
      ))}
       {selected === 2 && brandOptions.map(item => (
        <div
          key={item.id}
          className={`flex justify-between items-center px-4 py-8 cursor-pointer
                      ${selectedIdBrand?.includes(item.id) ? 'bg-white text-black font-semibold' : 'bg-gray-100'}`}
          onClick={() => handleSelectBrand(item.id)}
        >
          <div className="flex items-center gap-4">
            
            <Check color={`${selectedIdBrand?.includes(item.id) ? 'red' : 'gray'}`}/>
            {item.label}
          </div>
        
        </div>
      ))}
      {selected === 3 && SubCategoryOptions.map(item => (
        <div
          key={item.id}
          className={`flex justify-between items-center px-4 py-8 cursor-pointer
                      ${selectedIdCateg?.includes(item.id) ? 'bg-white text-black font-semibold' : 'bg-gray-100'}`}
          onClick={() => handleSelectCateg(item.id)}
        >
          <div className="flex items-center gap-4">
            
            <Check color={`${selectedIdCateg?.includes(item.id) ? 'red' : 'gray'}`}/>
            {item.label}
          </div>
        
        </div>
      ))}
    </div>

                  


                </div>







                <div style={{height:'16%'}} className="flex justify-between items-center  ">
                    <button
                        className="text-gray-800 font-medium w-1/2 h-full pb-14   hover:text-gray-600 transition duration-300 ease-in-out  hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white"
                        onClick={() => console.log('Close action')}
                    >
                        Close
                    </button>
                    <button
                        className="text-red-500 font-medium w-1/2  h-full pb-14  transition duration-300 ease-in-out
                   hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white"
                        onClick={() => console.log('Apply filters')}
                    >
                        APPLY
                    </button>
                </div>













                {/* <div className="flex">
    <div className="flex flex-col p-4 bg-white shadow-lg w-64">
            <h2 className="text-lg font-semibold mb-4">Filter</h2>
            <div className="mb-6">
                <h3 className="font-medium mb-2">Size</h3>
                {Object.keys(sizes).map((size) => (
                    <div key={size} className="flex items-center mb-2">
                        <input
                            id={`size-${size}`}
                            type="checkbox"
                            checked={sizes[size as keyof SizeState]}
                            onChange={() => handleSizeChange(size as keyof SizeState)}
                            className="accent-red-500" // Customize the checkbox color
                        />
                        <label htmlFor={`size-${size}`} className="ml-2 text-sm cursor-pointer">{size}</label>
                    </div>
                ))}
            </div>
            <button className="bg-red-500 text-white py-2 rounded hover:bg-red-600">Apply</button>
            <button className="mt-4 text-gray-500 py-2 hover:text-gray-700">Clear All</button>
        </div>
     </div> */}
            </SheetContent>
        </Sheet></div>
    )
}


export default Sidebar