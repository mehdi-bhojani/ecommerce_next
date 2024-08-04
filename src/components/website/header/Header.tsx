"use client"
import { Button } from '@/components/ui/button'
import { HeadsetIcon, Bell, User, Heart, ShoppingCart, Search, Package, Facebook } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { useState } from 'react'


import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

const MenCategories: {
  type:string;
  Category: string;
  href: string;
  subcategories?: { name: string; href: string; }[];
}[] = [
    { type:'men',
      Category: 'TOPWEAR',
      href: '#',
      subcategories: [
        { name: 'Vests', href: '#' },
        { name: 'Shirts', href: '#' },
        { name: 'T-shirts', href: '#' },
        { name: 'Hoodies', href: '#' },
        { name: 'Sweatshirts', href: '#' },
        { name: 'Traditional', href: '#' },
        { name: 'Sleep & Lounge', href: '#' },
      ]
    },
    { type:'men',
      Category: 'BOTTOMWEAR',
      href: '#',
      subcategories: [
        { name: 'Boxers', href: '#' },
        { name: 'Shorts', href: '#' },
        { name: 'Jeans', href: '#' },
        { name: 'Pants', href: '#' },
        { name: 'Trousers', href: '#' },

      ]
    },
    { type:'men',
      Category: 'FOOTWEAR',
      href: '#',
      subcategories: [
        { name: 'Casual Shoes', href: '#' },
        { name: 'Boots', href: '#' },
        { name: 'Sports Shoes', href: '#' },
        { name: 'Formal Shoes', href: '#' },
        { name: 'Peshawari', href: '#' },
        { name: 'Sandals', href: '#' },
        { name: 'Sneakers', href: '#' },
        { name: 'Slippers', href: '#' },

      ]
    },
    { type:'men',
      Category: 'ACCESSORIES',
      href: '#',
      subcategories: [
        { name: 'Wallets', href: '#' },
        { name: 'Belts & Key chains', href: '#' },
        { name: 'Fragrances', href: '#' },
        { name: 'Eyewear', href: '#' },
        { name: 'Bags', href: '#' },
        { name: 'Watches', href: '#' },


      ]
    },
  ];


const WOMENCategories: {
  type:string;
  Category: string;
  href: string;
  subcategories?: { name: string; href: string; }[];
}[] = [
    { type:'women',
      Category: 'WESTERN WEAR',
      href: '#',
      subcategories: [
        { name: 'Tops & Tunics', href: '#' },
        { name: 'T-shirts & Tanktops', href: '#' },
        { name: 'Jeans', href: '#' },
        { name: 'Pants & Trousers', href: '#' },
        { name: 'Dresses & Skirts', href: '#' },
        { name: 'Jackets', href: '#' },
        { name: 'Hoodies & Sewatshirts', href: '#' },
        { name: 'Sweaters', href: '#' },
      ]
    },
    { type:'women',
      Category: 'ETHNIC WEAR',
      href: '#',
      subcategories: [
        { name: 'Unstitched', href: '#' },
        { name: 'Shalwar Kameez', href: '#' },
        { name: 'Dupattas & Shawls', href: '#' },
        { name: 'Bottoms', href: '#' },
        { name: 'Kurtas', href: '#' },
        { name: 'Festive Wear', href: '#' },
        { name: 'Dresses', href: '#' },

      ]
    },
    { type:'women',
      Category: 'FOOTWEAR',
      href: '#',
      subcategories: [
        { name: 'Heels', href: '#' },
        { name: 'Sports Shoes', href: '#' },
        { name: 'Flats', href: '#' },
        { name: 'Pumps', href: '#' },
        { name: 'Flip Flops', href: '#' },
        { name: 'Slippers', href: '#' },
        { name: 'Sneakers', href: '#' },
        { name: 'Khussa', href: '#' },
        { name: 'Mules', href: '#' },
        { name: 'Wedges', href: '#' },
        { name: 'Sandals', href: '#' },

      ]
    },
    { type:'women',
      Category: 'ACCESSORIES',
      href: '#',
      subcategories: [
        { name: 'Watches', href: '#' },
        { name: 'Jewellery', href: '#' },
        { name: 'Bags', href: '#' },
      ]
    },
    { type:'women',
      Category: 'LINGERIE & NIGHTWEAR',
      href: '#',
      subcategories: [
        { name: 'Sleepwear', href: '#' },
        { name: 'Kaftan', href: '#' },
      ]
    },
  ];



const KIDSCategories: {
  type:string;
  Category: string;
  href: string;
  subcategories?: { name: string; href: string; }[];
}[] = [
    {type:'kids',
      Category: "GIRL'S",
      href: '#',
      subcategories: [
        { name: 'Dresses', href: '#' },
        { name: 'Bottoms', href: '#' },
        { name: 'Tops & Tees', href: '#' },
        { name: 'Festive wear', href: '#' },
        { name: 'JumpSuit', href: '#' },
        { name: 'Footwear', href: '#' },

      ]
    },
    {type:'kids',
      Category: "BOY'S",
      href: '#',
      subcategories: [
        { name: 'Shirts', href: '#' },
        { name: 'T-shirts', href: '#' },
        { name: 'Festive wear', href: '#' },
        { name: 'Footwear', href: '#' },

      ]
    },
    {type:'kids',
      Category: 'KIDS ACCESSORIES',
      href: '#',
      subcategories: [


      ]
    },

  ];


const BEAUTYCategories: {
  type:string;
  Category: string;
  href: string;
  subcategories?: { name: string; href: string; }[];
}[] = [
    {type:'beauty',
      Category: "MAKE UP",
      href: '#',
      subcategories: [
        { name: 'Face', href: '#' },
        { name: 'Eyes', href: '#' },
        { name: 'Lips', href: '#' },


      ]
    },
    {type:'beauty',
      Category: "SKIN CARE",
      href: '#',
      subcategories: [
        { name: 'Cleansers', href: '#' },
        { name: 'Mask', href: '#' },


      ]
    },

  ];



const OTHERSCategories: {
  type:string;
  Category: string;
  href: string;
  subcategories?: { name: string; href: string; }[];
}[] = [
    {type:'others',
      Category: "HOME",
      href: '#',
      subcategories: [
        { name: 'Home Decor', href: '#' },


      ]
    },
    {type:'others',
      Category: "BEDDING",
      href: '#',
      subcategories: [
        { name: 'Bedsheets', href: '#' },
        { name: '7 Pcs Comforter Sets', href: '#' },
        { name: 'Pillow Covers', href: '#' },
        { name: '6 Pcs Winter Quilt Sets', href: '#' },
        { name: 'Bridal Set', href: '#' },
        { name: 'Mattress Protector', href: '#' },


      ]
    },
    {type:'others',
      Category: "GADGETS",
      href: '#',
      subcategories: [
        { name: 'Mobile Accessories', href: '#' },
        { name: 'Smart Watches', href: '#' },
      ]
    },

  ];


function Header() {
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [CreateAccount, setCreateAccount] = useState(false);


  const showCreateAccount = () => {
    setCreateAccount(true);
  }

  const showResetPassword = () => {
    setIsResetPassword(true);
  };

  const showLogin = () => {
    setIsResetPassword(false);
    setCreateAccount(false);
  };
  return (
    <div>
      <div className='flex  items-center flex-1 px-2'>

        {/* testing animations */}




        <div>

          <Image className=' px-1' width={80}
            height={120} src={'/assets/home/logo.png'} alt='the logo' />
        </div>
        <div >

          <ul className='flex font-mono text-sm items-center'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className='font-semibold text-sm'>
                <Link href="/MEN" >
                  <NavigationMenuTrigger >MEN</NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <ul key={1} className="flex flex-row flex-nowrap w-[1000px] ">

                      {MenCategories.map((component) => (
                        <div key={component.Category} className='flex flex-col flex-nowrap  '>
                          <ListItem
                            key={component.Category}
                            title={component.Category}
                            href={`/${component.type}-${component.Category.replace(/\s+/g, '-')}`}
                            className='text-xl underline py-4'
                          >

                          </ListItem>
                          {component.subcategories?.map((subcategory) => (
                            <ListItem
                              key={subcategory.name}
                              title={subcategory.name}
                              href={`/${component.type}-${subcategory.name.replace(/\s+/g, '-')}`}
                            />
                          ))}
                        </div>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className='font-semibold text-sm'>
                <Link href="/WOMEN" >
                  <NavigationMenuTrigger>WOMEN</NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <ul key={2} className="flex flex-row flex-nowrap w-[1000px] ">

                      {WOMENCategories.map((component) => (
                        <div className='flex flex-col flex-nowrap '>
                          <ListItem
                            key={component.Category}
                            title={component.Category}
                            href={`/${component.type}-${component.Category.replace(/\s+/g, '-')}`}
                            className='text-xl underline py-4'
                          >

                          </ListItem>
                          {component.subcategories?.map((subcategory) => (
                            <ListItem
                              key={subcategory.name}
                              title={subcategory.name}
                              href={`/${component.type}-${subcategory.name.replace(/\s+/g, '-')}`}
                            />
                          ))}
                        </div>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className='font-semibold text-sm'>
                <Link href="/KIDS" >
                  <NavigationMenuTrigger>KIDS</NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <ul key={3} className="flex flex-row flex-nowrap w-[1000px] ">

                      {KIDSCategories.map((component) => (
                        <div className='flex flex-col flex-nowrap '>
                          <ListItem
                            key={component.Category}
                            title={component.Category}
                            href={`/${component.type}-${component.Category.replace(/\s+/g, '-')}`}
                            className='text-xl underline py-4'
                          >

                          </ListItem>
                          {component.subcategories?.map((subcategory) => (
                            <ListItem
                              key={subcategory.name}
                              title={subcategory.name}
                              href={`/${component.type}-${subcategory.name.replace(/\s+/g, '-')}`}
                            />
                          ))}
                        </div>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className='font-semibold text-sm'>
                <Link href="/BEAUTY" >
                  <NavigationMenuTrigger>BEAUTY</NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <ul key={4} className="flex flex-row flex-nowrap w-[1000px] ">

                      {BEAUTYCategories.map((component) => (
                        <div className='flex flex-col flex-nowrap '>
                          <ListItem
                            key={component.Category}
                            title={component.Category}
                            href={`/${component.type}-${component.Category.replace(/\s+/g, '-')}`}
                            className='text-xl underline py-4'
                          >

                          </ListItem>
                          {component.subcategories?.map((subcategory) => (
                            <ListItem
                              key={subcategory.name}
                              title={subcategory.name}
                              href={`/${component.type}-${subcategory.name.replace(/\s+/g, '-')}`}
                            />
                          ))}
                        </div>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className='font-semibold text-sm'>
                  <Link href="/OTHERS" >
                    <NavigationMenuTrigger>OTHERS</NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <ul key={5} className="flex flex-row flex-nowrap w-[1000px] ">

                      {OTHERSCategories.map((component) => (
                        <div className='flex flex-col flex-nowrap '>
                          <ListItem
                            key={component.Category}
                            title={component.Category}
                            href={`/${component.type}-${component.Category.replace(/\s+/g, '-')}`}
                            className='text-xl underline py-4'
                          >

                          </ListItem>
                          {component.subcategories?.map((subcategory) => (
                            <ListItem
                              key={subcategory.name}
                              title={subcategory.name}
                              href={`/${component.type}-${subcategory.name.replace(/\s+/g, '-')}`}
                            />
                          ))}
                        </div>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className='font-semibold text-sm'>

                  <Link href="/NEWARRIVALS" className={navigationMenuTriggerStyle()}>
                    NEW ARRIVALS
                  </Link>

                </NavigationMenuItem>
                <NavigationMenuItem className='text-red-700 font-semibold text-sm'>

                  <Link href="/SALES" className={navigationMenuTriggerStyle()}>
                    SALES
                  </Link>

                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </ul>

        </div>
        <div className='flex flex-1 bg-gray-100 mx-2'>

          <Input className='w-72 h-10   bg-gray-100 outline-none border-none flex-1' placeholder='search for items, brands and sinpirat' />
          <div>
            <button className='bg-yellow-300 p-2'><Search /></button>
          </div>
        </div>
        <div>
          <nav>
            <ul className='flex '>
              <li className='px-4'>
                <Link href="/help-center">
                  <HeadsetIcon />
                </Link>

              </li>
              <li className='px-4'>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Bell className='hover:cursor-pointer ' />
                  </HoverCardTrigger>
                  <HoverCardContent className='w-80'>
                    <div className='flex flex-col '>
                      <span className='p-5 bg-gray-200  text-center'>Notifications</span>
                      <span className='px-4  py-10  text-center' >No Notifications</span>
                    </div>
                  </HoverCardContent>
                </HoverCard>


              </li>
              <li className='px-4'>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <User className='hover:cursor-pointer ' />
                  </HoverCardTrigger>
                  <HoverCardContent className='w-60'>
                    <div className='flex flex-col '>
                      <div className='p-2 font-medium flex text-neutral-600 flex-row bg-gray-200 justify-around'>
                        <span>Sign In</span>
                        <span>Join</span>
                      </div>
                      <div className='p-4  font-semibold flex gap-2 flex-row justify-start border-b border-gray-400'>
                        <User className='hover:cursor-pointer  ' />
                        <span>My Account</span>
                      </div>
                      <div className='p-4  font-semibold flex gap-2 flex-row  justify-start border-b border-gray-400'>
                        <Package className='hover:cursor-pointer ' />
                        <span>My Orders</span>
                      </div>
                      <div className='p-4 font-semibold flex gap-2 flex-row justify-start border-b border-gray-400'>
                        <Heart className='hover:cursor-pointer ' />
                        <span>My WishLists</span>
                      </div>


                    </div>
                  </HoverCardContent>
                </HoverCard>
              </li>
              <li className='px-4'>
                <Sheet>
                  <SheetTrigger asChild>
                    <Heart className='hover:cursor-pointer ' />
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Login or Signup</SheetTitle>
                    </SheetHeader>
                    <div className='mt-16' >
                      <div className='text-center w-full'>
                        <span >Get access to your Wishlist</span>
                      </div>
                      {!isResetPassword && !CreateAccount ? (
                        <div>


                          <div className='w-full flex flex-row gap-2 justify-around mt-6'>
                            <button className='bg-gray-100 rounded-lg w-1/2 flex justify-center h-14 items-center'>
                              <svg className='w-8' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                                <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                              </svg>
                            </button>
                            <button className='bg-gray-100 rounded-lg w-1/2 flex justify-center items-center'>
                              <svg className='w-8' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                                <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                              </svg>
                            </button>
                          </div>

                          <div className="flex items-center justify-center my-9">
                            <div className="border-t border-gray-400 flex-grow"></div>
                            <span className="mx-4 text-gray-600">OR</span>
                            <div className="border-t border-gray-400 flex-grow"></div>
                          </div>

                          <div className="max-w-sm mx-auto p-4">

                            <input type="email" placeholder="Email" className="w-full p-2 mb-4 border border-black" />


                            <input type="password" placeholder="Password" className="w-full p-2 mb-2 border border-gray-300" />


                            <a href="#" className="text-gray-600 mb-4 block" onClick={showResetPassword}>Forgot Password?</a>


                            <button className="w-full py-2 mb-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold">
                              LOGIN WITH EMAIL
                            </button>


                            <div className="flex items-center justify-center my-4">
                              <div className="border-t border-gray-400 flex-grow"></div>
                              <span className="mx-4 text-gray-600">OR</span>
                              <div className="border-t border-gray-400 flex-grow"></div>
                            </div>


                            <button className="w-full py-2 mb-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold">
                              GUEST CHECKOUT
                            </button>


                            <a href="#" className="text-gray-600 block text-center" onClick={showCreateAccount}>New to Clicky? Create an account</a>
                          </div>
                        </div>


                      ) : CreateAccount ? (
                        <div>
                          <input type="email" placeholder="Email" className="w-full p-2 mt-8 mb-2 border border-black" />
                          <input type="phone" placeholder="Phone" className="w-full p-2 my-2 border border-black" />
                          <input type="password" placeholder="Password" className="w-full p-2 my-2 border border-black" />
                          <button className="w-full py-2 mb-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold">
                            SIGN UP WITH EMAIL
                          </button>
                          <a href="#" className="text-gray-600 block text-center" onClick={showLogin} >Already have an account ? Login</a>
                        </div>



                      ) : isResetPassword ? (
                        <div>
                          <input type="email" placeholder="Email" className="w-full p-2 my-8 border border-black" />
                          <button className="w-full py-2 mb-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold">
                            RESET PASSWORD
                          </button>
                          <a href="#" className="text-gray-600 block text-center" onClick={showLogin} >Back to Login</a>
                        </div>

                      ) : ''}

















                    </div>
                  </SheetContent>
                </Sheet>

              </li>
              <li className='px-4'>
                <ShoppingCart className='hover:cursor-pointer ' />
              </li>



            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink href={props.href as string} asChild>
        <Link href={props.href as string}>
          <div
            ref={ref}
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            {...props}
          >
            <div className={cn("text-sm font-medium leading-none", className)}>{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
export default Header