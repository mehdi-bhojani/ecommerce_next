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
    // const cancellationsEntry = ;
  return (

    <div>
     <BackBtn myText={HelpObj.find(item => item.title === "Shipping & Delivery")}/>
     <div className="max-w-7xl mx-auto mt-5 bg-white p-8 rounded-lg shadow">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Cash on Delivery?</AccordionTrigger>
            <AccordionContent>
            With an increasing number of online fraudulent activities that pose serious threats that create a gr owing hesitation to avoid advance online payments, Cash on Delivery is an easier and safer alternative to avoid the vulnerabilities of online payment methods. C-o-D will help pay the cash at the time of delivery of the product.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What are the delivery charges?</AccordionTrigger>
            <AccordionContent>
            Delivery charge is the fee that has to be paid for the on-time delivery of a purchased product. Our standard shipping charges are Rs 150 but it keeps on changing based on the number of products purchased. For the best understanding please see the total shipping fee added to your order at checkout page.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How does the shipment/delivery process work?</AccordionTrigger>
            <AccordionContent>
            Orders made on Clicky are delivered through reputed shipping partners. Buyers will be duly notified when the consignment is shipped. They will also be provided a tracking number to keep track of the orders.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What is the estimated time to deliver my order?</AccordionTrigger>
            <AccordionContent>
            The approximate delivery time will depend on the following :
            <ul className='ml-12  list-disc'>
              <li>Lahore , Karachi , Islamabad/Rawalpindi are usually delivered in 2-3 business days .</li>
              <li>Delivery to other remote cities take 4-7 business Days.</li>
            </ul>
            However, our business days exclude public holidays and Sundays.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Does Clicky deliver internationally?</AccordionTrigger>
            <AccordionContent>
            Not , we are not shipping outside Pakistan.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>How can I keep track of the status of my orders?</AccordionTrigger>
            <AccordionContent>
            The ‘My Account’ section in your clicky App will help review the status of your orders, so that you can receive relevant information based on the respective ‘Order Number’.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>Will I get a confirmation call from Clicky after placing order?</AccordionTrigger>
            <AccordionContent>
            No we dont call customers for order confirmation. All new customers are logged in to clicky app via OTP(one time password) so we take this as order confirmation and ship you the order right away.
            </AccordionContent>
          </AccordionItem>
        </Accordion>


      </div>
    </div>
   
  )
}

export default page