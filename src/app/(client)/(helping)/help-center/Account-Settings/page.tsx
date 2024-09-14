import React from 'react'
import HelpObj from '@/shared/json/help.json'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import BackBtn from '@/components/website/HelpPageComponents/HelpComponents/BackBtn'
const page = () => {
  
    const accordion= [
      {
        id: "item-1",
        question: "How can I create an account on Clicky?",
        answer: "First-time shoppers can easily register with us by clicking on the ‘Register' link on our homepage. You will be asked to provide us with a few basic pieces of information, including your name, email address, and contact details, along with a secure password. Make sure to fill in the mandatory details before submitting the form. After successful registration, you will receive an email containing your login details. Given below are a few points to remember while setting up an account on Clicky: Add the current email address. This email address will be used to help retrieve your password, in case you forget it. Your password must be a combination of alphanumeric characters, and should have a minimum of 5 characters, including a number and an alphabet. By creating a Clicky account you're legally agreeing to our User Terms and Privacy Policy. Please be assured that we never share your personal information with any individual, group, or company outside Clicky."
      },
      {
        id: "item-2",
        question: "I can't sign in to my account.",
        answer: "Go to the Reset password page. Fill in your registered phone or email ID and tap Reset Password. An OTP will be sent to your medium, either phone or email. Enter the OTP and set a new password."
      },
      {
        id: "item-3",
        question: "I want to change my account information.",
        answer: "To change your account information, please visit your account profile details."
      },
      {
        id: "item-4",
        question: "I have an issue with my mobile app. What should I do?",
        answer: "Please email your registered email or phone and the issue you're facing to support@clicky.pk with the subject line “Issue with the app”. We'll get back to you within 24 hours."
      }
    ]
  
  
  return (
    <div> <BackBtn myText={HelpObj.find(item => item.title === "Account Settings")}/>
     <div className="max-w-7xl mx-auto mt-5 bg-white p-8 rounded-lg shadow">
     <Accordion type="single" collapsible className="w-full">
    {accordion.map((item) => (
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