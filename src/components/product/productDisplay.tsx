import Image from "next/image";
import { useState } from "react";
import { ProductType } from "@/lib/types";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  product: ProductType;
  selectedColor: string;
}

export default function ProductDisplay({ product, selectedColor }: Props) {
  const [selectedImage, setSelectedImage] = useState<string>(product?.img[0] || "");

  // Get images for the selected color variant, fallback to main product images
  const displayImages = product?.variants
    .find(v => v.name === selectedColor)?.img || product?.img || [];

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <Carousel className="w-full">
          <CarouselContent>
            {displayImages.map((item, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-2">
                    <Image
                      className="transition-transform duration-300 ease-in-out hover:scale-110 object-cover w-full"
                      src={item}
                      alt={`Product Image ${index + 1}`}
                      height={300}
                      width={300}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-12 md:gap-8 md:h-[calc(100vh-120px)]">
        {/* Thumbnail Gallery */}
        <div className="col-span-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 pr-4">
          <div className="flex flex-col space-y-4">
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`relative border-2 transition-all ${
                  selectedImage === image ? "border-primary" : "border-transparent"
                } hover:border-primary/50`}
              >
                <Image
                  src={image}
                  alt={`Product ${index + 1}`}
                  width={200}
                  height={50}
                  className="w-full h-auto object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Main Image */}
        <div className="col-span-6 flex items-center justify-center">
          <div className="relative w-full h-full max-h-[80vh]">
            <Image
              src={selectedImage}
              alt="Main Product Image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}
