import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
const Carosal = () => {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem> <Image className='border w-full' width={1000} height={1000}
          src={'/assets/home/cover_web.png'} alt='the cover' />
        </CarouselItem>
      </CarouselContent>

    </Carousel>

  )
}

export default Carosal