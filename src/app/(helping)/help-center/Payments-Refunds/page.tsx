import React from 'react'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import HelpObj from '@/shared/json/help.json'
import BackBtn from '@/components/website/HelpPageComponents/HelpComponents/BackBtn'
const page = () => {
  return (
    <div> <BackBtn myText={HelpObj.find(item => item.title === "Payments & Refunds")}/>
     <div className="max-w-7xl mx-auto mt-5 bg-white p-8 rounded-lg shadow">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>When can I expect the refund for the order I have returned the parcel?</AccordionTrigger>
            <AccordionContent>
            It takes 4-7 business days for us to receive product back to our facility. After product is reached back to our facility we take another 2-3 days to refund the product amount back to you.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How would I be paid back as Refund ?</AccordionTrigger>
            <AccordionContent>
            We would refund you either via bank transfer or using easypaisa.<br></br> <br></br>In case of refund to your Credit/Debit/Net banking account, we take 3-5 business days from the date of receipt of the items.
            </AccordionContent>
          </AccordionItem>
          
        </Accordion>


      </div>
    </div>
  )
}

export default page