'use client'

import React from 'react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CarosalCategories } from './CarosalCategories'






const TabCategories = () => {
  const [Categ, setCateg] = useState<string>('W')


  function SettingCateg(chr:string) {
    console.log(chr);
    setCateg(chr);
  }
  return (
    <div className='m-auto max-w-7xl'>
    <div className='flex justify-around ' >
<Tabs defaultValue="Women" className=" w-full flex items-center flex-col">
  <TabsList className='w-full'>
    <TabsTrigger className='hover:text-black hover:underline focus:underline ' onClick={() => SettingCateg('W')} value="Women">WOMEN</TabsTrigger>
    <TabsTrigger className='hover:text-black hover:underline focus:underline ' onClick={() => SettingCateg('M')} value="Men">MEN</TabsTrigger>
    <TabsTrigger className='hover:text-black hover:underline focus:underline ' onClick={() => SettingCateg('G')} value="Girls">GIRLS</TabsTrigger>
    <TabsTrigger className='hover:text-black hover:underline focus:underline ' onClick={() => SettingCateg('B')} value="Boys">BOYS</TabsTrigger>
    <TabsTrigger className='hover:text-black hover:underline focus:underline ' onClick={() => SettingCateg('BE')} value="Beauty">BEAUTY</TabsTrigger>
    <TabsTrigger className='hover:text-black hover:underline focus:underline ' onClick={() => SettingCateg('H')} value="Home">HOME</TabsTrigger>
  </TabsList>
  
  <CarosalCategories Categ={Categ}/>
  <TabsContent value="Men">Make changes to your account here.</TabsContent>
  <TabsContent value="Women">Change your password here.</TabsContent>
</Tabs>




    </div>
    </div>
  )
}

export default TabCategories