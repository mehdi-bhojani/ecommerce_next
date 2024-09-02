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
    <div> <BackBtn myText={HelpObj.find(item => item.title === "Business Inquiry & Bulk Orders")}/>
     <div className="max-w-7xl mx-auto mt-5 bg-white p-8 rounded-lg shadow">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>I wish to become a seller on Clicky</AccordionTrigger>
            <AccordionContent>
            Fill this form and our team will reach you as soon as possible.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>I want to place a bulk order/I have a business query</AccordionTrigger>
            <AccordionContent>
            Please email the details of the order you wish to place to support@clicky.pk with the subject line “Bulk order”.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How do I opt for franchise with Clicky</AccordionTrigger>
            <AccordionContent>
            We currently do not provide this option
            </AccordionContent>
          </AccordionItem>
       
        </Accordion>


      </div>
    </div>
  )
}

export default page