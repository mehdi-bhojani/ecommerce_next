"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function ProductDetails() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="summary">
        <AccordionTrigger>SUMMARY</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <p>
              Available in a range of colors, our outdoor cushions add a plush layer of comfort to our
              Calistoga furniture collection. Each cushion is covered in weather-ready, fade-resistant
              fabric to make lounging and entertaining worry-free.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Designed to fit the pieces in our Calistoga furniture collection.</li>
              <li>
                Cushions are covered in your choice of Sunbrella® or Perennials® Performance acrylic
                fabrics that repel water and resist stains, mildew and fading.
              </li>
              <li>Removable covers have zipper closures.</li>
              <li>Interior is polyurethane foam with polyester fiber wrap.</li>
              <li>Made in Mexico.</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="dimensions">
        <AccordionTrigger>DIMENSIONS & MORE INFO</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <p>Dimensions vary by piece. Please see individual products for specific measurements.</p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="care">
        <AccordionTrigger>USE & CARE</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <ul className="list-disc pl-6 space-y-2">
              <li>Spot clean with mild soap and warm water.</li>
              <li>Let air dry completely.</li>
              <li>Store indoors during inclement weather and when not in use.</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="shipping">
        <AccordionTrigger>SHIPPING & RETURNS</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <p>
              Please allow 2-3 weeks for delivery. Items are shipped directly from our warehouse.
              Return policy available upon request.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

