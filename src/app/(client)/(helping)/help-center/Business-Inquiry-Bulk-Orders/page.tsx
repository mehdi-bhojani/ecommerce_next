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
const Business=  [
    {
      id: "item-1",
      question: "I wish to become a seller on Clicky",
      answer: "Fill this form and our team will reach you as soon as possible."
    },
    {
      id: "item-2",
      question: "I want to place a bulk order/I have a business query",
      answer: "Please email the details of the order you wish to place to support@clicky.pk with the subject line “Bulk order”."
    },
    {
      id: "item-3",
      question: "How do I opt for a franchise with Clicky?",
      answer: "We currently do not provide this option."
    }
  ]
  
  return (
    <div> <BackBtn myText={HelpObj.find(item => item.title === "Business Inquiry & Bulk Orders")}/>
     <div className="max-w-7xl mx-auto mt-5 bg-white p-8 rounded-lg shadow">
        <Accordion type="single" collapsible className="w-full">
        {Business.map((item) => (
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