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
    <div> <BackBtn myText={HelpObj.find(item => item.title === "Returns & Replacements")}/>
     <div className="max-w-7xl mx-auto mt-5 bg-white p-8 rounded-lg shadow">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
            <ul className='ml-12  list-disc'>
              <li>Any Product/item can be returned or exchanged if it is incorrect/ incomplete or defective/ damaged within 7 days after delivery. Clicky.pk reserves the right to reject a return request found misusing of our generous returns policy or a product received with missing tags and other components. Please note, delivery charges are non-refundable.</li>
              <li>In case there is our mistake (damaged product or wrong item/size delivered) we will replace free of cost and no charges will de deducted if customer wants refund.</li>
              <li>Incase clicky dispatched the accurate product and customer want to exchange, then 400 charges will apply.</li>
              <li>Perfumes and makeup products may only be returned if they are sealed, unopened, unused, and in their original packaging within a specified period of 7 days.</li>
            </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What are the conditions for return or exchange?</AccordionTrigger>
            <AccordionContent>
            <ul className='ml-12  list-disc'>
              <li>The Product must be like in same condition as delivered, Unworn, unwashed and without any flaws.</li>
              <li>The product must include the original tags, with original packaging.</li>
              <li>Your item needs to have the receipt, order number or proof of purchase.</li>
            </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is the procedure for Returns or Exchange?</AccordionTrigger>
            <AccordionContent>
            You can return your product easily through clicky app in few seconds. Just follow these steps:
            <ul className='ml-12  list-disc'>
              <li>You can Sign in to your Clicky Account From Here.</li>
              <li>Go to my order section.</li>
              <li>Click on the View order for the specific order you want to place replacement/refund Request</li>
              <li>Select refund/replace option from the top and then click one or all items that you want return or replaced.</li>
              <li>Select the quantities and reason for replacement/refund</li>
              <li>Click on the SAVE button to submit the request</li>
            </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What is the procedure for Returns or Exchange?</AccordionTrigger>
            <AccordionContent>
            You can return your product easily through clicky app in few seconds. Just follow these steps:
            <ul className='ml-12  list-disc'>
              <li>You can Sign in to your Clicky Account From Here.</li>
              <li>Go to my order section.</li>
              <li>Click on the View order for the specific order you want to place replacement/refund Request</li>
              <li>Select refund/replace option from the top and then click one or all items that you want return or replaced.</li>
              <li>Select the quantities and reason for replacement/refund</li>
              <li>Click on the SAVE button to submit the request</li>
            </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>What is the shipment method for return or exchange?</AccordionTrigger>
            <AccordionContent>
            Once you have created your return request as described above, You have to visit nearest TCS express center to dispatch your shipment on our provided consignment number.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>What is your refund or exhange policy?</AccordionTrigger>
            <AccordionContent>
            Once we receive your item at origin, we will notify you on the status of your refund or exchange after inspecting the item. Although it depends on the criteria of product and your choice, the product is refundable or exchangeable.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>When i&aposll be refunded?</AccordionTrigger>
            <AccordionContent>
            Once your return is approved, we will initiate a refund to your preferred payment method within 48 hours.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger>When i&aposll get my exchanged item?</AccordionTrigger>
            <AccordionContent>
            Transit time for the Exchange shipment is same as our standard delivery time (3 to 5 Business days) from the time exchange is shipped. You will be entitled to get an exchange of an equal value as your original order.
            </AccordionContent>
          </AccordionItem>
        </Accordion>


      </div>
    </div>
  )
}

export default page