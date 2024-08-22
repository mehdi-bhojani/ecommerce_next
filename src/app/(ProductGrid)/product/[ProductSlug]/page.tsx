"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductItems from "@/shared/json/products.json";
import BreadCrumb from "@/components/website/header/ProductGridComponent/BreadCrumb";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Cross, Heart, RefreshCw, SquarePen, Truck, X } from "lucide-react";
import ImageZoom from "react-medium-image-zoom";
import { FaStar } from "react-icons/fa";
import "react-medium-image-zoom/dist/styles.css";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
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
import ProductCard from "@/components/website/header/ProductGridComponent/Products";
import Loader from "@/components/admin/customUi/Loader";
import { ProductType, VariantType } from "@/lib/types";

const Page = () => {
  const searchParams = useSearchParams();

  const param = useParams();
  const { CategName, ProductDetail } = param;
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [SelectSize, SetSelectSize] = useState<string>("");
  const [SelectedHeart, SetSelectedHeart] = useState<boolean>(false);
  const selectedHeartRef = useRef(SelectedHeart);
  const [tempProduct, setTempProduct] = useState<ProductType | null>(null);
  const [colors, setColors] = useState<VariantType[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [sizes, setSizes] = useState<VariantType[]>([]);

  const getSizes = (currentColor: string, currentProduct: ProductType) => {
    // Filter the variants based on the currentColor
    const sizes = currentProduct?.variants
      .filter((variant) => variant.name === currentColor)
      .map((variant) => variant); // Map to extract sizes from filtered variants

    // Set sizes state
    setSizes(sizes);

    // Log sizes to the console
    console.log("sizes", sizes);
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

  // Check that test has elements before attempting to use it
  // const tempProd = ProductItems.find((item) =>
  //   item.subCategory.replace(/-/g, " ") ===
  //   decodeURIComponent(CategName).replace(/-/g, " ") &&
  //   item.id === parseInt(ProductDetail)
  // );

  // const sizes = ["SMALL", "MEDIUM", "LARGE", "X LARGE", "2X LARGE", "3X LARGE"];

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const getProduct = async () => {
    try {
      const id = await searchParams.get("id");
      const res = await fetch(`/api/product/${id}`);
      const data = await res.json();
      setTempProduct(data);
      getColors(data);
      // setSelectedColor(data?.variants[0].name);
      // getSizes(data?.variants[0].name, data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
    SetSelectedHeart(SelectedHeart);
  }, [SelectedHeart]);

  const handleAction = () => {
    if (SelectedHeart == false) {
      toast.success("Added to WishList", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    } else {
      toast.error("Removed from your Wishlist", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const [imgrc, setimgrc] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setimgrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChangeColor = (color: string) => {
    setSelectedColor(color);
    SetSelectSize("");
    getSizes(color, tempProduct!);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="bg-white px-8 pt-8">
      <div>
        {/* <BreadCrumb
          Temp={tempProduct}
          CategName={decodeURIComponent(CategName).replace(/-/g, " ")}
        /> */}
      </div>

      <div className="py-5 flex flex-row ">
        <div className="flex flex-row flex-wrap gap-4 h-1/2 w-1/2">
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
                        className={`border ${
                          selectedImage === image
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

        <div className="flex flex-col w-1/2">
          {
            <div className="max-w-xl mx-auto p-4">
              <div className="flex flex-col gap-2">
                <span className="text-2xl font-bold">{tempProduct?.brand}</span>
                <span className="text-lg text-gray-500">
                  {tempProduct?.name}
                </span>
                <p className="text-sm text-gray-500">
                  STYLE : {tempProduct?.sku}
                </p>
                <p className="text-red-600 font-bold">
                  Be the first one to review
                </p>
              </div>
              <div className="my-4 flex flex-row gap-2">
                <span className="line-through text-2xl text-gray-500">
                  Rs{tempProduct?.price}
                </span>
                <span className="text-2xl text-red-600 font-bold">
                  Rs{tempProduct?.mrp}
                  <span className="text-sm">(-{tempProduct?.offer}%)</span>
                </span>
              </div>
              <div className="my-4">
                <p className="font-bold mb-2">MORE COLORS</p>
                <div className="flex gap-2">
                  {colors.length > 0 &&
                    colors.map((color, index) => (
                      <div key={index}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Image
                                onClick={() => handleChangeColor(color?.name)}
                                src={color?.img[0] || tempProduct?.img[0] || ""}
                                alt="Product Image"
                                width={50}
                                height={75}
                                className={`object-cover ${
                                  color?.name === selectedColor
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
              <div className="my-4">
                <p className="font-bold">SELECT SIZE</p>
                <div className="flex flex-wrap gap-2">
                  {sizes?.map((size, index) => {
                    // Define button classes based on stock and selected size
                    const buttonClasses = `bg-white border border-gray-300 rounded-lg p-5 text-sm text-black font-medium transition duration-300 ease-in-out ${
                      SelectSize === size?.size
                        ? "text-white bg-gradient-to-r to-pink-500 from-orange-500"
                        : ""
                    }`;

                    return (
                      <div className="relative" key={index}>
                        {size?.remainingStock <= 0 && (
                          <div className="absolute top-0 left-0 z-10 text-red-500 w-full h-full flex justify-center items-center">
                            <span className="text-lg">
                              <X size={50} />
                            </span>
                          </div>
                        )}
                        <Button
                          onClick={() =>
                            size?.remainingStock > 0 &&
                            SetSelectSize(size?.size)
                          }
                          className={`${buttonClasses} ${
                            size?.remainingStock > 0
                              ? "hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500"
                              : ""
                          }`}
                          disabled={size?.remainingStock <= 0}
                        >
                          {size?.size}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-row gap-2 ">
                <button className="w-1/2 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3  transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-600 hover:font-semibold  ">
                  ADD TO BAG
                </button>
                <button
                  onClick={() => {
                    SetSelectedHeart(!SelectedHeart), handleAction();
                  }}
                  className="w-1/2 py-3  flex flex-row border-2  justify-center items-center gap-3"
                >
                  <div className="relative w-10 h-10 flex items-center justify-center   cursor-pointer">
                    <Heart
                      onClick={() => {
                        SetSelectedHeart(!SelectedHeart), handleAction();
                      }}
                      className={`text-gray-500 icon ${
                        SelectedHeart ? "active" : "text-gray-500"
                      }  `}
                    />
                  </div>

                  <div>WISHLIST</div>
                </button>
              </div>
              <Separator className="my-4" />

              <div className="my-4">
                <div className="flex items-start space-x-2 justify-start">
                  <Truck className="w-[50px] h-[50px] " />

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
                  <RefreshCw className="w-[100px] h-[100px] " />
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

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <span className="font-bold">PRODUCT DESCRIPTION</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {tempProduct?.description}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Dialog>
                <DialogTrigger asChild>
                  <div className="my-4 text-center flex justify-center w-full ">
                    <button className="flex items-center font-semibold  justify-center text-center  border-2 border-black w-1/2 p-4 hover:bg-gray-100 transition w-full">
                      <SquarePen className="mr-2" />
                      WRITE A REVIEW
                    </button>
                  </div>
                </DialogTrigger>
                <DialogContent className="w-2/4 ">
                  <div className="max-w-2xl  p-6 bg-white shadow-lg rounded-lg">
                    <div className="flex items-center gap-4">
                      <Image
                        src={tempProduct?.img[0]}
                        alt="Product Image"
                        width={40}
                        height={40}
                        className="border  border-1 border-black p-1 object-cover"
                      />
                      <div>
                        <h2 className="text-xl font-bold">
                          ThriveTempo Hoodie
                        </h2>
                        <p className="text-gray-600">Size: SMALL</p>
                      </div>
                    </div>
                    <hr className="my-2" />
                    <div className="mb-2 flex flex-col justify-center items-center">
                      <h3 className="text-lg font-semibold">
                        Rate the Product
                      </h3>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={`cursor-pointer text-3xl ${
                              index < (hover || rating)
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                            onClick={() => handleRating(index + 1)}
                            // onMouseEnter={() => setHover(index + 1)}
                            onMouseLeave={() => setHover(null)}
                          />
                        ))}
                      </div>
                    </div>
                    <hr className="my-2" />
                    <div className="mb-2">
                      <label className="block text-gray-700 mb-2">
                        Write a Comment
                      </label>
                      <textarea
                        className="w-full h-32 p-1 border rounded"
                        placeholder="Write your review about this product (optional)"
                        value={comment}
                        onChange={handleCommentChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Upload Photos
                      </label>
                      <div className="flex items-center justify-start">
                        <label className="flex flex-col items-center justify-center w-14 h-14 border-2 border-dashed border-gray-300 rounded cursor-pointer">
                          <span className="text-gray-500">+</span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                      {imgrc && (
                        <div className="mt-4">
                          <Image
                            src={imgrc}
                            width={200}
                            height={200}
                            alt="Uploaded"
                            className="max-w-full h-auto border border-1 border-gray-600"
                          />
                        </div>
                      )}
                    </div>

                    <button className="w-full py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-3xl hover:from-pink-500 hover:to-red-500">
                      Submit
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          }
        </div>
      </div>

      <span className="text-2xl font-bold">Recently Viewed</span>

      <Carousel showDots={true} className="w-full ">
        <CarouselContent className="border-none">
          <CarouselItem key={1}>
            <div className="p-1">
              <Card className="border-none">
                <div className="flex flex-row justify-evenly">
                  <CardContent className="flex  items-center justify-center w-3/12 p-2 border-red-300 shadow-md">
                    {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                    <ProductCard product={tempProduct} key={1} />
                  </CardContent>
                  <CardContent className="flex aspect-square items-center  justify-center w-3/12 p-2 border-red-300 shadow-md">
                    <ProductCard product={tempProduct} key={2} />
                  </CardContent>
                  <CardContent className="flex aspect-square items-center justify-center w-3/12 p-2 border-red-300 shadow-md">
                    <ProductCard product={tempProduct} key={3} />
                  </CardContent>
                  <CardContent className="flex aspect-square items-center justify-center w-3/12 p-2 border-red-300 shadow-md">
                    <ProductCard product={tempProduct} key={4} />
                  </CardContent>
                </div>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem key={2}>
            <div className="p-1">
              <Card className="border-none">
                <div className="flex flex-row justify-start">
                  <CardContent className="flex  items-center justify-center w-3/12 p-2 border-red-300 shadow-md">
                    <ProductCard product={tempProduct} key={1} />
                  </CardContent>
                  <CardContent className="flex aspect-square items-center justify-center w-3/12 p-2 border-red-300 shadow-md">
                    <ProductCard product={tempProduct} key={2} />
                  </CardContent>
                </div>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div className="mt-5">
        <span className="text-2xl font-bold">similar products</span>
      </div>

      <Carousel showDots={false} className="w-full my-5">
        <CarouselContent className="border-none">
          <CarouselItem>
            <Card className="border-none">
              <div className="flex flex-row justify-start">
                <CardContent className="flex  items-center justify-center w-3/12 p-2 border-red-300 shadow-md">
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                  <ProductCard product={tempProduct} key={1} />
                </CardContent>
                <CardContent className="flex aspect-square items-center justify-center w-3/12 p-2 border-red-300 shadow-md">
                  <ProductCard product={tempProduct} key={2} />
                </CardContent>
              </div>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Page;
