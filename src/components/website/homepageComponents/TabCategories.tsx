'use client'
import { useEffect } from 'react';
import React from 'react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CarosalCategories } from './CarosalCategories'
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from 'react-loading';


const categories: {
  name: string;
  subcategories?: { name: string; image: string; price: string }[];
}[] = [
    {
      name: 'W',

      subcategories: [
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar1.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar2.png', price: '2889' },
        { name: 'Shalwar Kameez', image: '/assets/home/Women/shalwar3.png', price: '2889' },
        { name: 'heels', image: '/assets/home/Women/heels1.png', price: '3889' },
        { name: 'heels', image: '/assets/home/Women/heels2.png', price: '3889' },
        { name: 'heels', image: '/assets/home/Women/heels3.png', price: '3889' },
      ]
    },
    {
      name: 'M',

      subcategories: [
        { name: 'Casual Shoes', image: '/assets/home/Men/CasualShoes1.png', price: '5889' },
        { name: 'Casual Shoes', image: '/assets/home/Men/CasualShoes2.png', price: '5389' },
        { name: 'Casual Shoes', image: '/assets/home/Men/CasualShoes3.png', price: '1889' },
      ]
    },
  ];




const TabCategories = () => {
  const [Categ, setCateg] = useState<string>('W')
  const [shopItems, setShopItems] = useState<{ name: string; image: string; price: string }[]>([]);
  const [items, setItems] = useState<ShopItem[]>([]); // Initialize with the first 10 items
  const [currentIndex, setCurrentIndex] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const handleCategoryClick =  (categoryName: string) => {
    console.log(`Category clicked outside component: ${categoryName} and tab ${Categ}`);

    const  ShopImages =  categories
      .filter((category) => category.name === Categ)
      .flatMap((category) =>
        category.subcategories
          ? categoryName === 'All'
            ? category.subcategories
            : category.subcategories
              .filter((subcategory) => subcategory.name === categoryName)
          : []
      );

    setShopItems(ShopImages);
   
   
  };


  interface ShopItem {
    image: string;
    name: string;
    price: string;
  }



  function SettingCateg(chr: string) {

    setCateg(chr);
  }

 

  useEffect(() => {
    // Call the function with SettingCateg('W') on initial render and when Categ changes


    handleCategoryClick('All');
   
   

  }, [Categ]);

  useEffect(()=>{
    console.log("console loging...",shopItems)
    setItems(shopItems.slice(0,10))
      },[shopItems]);

  // Keep track of the current index

  const fetchMoreData = () => {
    // Fake async API call to fetch more items
    console.log("lets fetch more")
    setTimeout(() => {
      console.log("lets fetch more")
      const newIndex = currentIndex + 10;
      setItems((prevItems) => prevItems.concat(shopItems.slice(currentIndex, newIndex)));
      setCurrentIndex(newIndex);
      if(shopItems.length<=newIndex){
        setHasMore(false)
      }
    }, 1500);
  };



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

          <CarosalCategories Categ={Categ} onCategoryClick={handleCategoryClick} />
        

          <div  >
            <InfiniteScroll
              dataLength={items.length} // This is important field to render the next data
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<ReactLoading type={"bars"} color="black" />}
             
              

            >
              <div    className="flex max-w-6xl flex-wrap ">
            
                {items.map((item, index) => (
                  <div
                    key={index}
                    style={{ width: 'calc(19.3% - 16px)' }}
                    className="py-4 mx-3 flex flex-col items-center justify-center"
                  >
                    <div>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="p-5">
                      <span>Rs{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>

        </Tabs>




      </div>
    </div>
  )
}

export default TabCategories