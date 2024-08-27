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
    <Carousel className=' '>
      <CarouselContent>
        <CarouselItem> <Image className='border pt-16 object-cover h-80 md:h-full md:object-fill md:pt-0 w-full ' width={2500} height={2500}
          src={'/assets/home/cover_web.png'} alt='the cover' />
        </CarouselItem>
      </CarouselContent>

    </Carousel>

  )
}

export default Carosal