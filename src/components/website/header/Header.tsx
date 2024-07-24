"use client"
  import { Button } from '@/components/ui/button'
  import { HeadsetIcon,Bell,User,Heart ,ShoppingCart,Search} from 'lucide-react'
  import { Input } from '@/components/ui/input'
import Image from 'next/image'

 
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
  Category: string; 
  href: string; 
  subcategories?: { name: string; href: string; }[]; 
}[] = [
  {
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
  {
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
  {
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
  {
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
  Category: string; 
  href: string; 
  subcategories?: { name: string; href: string; }[]; 
}[] = [
  {
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
  {
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
  {
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
  {
    Category: 'ACCESSORIES',
    href: '#',
    subcategories: [
      { name: 'Watches', href: '#' },
      { name: 'Jewellery', href: '#' },
      { name: 'Bags', href: '#' },
    ]
  },
  {
    Category: 'LINGERIE & NIGHTWEAR',
    href: '#',
    subcategories: [
      { name: 'Sleepwear', href: '#' },
      { name: 'Kaftan', href: '#' },
    ]
  },
];



const KIDSCategories: { 
  Category: string; 
  href: string; 
  subcategories?: { name: string; href: string; }[]; 
}[] = [
  {
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
  {
    Category: "BOY'S",
    href: '#',
    subcategories: [
      { name: 'Shirts', href: '#' },
      { name: 'T-shirts', href: '#' },
      { name: 'Festive wear', href: '#' },
      { name: 'Footwear', href: '#' },
    
    ]
  },
  {
    Category: 'KIDS ACCESSORIES',
    href: '#',
    subcategories: [
     
     
    ]
  },
  
];
 

const BEAUTYCategories: { 
  Category: string; 
  href: string; 
  subcategories?: { name: string; href: string; }[]; 
}[] = [
  {
    Category: "MAKE UP",
    href: '#',
    subcategories: [
      { name: 'Face', href: '#' },
      { name: 'Eyes', href: '#' },
      { name: 'Lips', href: '#' },
     
     
    ]
  },
  {
    Category: "SKIN CARE",
    href: '#',
    subcategories: [
      { name: 'Cleansers', href: '#' },
      { name: 'Mask', href: '#' },
     
    
    ]
  },

];
 


const OTHERSCategories: { 
  Category: string; 
  href: string; 
  subcategories?: { name: string; href: string; }[]; 
}[] = [
  {
    Category: "HOME",
    href: '#',
    subcategories: [
      { name: 'Home Decor', href: '#' },
    
     
    ]
  },
  {
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
  {
    Category: "GADGETS",
    href: '#',
    subcategories: [
      { name: 'Mobile Accessories', href: '#' },
      { name: 'Smart Watches', href: '#' },
    ]
  },

];


  function Header() {
    return (
      <div>
          <div className='flex  items-center flex-1 px-2'>
              <div>
                
                 <Image className='border px-1'  width={80}
      height={120} src={'/assets/home/logo.png'} alt='the logo'/>
              </div>
              <div >
                    
                      <ul className='flex font-mono text-sm items-center'>
                      <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Men</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-row flex-nowrap w-[1000px] ">
         
              {MenCategories.map((component) => (
                <div className='flex flex-col flex-nowrap  '>
                <ListItem
                  key={component.Category}
                  title={component.Category}
                  href={component.href}
                  className='text-xl underline py-4'
                >
                 
                </ListItem>
                {component.subcategories?.map((subcategory) => (
          <ListItem
            key={subcategory.name}
            title={subcategory.name}
            href={subcategory.href}
          />
        ))}
                </div>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Women</NavigationMenuTrigger>
          <NavigationMenuContent>
          <ul className="flex flex-row flex-nowrap w-[1000px] ">
         
         {WOMENCategories.map((component) => (
           <div className='flex flex-col flex-nowrap '>
           <ListItem
             key={component.Category}
             title={component.Category}
             href={component.href}
             className='text-xl underline py-4'
           >
            
           </ListItem>
           {component.subcategories?.map((subcategory) => (
     <ListItem
       key={subcategory.name}
       title={subcategory.name}
       href={subcategory.href}
     />
   ))}
           </div>
         ))}
       </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Kids</NavigationMenuTrigger>
          <NavigationMenuContent>
          <ul className="flex flex-row flex-nowrap w-[1000px] ">
         
         {KIDSCategories.map((component) => (
           <div className='flex flex-col flex-nowrap '>
           <ListItem
             key={component.Category}
             title={component.Category}
             href={component.href}
             className='text-xl underline py-4'
           >
            
           </ListItem>
           {component.subcategories?.map((subcategory) => (
     <ListItem
       key={subcategory.name}
       title={subcategory.name}
       href={subcategory.href}
     />
   ))}
           </div>
         ))}
       </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Beauty</NavigationMenuTrigger>
          <NavigationMenuContent>
          <ul className="flex flex-row flex-nowrap w-[1000px] ">
         
         {BEAUTYCategories.map((component) => (
           <div className='flex flex-col flex-nowrap '>
           <ListItem
             key={component.Category}
             title={component.Category}
             href={component.href}
             className='text-xl underline py-4'
           >
            
           </ListItem>
           {component.subcategories?.map((subcategory) => (
     <ListItem
       key={subcategory.name}
       title={subcategory.name}
       href={subcategory.href}
     />
   ))}
           </div>
         ))}
       </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Others</NavigationMenuTrigger>
          <NavigationMenuContent>
          <ul className="flex flex-row flex-nowrap w-[1000px] ">
         
         {OTHERSCategories.map((component) => (
           <div className='flex flex-col flex-nowrap '>
           <ListItem
             key={component.Category}
             title={component.Category}
             href={component.href}
             className='text-xl underline py-4'
           >
            
           </ListItem>
           {component.subcategories?.map((subcategory) => (
     <ListItem
       key={subcategory.name}
       title={subcategory.name}
       href={subcategory.href}
     />
   ))}
           </div>
         ))}
       </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
             NewArrivals
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Sale
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
                      </ul>
                 
              </div>
              <div className='flex flex-1 bg-gray-100 mx-2'>
               
                 <Input className='w-72 h-10   bg-gray-100 outline-none border-none flex-1' placeholder='search for items, brands and sinpirat'/>
                 <div>
                  <button  className='bg-yellow-300 p-2'><Search /></button>
                  </div>
              </div>
              <div>
                <nav>
                  <ul className='flex '>
                      <li className='px-4'>
                      <HeadsetIcon  />
                      </li>
                      <li className='px-4'>
                      <Bell />
                      </li>
                      <li className='px-4'>
                      <User />
                      </li>
                      <li className='px-4'>
                      <Heart />
                      </li>
                      <li className='px-4'>
                      <ShoppingCart />
                      </li>
                    
                      
                      
                  </ul>
                </nav>
              </div>
          </div>
      </div>
    )
  }
  const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className= "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          
          {...props}
        >
          <div className={cn( "text-sm font-medium leading-none",className )}>{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
  export default Header