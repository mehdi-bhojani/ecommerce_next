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
  const Payment=[
    
      {
        id: "item-1",
        question: "When can I expect the refund for the order I have returned the parcel?",
        answer: "It takes 4-7 business days for us to receive the product back at our facility. After the product reaches our facility, we take another 2-3 days to refund the product amount back to you."
      },
      {
        id: "item-2",
        question: "How would I be paid back as a refund?",
        answer: "We would refund you either via bank transfer or using Easypaisa. In case of a refund to your Credit/Debit/Net banking account, we take 3-5 business days from the date of receipt of the items."
      }
    
    
  ]
  return (
    <div> <BackBtn myText={HelpObj.find(item => item.title === "Payments & Refunds")}/>
     <div className="max-w-7xl mx-auto mt-5 bg-white p-8 rounded-lg shadow">
        <Accordion type="single" collapsible className="w-full">
        {Payment.map((item) => (
      <AccordionItem key={item.id} value={item.id}>
        <AccordionTrigger>{item.question}</AccordionTrigger>
        <AccordionContent>
        <span>{item.answer}</span>
        </AccordionContent>
      </AccordionItem>
    ))}
          
        </Accordion>


      </div>
    </div>
  )
}

export default page