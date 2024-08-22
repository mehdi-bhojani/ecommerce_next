
"use client"
import React, { ReactNode, useEffect } from 'react'
import { SlidersHorizontal, Check } from 'lucide-react';
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
type SidebarProps = {
  children: ReactNode;
  Prods: Products[];
  setProd: React.Dispatch<React.SetStateAction<Products[]>>;
  TempProd:Products[];
};


const options = [
  { id: 1, label: 'Size' },
  { id: 2, label: 'Brand' },
  { id: 3, label: 'Subcategory' },

];







 const Sidebar: React.FC<SidebarProps> = ({ children, Prods, setProd ,TempProd}) => {
  const [selected, setSelected] = useState<number | null>(1);
  const [selectedId, setSelectedId] = useState<number[] >([]);
  const [selectedIdBrand, setSelectedIdBrand] = useState<number[] >([]);
  const [selectedIdCateg, setSelectedIdCateg] = useState<number[] >([]);
  const [allSizes, setAllSizes] = useState<string[]>([]);
  const [sizeCounts, setSizeCounts] = useState<{ [key: string]: number }>({});
  const [allBrands, setAllBrands] = useState<string[]>([]);
  const [allSubCateg, setAllSubCateg] = useState<string[]>([]);


  const [sheetOpen ,setSheetOpen]=useState(false)
 

  function Clear(){
    setSelectedIdBrand([])
    setSelectedIdCateg([])
    setSelectedId([])
    setProd(TempProd);

    setSheetOpen(false);
  }

  function Apply(){
    if (selectedIdBrand.length != 0 || selectedIdCateg.length != 0 || selectedId.length != 0) {
      console.log("yahooo! me")
    const FiltersizesSet = new Set<string>();
    const FilterBrandSet = new Set<string>();
    const FilterSubCategSet = new Set<string>();

    
      
  
allSizes.map((item,index)=>{
 if(selectedId?.includes(index)){
  FiltersizesSet.add(item)
 }
})
allBrands.map((item,index)=>{
  if(selectedIdBrand?.includes(index)){
   FilterBrandSet.add(item)
  }
 })
 allSubCateg.map((item,index)=>{
  if(selectedIdCateg?.includes(index)){
   FilterSubCategSet.add(item)
  }
 })
 console.log(Array.from(FiltersizesSet))
 console.log(Array.from(FilterBrandSet))
 console.log(Array.from(FilterSubCategSet))

 setProd(TempProd.filter((item) => 
  FilterBrandSet.has(item.brandName) || 
  FilterSubCategSet.has(item.subCategory) || 
  item.sizes.some(size => FiltersizesSet.has(size))
));

console.log(Prods)
    }

setSheetOpen(false);
  }

  
  useEffect(() => {
    const sizesSet = new Set<string>();
    const BrandSet = new Set<string>();
    const SubCategSet = new Set<string>();
    const sizeMap: { [key: string]: number } = {};

    Prods.forEach(product => {
      BrandSet.add(product.brandName);
      SubCategSet.add(product.subCategory)
      product.sizes.forEach(size => {
        sizesSet.add(size);

        sizeMap[size] = (sizeMap[size] || 0) + 1;
      });
    });

    const uniqueSizes = Array.from(sizesSet);
    setAllSizes(uniqueSizes);
    setAllBrands(Array.from(BrandSet))
    setAllBrands(Array.from(BrandSet))
    setAllSubCateg(Array.from(SubCategSet));
    setSizeCounts(sizeMap)
  }, []);





  const handleSelect = (id: number) => {
    setSelectedId(prev => {
      const current = prev ?? []; // Default to empty array if prev is null or undefined
      return current.includes(id)
        ? current.filter(selectedId => selectedId !== id)
        : [...current, id];
    });
  };
  const handleSelectBrand = (id: number) => {
    setSelectedIdBrand(prev => {
      const current = prev ?? []; // Default to empty array if prev is null or undefined
      return current.includes(id)
        ? current.filter(selectedId => selectedId !== id)
        : [...current, id];
    });
  };
  const handleSelectCateg = (id: number) => {
    setSelectedIdCateg(prev => {
      const current = prev ?? []; // Default to empty array if prev is null or undefined
      return current.includes(id)
        ? current.filter(selectedId => selectedId !== id)
        : [...current, id];
    });
  };





  // const [sheetOpen ,setSheetOpen]=useState(true)




  return (
    <div > <Sheet open={sheetOpen} onOpenChange={setSheetOpen}  >
      <SheetTrigger  asChild className='cursor-pointer'>
        {children}
      </SheetTrigger>
      <SheetContent side={'extra'}  >
        <div className="flex justify-between  items-center bg-white px-12 py-4  border-b">
          <div className='flex flex-row gap-1 items-center  text-gray-400 justify-center'>
            <SlidersHorizontal size={15} />
            <span className="text-sm font-semibold ">Filter</span>
          </div>

        
        </div>

        <div style={{ height: '85%' }} className="flex  ">

          <div className="bg-white  text-black w-1/2 ">
            {options.map((option) => (
              <div
                key={option.id}
                className={`flex flex-row justify-between px-4 py-8 cursor-pointer hover:bg-gray-100  font-semibold text-lg ${selected === option.id ? 'bg-gray-100 ' : 'hover:bg-gray-700'}`}
                onClick={() => setSelected(option.id)}
              >
                <span>{option.label}</span>
                <span>{option.id === 1 ? (selectedId?.length === 0 ? '' : selectedId?.length) : option.id === 2 ? (selectedIdBrand?.length === 0 ? '' : selectedIdBrand?.length) : option.id === 3 ? (selectedIdCateg?.length === 0 ? '' : selectedIdCateg?.length) : 'error'}</span>
              </div>
            ))}
          </div>


          <div className='bg-gray-200 w-1/2'>

            {selected === 1 && allSizes.map((item, Index) => (
              <div
                key={Index}
                className={`flex justify-between items-center px-4 py-8 cursor-pointer
                      ${selectedId?.includes(Index) ? 'bg-white text-black font-semibold' : 'bg-gray-100'}`}
                onClick={() => handleSelect(Index)}
              >
                <div className="flex items-center gap-4">

                  <Check color={`${selectedId?.includes(Index) ? 'red' : 'gray'}`} />
                  {item}
                </div>
                <span>{sizeCounts[item]}</span>
              </div>
            ))}
            {selected === 2 && allBrands.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center px-4 py-8 cursor-pointer
                      ${selectedIdBrand?.includes(index) ? 'bg-white text-black font-semibold' : 'bg-gray-100'}`}
                onClick={() => handleSelectBrand(index)}
              >
                <div className="flex items-center gap-4">

                  <Check color={`${selectedIdBrand?.includes(index) ? 'red' : 'gray'}`} />
                  {item}
                </div>

              </div>
            ))}
            {selected === 3 && allSubCateg.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center px-4 py-8 cursor-pointer
                      ${selectedIdCateg?.includes(index) ? 'bg-white text-black font-semibold' : 'bg-gray-100'}`}
                onClick={() => handleSelectCateg(index)}
              >
                <div className="flex items-center gap-4">

                  <Check color={`${selectedIdCateg?.includes(index) ? 'red' : 'gray'}`} />
                  {item}
                </div>

              </div>
            ))}
          </div>




        </div>







        <div style={{ height: '16%' }} className="flex justify-between items-center  ">
          <button
            className="text-gray-800 font-medium w-1/2 h-full pb-14  text-red-600 text-sm font-medium hover:text-red-800 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white"
            onClick={() => Clear()}
          >
          CLEAR ALL
          </button>
          <button
            className="text-red-500 font-medium w-1/2  h-full pb-14  transition duration-300 ease-in-out
                   hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white"
            onClick={() => Apply()}
          >
            APPLY
          </button>
        </div>

      </SheetContent>
    </Sheet></div>
  )
}


export default Sidebar