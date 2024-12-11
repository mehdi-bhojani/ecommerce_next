"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductItems from "@/shared/json/products.json";
import BreadCrumb from "@/components/website/ProductGridComponent/BreadCrumb";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Cross, Heart, RefreshCw, SquarePen, Truck, X } from "lucide-react";
import ImageZoom from "react-medium-image-zoom";
import { FaStar } from "react-icons/fa";
import "react-medium-image-zoom/dist/styles.css";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";

import Autoplay from "embla-carousel-autoplay";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carosalDotWala";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@nextui-org/react";
import ProductCard from "@/components/website/ProductGridComponent/Products";
import Loader from "@/components/admin/customUi/Loader";
import { ProductType, SizeType, VariantType } from "@/lib/types";
import ReviewDialog from "@/components/product/reviewDialog";
import ShowReview from "@/components/product/showReview";
import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import useCart from "@/shared/hooks/useCart";
import { createSlug, PriceIntoCurrency } from "@/shared/helpers/help";
import ClientLoading from "@/components/myUi/ClientLoading";
import useWishList from "@/shared/hooks/useWishList";
import { useAtom } from "jotai";
import { storeAtom } from "@/shared/atoms/storeAtom";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

const Page = () => {

  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const param = useParams();
  const { CategName, ProductDetail } = param;
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [SelectSize, SetSelectSize] = useState<string>("");
  const [SelectedHeart, SetSelectedHeart] = useState<boolean>(false);
  const selectedHeartRef = useRef(SelectedHeart);
  const [tempProduct, setTempProduct] = useState<ProductType>();
  const [colors, setColors] = useState<VariantType[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [sizes, setSizes] = useState<SizeType[]>([]);
  const { addToCart } = useCart();
  const { addToWishList, removeFromWishList } = useWishList();
  const [myStoreAtom, setStoreAtom] = useAtom(storeAtom);
  const [currImage, setCurrImage] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<VariantType>();
  


  const getSizes = (currentColor: string, currentProduct: ProductType) => {
    // Filter the variants based on the currentColor
    const sizes = currentProduct?.variants
      .filter((variant) => variant.name === currentColor)
      .map((variant) => variant); // Map to extract sizes from filtered variants

    // Set sizes state
    // setSizes();

    // Log sizes to the console
  };

  const getColors = (tempProduct: ProductType) => {
    const colors = tempProduct?.variants.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.name === item.name)
    );
    setColors(colors);
    setSelectedColor(colors[0].name);
    getSizes(colors[0].name, tempProduct);
  };

  const [loading, setLoading] = useState(true);


  // SetSelectedHeart(SelectedHeart);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const id = await searchParams.get("id");
        const res = await fetch(`/api/product/${id}`);
        const data = await res.json();
        setTempProduct(data);
        getColors(data);
        if(data?.variants.length > 0){
          setSelectedVariant(data?.variants[0]);
          setSizes(data?.variants[0].sizes);
        }
        // setCurrImage(data?.img);
        // setSelectedColor(data?.variants[0].name);
        // getSizes(data?.variants[0].name, data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, []);

  const handleAction = async () => {
    if (!session?.user?._id) {
      toast.error("Please login to add product in wishlist");
      return;
    }
    if (SelectedHeart == false) {
      await addToWishList({
        imgSrc: tempProduct!.img[0],
        name: tempProduct!.name,
        price: tempProduct!.price,
        mrp: tempProduct!.mrp!,
        offer: tempProduct!.offer!,
        _id: tempProduct!._id,
      });

      toast.success("Added to WishList");
    } else {
      removeFromWishList(tempProduct!._id);
      toast.success("Removed from your Wishlist");
    }
  };

  const handleChangeColor = (id: string,) => {
    // getSizes(color, tempProduct!);
    const selected = tempProduct?.variants?.filter((item) => item._id === id) || []
    console.log(selected[0]);
    setSelectedVariant(selected[0]);
    setCurrImage(selected[0].img);
    setSelectedColor(selected[0].name);
    setSizes(selected[0].sizes);
  };

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  const handleAddtoBag = () => {
    if (!session?.user?._id) {
      toast.error("Please login to add product in cart");
      return;
    }
    if (SelectSize != null && SelectSize === "") {
      toast.error("Please select a size");
    } else {
      const cartItem = {
        imgSrc: tempProduct!.img[0],
        name: tempProduct!.name,
        price: tempProduct!.price,
        mrp: tempProduct!.mrp || 0,
        offer: tempProduct!.offer || '0',
        SelectSize: SelectSize,
        allSizes: sizes,
        slug: createSlug(tempProduct!.name),
        productId: tempProduct!._id,
        variantId: selectedVariant?._id,
        quantity: 1,
      };
      addToCart(cartItem);
      toast.success("Added to Bag");
    }
  };
  // const getSelectedVariant = tempProduct?.variants.find(
  //   (variant) => variant.size === SelectSize && variant.name === selectedColor
  // );

  if (tempProduct && !tempProduct?.isActive || tempProduct?.isDelete) {
    notFound();
    return null;
  }
  return loading ? (
    <ClientLoading />
  ) : (
    <div className="bg-white px-4 md:px-8 md:pt-8">
      <div className="py-5 md:flex-row flex-col flex justify-center items-center">
        <Carousel
          plugins={[plugin.current]}
          className="w-full  md:hidden"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {currImage?.map((item, index) => (
              <CarouselItem key={index + 1}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-2">
                      <Image
                        className=" transition-transform duration-300 ease-in-out hover:scale-110 object-cover  w-full"
                        src={item}
                        alt="png"
                        height={300}
                        width={300}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="md:flex md:flex-row md:flex-wrap md:gap-4 md:h-1/2 md:w-1/2 md:justify-end  hidden">
          {tempProduct?.img.map((item, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="w-5/12 ">
                  <div className="overflow-hidden py-4  shadow-md w-full">
                    <Image
                      onClick={() => setSelectedImage(item)}
                      className=" transition-transform duration-300 ease-in-out hover:scale-110 object-cover h-5/6 w-full"
                      src={item}
                      alt="png"
                      height={300}
                      width={300}
                    />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="h-full w-1/2">
                <div className="flex">
                  <div className="flex flex-col ">
                    {tempProduct?.img.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`border ${selectedImage === image
                          ? "border-orange-700"
                          : "border-transparent"
                          } p-1`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index}`}
                          width={50}
                          height={50}
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  <div className="p-4">
                    <Image
                      src={selectedImage}
                      alt="Selected"
                      width={600}
                      height={600}
                      className="object-cover"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="flex flex-col md:w-1/2 w-full ">
          {
            <div className=" mx-auto py-4 md:px-6">
              <div className="flex flex-col gap-2 ">
                <span className="text-2xl font-bold capitalize">{tempProduct?.brand}</span>
                <span className="text-lg text-gray-500">
                  {tempProduct?.name}
                </span>
                <p className="text-sm text-gray-500">
                  SKU : {tempProduct?.sku}
                </p>
                {(!tempProduct?.reviews || tempProduct?.reviews?.length === 0) ?
                  (<p className="text-red-600 font-bold">
                    Be the first one to review
                  </p>) : ""
                }
              </div>
              <div className="my-4 flex flex-row gap-2">
                <span className="line-through text-2xl text-gray-500">
                  {PriceIntoCurrency(tempProduct?.mrp || 0, myStoreAtom?.storeSettings.currency.default || "PKR")}
                </span>
                <span className="text-2xl text-red-600 font-bold">
                  {PriceIntoCurrency(tempProduct?.price || 0, myStoreAtom?.storeSettings.currency.default || "PKR")}
                  <span className="text-sm">(-{tempProduct?.offer}%)</span>
                </span>
              </div>
              {
                colors.length > 0 && (
                  <div className="my-4">
                    <p className="font-bold my-2 uppercase">Select Variants</p>
                    <div className="flex gap-2">
                      {colors.map((color, index) => (
                        <div key={index}>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Image
                                  onClick={() => handleChangeColor(color?._id)}
                                  src={color?.img[0] || tempProduct?.img[0] || ""}
                                  alt="Product Image"
                                  width={50}
                                  height={75}
                                  className={`object-cover ${color?.name === selectedColor
                                    ? "border border-red-600"
                                    : ""
                                    }`}
                                />
                              </TooltipTrigger>
                              <TooltipContent className="bg-slate-900 text-white">
                                <span>{color?.name}</span>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {sizes.length > 0 &&
                (<div className="my-4">
                  <p className="font-bold my-2">SELECT SIZE</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedVariant?.sizes?.map((size, index) => {
                      // Define button classes based on stock and selected size
                      const buttonClasses = `bg-white border border-gray-300 rounded-lg p-5 text-sm text-black font-medium transition duration-300 ease-in-out ${SelectSize === size?.name
                        ? "text-white "
                        : ""
                        }`;

                      return (
                        <div className="relative" key={index}>
                          {size.remainingStock! <= 0 && (
                            <div className="absolute top-0 left-0 z-10 text-red-500 w-full h-full flex justify-center items-center">
                              <span className="text-lg">
                                <X size={50} />
                              </span>
                            </div>
                          )}
                          <Button
                            onClick={() =>
                              size?.remainingStock! > 0 &&
                              SetSelectSize(size?._id)
                            }
                            className={`${buttonClasses} ${size?.remainingStock! > 0
                              ? "hover:text-white hover-gradient"
                              : ""
                              }`}
                            disabled={size?.remainingStock! <= 0}
                          >
                            {size?.name}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>)
              }

              {tempProduct?.remainingStock! <= 0 ? (
                <div className="my-4">
                  <span className="text-red-600 font-bold text-3xl">Out of Stock</span>
                </div>
              ) : (
                <>
                  {session && (
                    <ReviewDialog tempProduct={tempProduct!} SelectSize={SelectSize} />
                  )}
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={handleAddtoBag}
                      className="w-1/2 bg-primary-gradient text-white py-3 transition-all duration-300 ease-in-out   hover:font-semibold"
                    >
                      ADD TO BAG
                    </button>
                    <button
                      onClick={() => {
                        SetSelectedHeart(!SelectedHeart);
                        handleAction();
                      }}
                      className="w-1/2 py-3 flex flex-row border-2 justify-center items-center gap-3"
                    >
                      <div className="relative w-10 h-10 flex items-center justify-center cursor-pointer">
                        <Heart
                          onClick={() => {
                            SetSelectedHeart(!SelectedHeart);
                            handleAction();
                          }}
                          className={`text-gray-500 icon ${SelectedHeart ? "active" : "text-gray-500"}`}
                        />
                      </div>
                      <div>WISHLIST</div>
                    </button>
                  </div>
                </>
              )}

              <Separator className="my-4" />

              <div className="my-4">
                <div className="flex items-start space-x-2 justify-start">
                  {/* <Truck className="w-[50px] h-[50px] " /> */}
                  <Image className="" width={50} height={50} alt="truck delivery" src="/assets/ProdDetail/Del.png"/>

                  <div className="flex flex-col">
                    <span className="font-bold">Delivery Time</span>
                    <span className="text-sm text-gray-500">
                      Lahore, Rawalpindi, Islamabad: 1-2 days
                    </span>
                    <span className="text-sm text-gray-500">
                      Other cities: 1-4 days
                    </span>
                  </div>
                </div>
              </div>

              <div className="my-4">
                <div className="flex items-start space-x-2 justify-start">
                  {/* <RefreshCw className="w-[100px] h-[100px] " /> */}
                  <Image className="" width={50} height={50} alt="Exchange product" src="/assets/ProdDetail/exc.png"/>
                  <div className="flex flex-col">
                    <span className="font-bold">7 Days Return & Exchange</span>
                    <span className="text-sm text-gray-500">
                      You can return or exchange this product within 7 days.
                      Please keep the product in its original condition along
                      with packaging and all accessories for a successful return
                      or exchange.
                    </span>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />

              <Accordion type="single" collapsible className="w-full ">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <span className="font-bold">PRODUCT DESCRIPTION</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div dangerouslySetInnerHTML={{ __html: tempProduct?.description || "" }} />
                  </AccordionContent>
                </AccordionItem>
                {tempProduct?.reviews!.length! > 0 && (
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <span className="font-bold uppercase">
                        Reviews ({tempProduct?.reviews.length})
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ShowReview reviews={tempProduct?.reviews!} />
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          }
        </div>
      </div>

      {/* <span className="text-2xl font-bold uppercase">Viewed By Many</span>
      <Carousel showDots={false} className="w-full my-5 hidden md:block">
        <CarouselContent className="border-none">
          <CarouselItem>
            <Card className="border-none">
              <div className="flex flex-row justify-start">
                {tempProduct?.similarProducts?.map((product, index) => (
                  <CardContent
                    key={index}
                    className="flex  items-center justify-center w-3/12 p-2 border-red-300 shadow-md"
                  >
                    <ProductCard key={index} product={product} />
                  </CardContent>
                ))}
              </div>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel> */}
      {
        tempProduct?.similarProducts && tempProduct?.similarProducts?.length > 0 && (
          <>
            <div className="mt-5">
              <span className="text-2xl font-bold uppercase">similar products</span>
            </div>
            <Carousel showDots={false} className="w-full my-5 hidden md:block">
              <CarouselContent className="border-none">
                <CarouselItem>
                  <Card className="border-none">
                    <div className="flex flex-row justify-start">
                      {tempProduct?.similarProducts?.map((product, index) => (
                        <CardContent
                          key={index}
                          className="flex  items-center justify-center w-3/12 p-2 border-red-300 shadow-md"
                        >
                          <ProductCard key={index} product={product} />
                        </CardContent>
                      ))}
                    </div>
                  </Card>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </>
        )
      }
    </div>
  );
};

export default Page;
