"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CarosalCategories } from "./CarosalCategories";
import InfiniteScroll from "react-infinite-scroll-component";
import { CategoryType, CollectionType } from "@/lib/types";
import { ShopItem } from "@/constants/data";
import ProductLoading from "@/components/myUi/productLoading";
import Image from "next/image";
import { getProductsFiltered } from "@/lib/actions/actions";
import { PriceIntoCurrency } from "@/shared/helpers/help";
import ClientLoading from "@/components/myUi/ClientLoading";
const TabCategories = () => {
  const [collection, setCollection] = useState<CollectionType[]>([]);
  const [Categ, setCateg] = useState<CategoryType[]>([]);
  const [items, setItems] = useState<ShopItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string[]>([]);
  const limit = 10;

  const handleCategoryClick = async (categoryID: string[]) => {
    setCategoryId(categoryID);
    setOffset(0);
    try {
      setCategoryLoading(true);
      const { products, hasMoreProducts } = await getProductsFiltered(
        limit,
        0,
        categoryID
      );
      setItems(products);
      setHasMore(hasMoreProducts);
      setOffset(limit);
    } catch (error) {
      console.error("Failed to fetch products for category:", error);
    } finally {
      setCategoryLoading(false);
    }
  };

  const getCollections = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/collection");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data: CollectionType[] = await response.json();
      setCollection(data);
      const subCategories = data[0]?.categories || [];
      setCateg(subCategories);
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCollections();
        // setCategoryLoading(true);
        // if (collection.length > 0) {
        //   const initialCategories = collection[0].categories.map(
        //     (item) => item._id
        //   );
        //   const { products, hasMoreProducts } = await getProductsFiltered(
        //     limit,
        //     0,
        //     initialCategories
        //   );
        //   setItems(products);
        //   setHasMore(hasMoreProducts);
        //   setCategoryId(initialCategories);
        //   setOffset(limit);
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setCategoryLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchMoreData = async () => {
    try {
      const { products, hasMoreProducts } = await getProductsFiltered(
        limit,
        offset,
        categoryId
      );
      setItems((prevItems) => [...prevItems, ...products]);
      setHasMore(hasMoreProducts);
      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.error("Failed to fetch more products:", error);
    }
  };

  const handleCollection = (collectionName: string) => {
    const collectionToShow = collection.find(
      (item) => item.name === collectionName
    );
    if (collectionToShow) {
      setCateg(collectionToShow.categories);
    } else {
      console.warn(`Collection with name "${collectionName}" not found`);
      setCateg([]);
    }
  };

  if (loading)
    return (
      <>
        <ClientLoading />
      </>
    );

  return (
    !loading && (
      <div className="m-auto max-w-7xl">
        <div className="flex justify-around">
          <Tabs
            defaultValue={collection[0]?.name}
            className="w-full flex items-center flex-col"
          >
            <TabsList className="w-full">
              {collection.map((item) => (
                <TabsTrigger
                  key={item._id}
                  className="hover:text-black hover:underline focus:underline"
                  onClick={() => handleCollection(item.name)}
                  value={item.name}
                >
                  {item.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="w-11/12 mx-auto">
              <CarosalCategories
                Categ={Categ}
                onCategoryClick={handleCategoryClick}
              />
            </div>
            {!categoryLoading && (
              <div>
                <InfiniteScroll
                  dataLength={items.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={<ProductLoading />}
                >
                  <div className="md:flex  md:flex-wrap gap-1 justify-start grid grid-cols-3 ">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className=" flex flex-col items-center justify-center"
                      >
                        <div className="border border-slate-300 py-3">
                          <Image
                            src={
                              item.img[0] || "/assets/home/Men/CasualShoes1.png"
                            }
                            alt={item.name}
                            width={250}
                            height={250}
                            className="object-contain "
                          />
                        </div>
                        <div className="pb-5 pt-2 font-semibold">
                          <span> {PriceIntoCurrency(+item.price, "PKR")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              </div>
            )}
          </Tabs>
        </div>
      </div>
    )
  );
};

export default TabCategories;
