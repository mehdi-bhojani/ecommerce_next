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
  const Shipping = [
    {
      id: "item-1",
      question: "What is Cash on Delivery?",
      answer:
        "With an increasing number of online fraudulent activities that pose serious threats that create a growing hesitation to avoid advance online payments, Cash on Delivery is an easier and safer alternative to avoid the vulnerabilities of online payment methods. C-o-D will help pay the cash at the time of delivery of the product."
    },
    {
      id: "item-2",
      question: "What are the delivery charges?",
      answer:
        "Delivery charge is the fee that has to be paid for the on-time delivery of a purchased product. Our standard shipping charges are Rs 150 but it keeps on changing based on the number of products purchased. For the best understanding please see the total shipping fee added to your order at checkout page."
    },
    {
      id: "item-3",
      question: "How does the shipment/delivery process work?",
      answer:
        "Orders made on Clicky are delivered through reputed shipping partners. Buyers will be duly notified when the consignment is shipped. They will also be provided a tracking number to keep track of the orders."
    },
    {
      id: "item-4",
      question: "What is the estimated time to deliver my order?",
      answer:  <div>The approximate delivery time will depend on the following :
      <ul className='ml-12  list-disc'>
        <li>Lahore , Karachi , Islamabad/Rawalpindi are usually delivered in 2-3 business days .</li>
        <li>Delivery to other remote cities take 4-7 business Days.</li>
      </ul>
      However, our business days exclude public holidays and Sundays.
      </div>  
    },
    {
      id: "item-5",
      question: "Does Clicky deliver internationally?",
      answer: "No, we are not shipping outside Pakistan."
    },
    {
      id: "item-6",
      question: "How can I keep track of the status of my orders?",
      answer:
        "The ‘My Account’ section in your Clicky App will help review the status of your orders, so that you can receive relevant information based on the respective ‘Order Number’."
    },
    {
      id: "item-7",
      question: "Will I get a confirmation call from Clicky after placing an order?",
      answer:
        "No, we don't call customers for order confirmation. All new customers are logged in to Clicky app via OTP (one-time password) so we take this as order confirmation and ship you the order right away."
    }
  ];
  return (

    <div>
     <BackBtn myText={HelpObj.find(item => item.title === "Shipping & Delivery")}/>
     <div className="max-w-7xl mx-auto mt-5 bg-white p-8 rounded-lg shadow">
        <Accordion type="single" collapsible className="w-full">
        {Shipping.map((item) => (
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