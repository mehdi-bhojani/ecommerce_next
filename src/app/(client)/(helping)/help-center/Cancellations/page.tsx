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
  const Cancell=[
    
      {
        id: "item-1",
        question: "How can I cancel my order?",
        answer: "In order to cancel your order, please log in to the Clicky app in your 'My Account' section. Open the order you want to cancel, and you will see an option to cancel the order. Your order can only be cancelled before it reaches the ‘Dispatched’ status in your 'My Account' on the Clicky app."
      },
      {
        id: "item-2",
        question: "Can I modify the shipping address of my order after it's been placed?",
        answer: "You can cancel the order and reorder the same product by adding a new address in your 'My Account' section. However, if the order is already in 'Dispatched' status, you won't be able to change the current order."
      },
      {
        id: "item-3",
        question: "I just cancelled my order. When will I receive my refund?",
        answer: "If you've selected Cash on Delivery, there's no amount to be refunded because you haven't paid for your order. For payments made via Credit/Debit Card/Netbanking, you will receive your refund to the source account within 5-7 days from the time you cancel your order."
      },
      {
        id: "item-4",
        question: "What is Clicky's cancellation policy?",
        answer: "Only orders that haven't left the fulfilment centre can be cancelled. If the order has already been shipped from our fulfilment centre, you can refuse to accept it and send it back with the courier. In case you have paid using Netbanking/Debit/Credit Card, we'll refund your order amount only after we've received the cancelled order at our fulfilment centre."
      }
    
    
  ]
  return (
    <div> <BackBtn myText={HelpObj.find(item => item.title === "Cancellations")}/>
     <div className="max-w-7xl mx-auto mt-5 bg-white p-8 rounded-lg shadow">
        <Accordion type="single" collapsible className="w-full">
        {Cancell.map((item) => (
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