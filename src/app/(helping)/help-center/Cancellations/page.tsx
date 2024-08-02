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
    <div> <BackBtn myText={HelpObj.find(item => item.title === "Cancellations")}/>
     <div className="max-w-7xl mx-auto mt-5 bg-white p-8 rounded-lg shadow">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How can I cancel my order?</AccordionTrigger>
            <AccordionContent>
            In order to cancel your order, please login to clicky app in your my account section. Open the order you want to cancel and you will see an option to cancel the order. Your order can only be cancelled before it reaches the ‘Dispatched’ status in your my account on Clicky app.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I modify the shipping address of my order after it’s been placed?</AccordionTrigger>
            <AccordionContent>
            You can cancel the order and reorder the same product by adding new address in your my-account section. However , if order is already in 'Dispatched' status you wont be able to change the current order.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>I just cancelled my order. When will I receive my refund?</AccordionTrigger>
            <AccordionContent>
            If you’ve selected Cash on Delivery, there’s no amount to be refunded because you haven't paid for your order. For payments made via Credit/Debit Card/Netbanking, you will receive your refund to the source account within 5-7 days from the time you cancel your order.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What is Clicky’s cancellation policy?</AccordionTrigger>
            <AccordionContent>
            Only orders that haven't left the fulfilment centre can be cancelled. If the order has already been shipped from our fulfilment centre, you can refuse to accept it and send it back with the courier. In case you have paid using Netbanking/Debit/Credit Card, we’ll refund your order amount only after we’ve received the cancelled order at our fulfilment centre.
            </AccordionContent>
          </AccordionItem>
         
        </Accordion>


      </div>
    </div>
  )
}

export default page