import React from "react";
import HelpText from "@/components/website/HelpPageComponents/HelpText";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import HelpObj from "@/shared/json/help.json";
export default function Page() {



  const FAQ = [ 
    
      {
        id: "item-1",
        question: "How can I keep track of the status of my orders?",
        answer: "The ‘My Account' section in your clicky App will help review the status of your orders, so that you can receive relevant information based on the respective ‘Order Number'."
      },
      {
        id: "item-2",
        question: "Will I get a confirmation call from Clicky after placing order?",
        answer: "No we don't call customers for order confirmation. All new customers are logged in to clicky app via OTP(one time password) so we take this as order confirmation and ship you the order right away."
      },
      {
        id: "item-3",
        question: "How can I cancel my order?",
        answer: "In order to cancel your order, please login to clicky app in your my account section. Open the order you want to cancel and you will see an option to cancel the order. Your order can only be cancelled before it reaches the ‘Dispatched' status in your my account on Clicky app."
      },
      {
        id: "item-4",
        question: "What is the procedure for Returns or Exchange?",
        answer: <div>You can return your product easily through clicky app in few seconds. Just follow these steps:<ul className='ml-12 list-disc'><li>You can Sign in to your Clicky Account From Here.</li><li>Go to my order section.</li><li>Click on the View order for the specific order you want to place replacement/refund Request</li><li>Select refund/replace option from the top and then click one or all items that you want return or replaced.</li><li>Select the quantities and reason for replacement/refund</li><li>Click on the SAVE button to submit the request</li></ul></div>
      },
      {
        id: "item-5",
        question: "I wish to become a seller on Clicky",
        answer: <span>Fill <a className='text-red-900' href='#'>this form</a> and our team will reach you as soon as possible.</span>
      },
      {
        id: "item-6",
        question: "I can't sign in to my account.",
        answer: <span>Go to <a className='text-red-900' href='#'>Reset password page.</a> Fill in your registered phone or email id and tap Rest Password. An otp will be sent to your medium either phone or email. Enter the otp and set a new password.</span>
      },
      {
        id: "item-7",
        question: "What are the delivery charges?",
        answer: "Delivery charge is the fee that has to be paid for the on-time delivery of a purchased product. Our standard shipping charges are Rs 150 but it keeps on changing based on the number of products purchased. For the best understanding please see the total shipping fee added to your order at checkout page."
      }
    
    
  ];






  return (
    <div>
      <div className="p-5 w-full">
        <span className="text-2xl font-bold text-center p-3  mb-8">
          Help topics
        </span>
      </div>

      <div className=" w-full mt-5 bg-white p-8 rounded-lg shadow">
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-8  w-full object-cover">
          {HelpObj.map((comp, index) => (
            <Link
              href={comp.url}
              key={index}
              className="flex flex-col xl:flex-row items-center justify-start cursor-pointer  hover:text-cyan-500  transition-colors  flex-wrap"
            >
              <Image
                className="object-cover"
                src={comp.images}
                height={100}
                width={100}
                alt="the icon"
              />
              <span className=" text-center font-semibold  px-8 w-56">
                {comp.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className=" p-5">
        <span className="text-3xl font-bold text-center text-gray-700  ">
          Frequently Asked Questions
        </span>
      </div>

      <div className="w-full mx-auto mt-5 bg-white p-8 rounded-lg shadow">
      <Accordion type="single" collapsible className="w-full">
    {FAQ.map((item) => (
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
  );
}
