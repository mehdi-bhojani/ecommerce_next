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
 const Returns= [
    {
      id: "item-1",
      question: "What is your return policy?",
      answer:    <ul className='ml-12  list-disc'>
      <li>Any Product/item can be returned or exchanged if it is incorrect/ incomplete or defective/ damaged within 7 days after delivery. Clicky.pk reserves the right to reject a return request found misusing of our generous returns policy or a product received with missing tags and other components. Please note, delivery charges are non-refundable.</li>
      <li>In case there is our mistake (damaged product or wrong item/size delivered) we will replace free of cost and no charges will de deducted if customer wants refund.</li>
      <li>Incase clicky dispatched the accurate product and customer want to exchange, then 400 charges will apply.</li>
      <li>Perfumes and makeup products may only be returned if they are sealed, unopened, unused, and in their original packaging within a specified period of 7 days.</li>
    </ul>
    },
    {
      id: "item-2",
      question: "What are the conditions for return or exchange?",
      answer:   <ul className='ml-12  list-disc'>
      <li>The Product must be like in same condition as delivered, Unworn, unwashed and without any flaws.</li>
      <li>The product must include the original tags, with original packaging.</li>
      <li>Your item needs to have the receipt, order number or proof of purchase.</li>
    </ul>
    },
    {
      id: "item-3",
      question: "What is the procedure for Returns or Exchange?",
      answer:  <div> You can return your product easily through clicky app in few seconds. Just follow these steps:
      <ul className='ml-12  list-disc'>
        <li>You can Sign in to your Clicky Account From Here.</li>
        <li>Go to my order section.</li>
        <li>Click on the View order for the specific order you want to place replacement/refund Request</li>
        <li>Select refund/replace option from the top and then click one or all items that you want return or replaced.</li>
        <li>Select the quantities and reason for replacement/refund</li>
        <li>Click on the SAVE button to submit the request</li>
      </ul>
      </div>
    },
    {
      id: "item-4",
      question: "What is the shipment method for return or exchange?",
      answer: "Once you have created your return request as described above, you have to visit the nearest TCS express center to dispatch your shipment on our provided consignment number."
    },
    {
      id: "item-5",
      question: "What is your refund or exchange policy?",
      answer: "Once we receive your item at origin, we will notify you of the status of your refund or exchange after inspecting the item. Although it depends on the criteria of the product and your choice, the product is refundable or exchangeable."
    },
    {
      id: "item-6",
      question: "When will I be refunded?",
      answer: "Once your return is approved, we will initiate a refund to your preferred payment method within 48 hours."
    },
    {
      id: "item-7",
      question: "When will I get my exchanged item?",
      answer: "Transit time for the exchange shipment is the same as our standard delivery time (3 to 5 business days) from the time the exchange is shipped. You will be entitled to get an exchange of an equal value as your original order."
    }
  ]
  
  return (
    <div> <BackBtn myText={HelpObj.find(item => item.title === "Returns & Replacements")}/>
     <div className="max-w-7xl mx-auto mt-5 bg-white p-8 rounded-lg shadow">
        <Accordion type="single" collapsible className="w-full">
        {Returns.map((item) => (
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