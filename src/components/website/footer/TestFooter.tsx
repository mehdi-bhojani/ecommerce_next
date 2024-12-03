"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Boxes, ChevronDown, Flame, House, UserRound } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { storeAtom } from '@/shared/atoms/storeAtom'
import sections from '@/shared/json/sections.json'
import appAndSocialData from '@/shared/json/appAndSocialData.json'
import helpInfoData from '@/shared/json/helpInfoData.json'
import UseMyStore from '@/shared/hooks/useStore'
import useNavigation from '@/shared/hooks/useNavigation'
import ClientLoading from '@/components/myUi/ClientLoading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { getRandomColor } from '@/shared/helpers/help'

const Footer = () => {
  const { loading } = UseMyStore()
  const [myStoreAtom] = useAtom(storeAtom)
  const [isOpen, setIsOpen] = useState(false)
  const [Flag, setFlag] = useState(false)
  const pathname = usePathname()

  // Sidebar component for responsive design
  const Sidebar = () => {
    const { navigation, loading: navLoading } = useNavigation()
    if (navLoading) return <ClientLoading />

    return (
      <motion.div
        initial={{ x: isOpen ? '-100%' : '' }}
        animate={{ x: isOpen ? '0%' : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full mt-12 bg-white shadow-lg w-full z-50 md:hidden"
      >
        <Accordion type="single" collapsible className="w-full h-full overflow-y-auto pb-32">
          {navigation && navigation.map((category, index) => (
            <AccordionItem key={index} value={category.value}>
              <div
                key={index}
                className="flex justify-between items-center p-6 border-b-2"
                style={{ backgroundColor: getRandomColor() }}
              >
                <AccordionTrigger>
                  <span className="text-2xl text-black w-32 font-bold uppercase text-left">
                    {category.value}
                  </span>
                </AccordionTrigger>
              </div>
              <AccordionContent className="transition-all duration-300 ease-in-out">
                {category.children.map((subcategory: any, subIndex: number) => (
                  <div key={subIndex}>
                    <div className="bg-gray-200 w-full font-bold text-xl p-2">
                      <span>{subcategory.value}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      {subcategory.children.map((subcategory2: any, index: number) => (
                        <div key={index}>
                          <div className="p-2 font-semibold gap-2 flex flex-row justify-start items-center">
                            <Image
                              className="object-cover rounded-full w-10 h-10"
                              alt="category-icon"
                              width={100}
                              height={100}
                              src="/assets/home/Men/CasualShoes1.png"
                            />
                            <span className="text-lg">{subcategory2.value}</span>
                          </div>
                          <Separator />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    )
  }

  const navItems = [
    { id: 1, name: 'Home', icon: <House stroke="gray" />, link: '/' },
    { id: 2, name: 'Category', icon: <Boxes stroke="gray" />, link: '#' },
    { id: 3, name: 'New Arrivals', icon: <Flame stroke="gray" />, link: '/New-Arrivals' },
    { id: 4, name: 'Account', icon: <UserRound stroke="gray" />, link: '/my/account' },
  ]

  if (loading) return <ClientLoading />

  return (
    <div className="w-full">
      {/* Desktop Footer */}
      <div className="hidden md:block">
        <div className="flex flex-row justify-around items-start border-b bg-gray-100 pb-12 pt-8">
          {helpInfoData.map((section, index) => (
            <div key={index} className="flex flex-col gap-3 font-outfit font-bold">
              <span className="tracking-wide">{section.title}</span>
              <div className="text-stone-600 flex flex-col gap-2 font-outfit text-sm tracking-wider">
                {section.items.map((item, itemIndex) => (
                  <a key={itemIndex} href={item.link} className="hover:underline tracking-wide">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-3 font-outfit font-bold">
            <span className="tracking-wide">ABOUT CLICKY</span>
            <div className="text-stone-600 flex flex-col gap-2 font-outfit text-sm tracking-wider">
              <a href="#" className="hover:underline tracking-wide">About Us</a>
              <a href={myStoreAtom?.legal.privacyPolicy} className="hover:underline tracking-wide">
                Privacy Statement
              </a>
              <a href={myStoreAtom?.legal.termsAndConditions} className="hover:underline tracking-wide">
                Terms & Conditions
              </a>
              <a href={myStoreAtom?.legal.refundPolicy} className="hover:underline tracking-wide">
                Returns & Refunds
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-3 font-outfit font-bold">
            <span>KEEP IN TOUCH</span>
            <div className="font-outfit text-sm text-stone-600">
              <div className="flex flex-row items-center gap-5">
                <Link href={myStoreAtom?.socialMediaLinks.facebook || '#'} className="w-1/12 h-1/12">
                  <Image width={100} height={100} src="/assets/home/Social-medias/facebook.png" alt="Facebook" />
                </Link>
                <Link href={myStoreAtom?.socialMediaLinks.instagram || '#'} className="w-1/12 h-1/12">
                  <Image width={100} height={100} src="/assets/home/Social-medias/insta.png" alt="Instagram" />
                </Link>
                <Link href={myStoreAtom?.socialMediaLinks.twitter || '#'} className="w-1/12 h-1/12">
                  <Image width={100} height={100} src="/assets/home/Social-medias/twitter.png" alt="Twitter" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 flex flex-row items-start pb-12 pt-8 bg-gray-100">
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col gap-3 font-outfit font-bold text-sm w-1/4 px-3">
              <span className="flex flex-nowrap">{section.title}</span>
              <div className="text-stone-600 flex flex-col gap-2 font-outfit font-semibold text-xs">
                <span>{section.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Footer */}
      <Sidebar />
      <footer className="fixed bottom-0 w-full bg-white border-t z-50 border-gray-200 md:hidden">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item, index) => (
            <Link key={index} href={item.link} onClick={() => [setFlag(!Flag), setIsOpen(item.id === 2)]}>
              <div className={`flex flex-col items-center ${Flag && 'font-bold text-black'}`}>
                {React.cloneElement(item.icon, { stroke: Flag ? 'black' : 'gray' })}
                <span className={`text-xs mt-1 ${Flag && 'font-bold text-black'}`}>{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default Footer
