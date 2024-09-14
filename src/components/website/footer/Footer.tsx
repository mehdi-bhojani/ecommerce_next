import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import sections from '@/shared/json/sections.json'
import appAndSocialData from '@/shared/json/appAndSocialData.json'
import helpInfoData from '@/shared/json/helpInfoData.json'
import { useAtom, useStore } from 'jotai';
import { storeAtom } from '@/shared/atoms/storeAtom';
import { SocialMediaLinksForm } from '@/components/admin/store/SocialMediaLinksForm';
import UseMyStore from '@/shared/hooks/useStore';
import ClientLoading from '@/components/myUi/ClientLoading';
const Footer = () => {
  const { loading } = UseMyStore();

  const [myStoreAtom, setStoreAtom] = useAtom(storeAtom);
  if (loading) {
    return <div><ClientLoading /></div>
  }
  return (
    <div className='hidden md:block'>

      <div className='flex flex-row justify-around items-start border-b bg-gray-100   pb-12 pt-8 '>


        {helpInfoData.map((section, index) => (
          <div key={index} className="flex flex-col gap-3 font-outfit font-bold">
            <span className="tracking-wide">{section.title}</span> {/* Adjust letter spacing */}
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
          <span className="tracking-wide">ABOUT CLICKY</span> {/* Adjust letter spacing */}
          <div className="text-stone-600 flex flex-col gap-2 font-outfit text-sm tracking-wider">

            <a href={""} className="hover:underline tracking-wide">
              About Us
            </a>
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

        <div className='flex flex-col gap-3 font-outfit font-bold'>

          <div className='flex flex-col gap-3 font-outfit font-bold'>
            <span>KEEP IN TOUCH</span>
            <div className='font-outfit  text-sm text-stone-600 '>
              <div className='flex flex-row items-center gap-5'>

                <Link href={myStoreAtom?.socialMediaLinks.facebook!} className={'w-1/12 h-1/12'}>
                  <Image
                    width={100}
                    height={100}
                    src={'/assets/home/Social-medias/facebook.png'}
                    alt={'Facebook'}
                  />
                </Link>
                <Link href={myStoreAtom?.socialMediaLinks.instagram!} className={'w-1/12 h-1/12'}>
                  <Image
                    width={100}
                    height={100}
                    src={'/assets/home/Social-medias/insta.png'}
                    alt={'Facebook'}
                  />
                </Link>
                <Link href={myStoreAtom?.socialMediaLinks.twitter!} className={'w-1/12 h-1/12'}>
                  <Image
                    width={100}
                    height={100}
                    src={'/assets/home/Social-medias/twitter.png'}
                    alt={'Twitter'}
                  />
                </Link>

              </div>
            </div>
          </div>

        </div>


      </div>


      <div className=' px-5 flex flex-row  items-start   pb-12 pt-8 bg-gray-100'>

        {sections.map((section, index) => (
          <div key={index} className='flex flex-col gap-3 font-outfit font-bold text-sm w-1/4 px-3'>
            <span className='flex flex-nowrap'>{section.title}</span>
            <div className='text-stone-600 flex flex-col gap-2 font-outfit font-semibold text-xs'>
              <span>{section.description}</span>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Footer