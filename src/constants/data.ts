type Subcategory = {
    name: string;
    href: string;
  };
  
  type Category = {
    Category: string;
    href: string;
    subcategories?: Subcategory[];
  };
  
  type Navigation = {
    type: string;
    categories: Category[];
  };
  
  export const navigations: Navigation[] = [
    {
      type: "men",
      categories: [
        {
          Category: "TOPWEAR",
          href: "#",
          subcategories: [
            { name: "Vests", href: "#" },
            { name: "Shirts", href: "#" },
            { name: "T-shirts", href: "#" },
            { name: "Hoodies", href: "#" },
            { name: "Sweatshirts", href: "#" },
            { name: "Traditional", href: "#" },
            { name: "Sleep & Lounge", href: "#" },
          ],
        },
        {
          Category: "BOTTOMWEAR",
          href: "#",
          subcategories: [
            { name: "Boxers", href: "#" },
            { name: "Shorts", href: "#" },
            { name: "Jeans", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Trousers", href: "#" },
          ],
        },
        {
          Category: "FOOTWEAR",
          href: "#",
          subcategories: [
            { name: "Casual Shoes", href: "#" },
            { name: "Boots", href: "#" },
            { name: "Sports Shoes", href: "#" },
            { name: "Formal Shoes", href: "#" },
            { name: "Peshawari", href: "#" },
            { name: "Sandals", href: "#" },
            { name: "Sneakers", href: "#" },
            { name: "Slippers", href: "#" },
          ],
        },
        {
          Category: "ACCESSORIES",
          href: "#",
          subcategories: [
            { name: "Wallets", href: "#" },
            { name: "Belts & Key chains", href: "#" },
            { name: "Fragrances", href: "#" },
            { name: "Eyewear", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Watches", href: "#" },
          ],
        },
      ],
    },
    {
      type: "women",
      categories: [
        {
          Category: "WESTERN WEAR",
          href: "#",
          subcategories: [
            { name: "Tops & Tunics", href: "#" },
            { name: "T-shirts & Tanktops", href: "#" },
            { name: "Jeans", href: "#" },
            { name: "Pants & Trousers", href: "#" },
            { name: "Dresses & Skirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Hoodies & Sweatshirts", href: "#" },
            { name: "Sweaters", href: "#" },
          ],
        },
        {
          Category: "ETHNIC WEAR",
          href: "#",
          subcategories: [
            { name: "Unstitched", href: "#" },
            { name: "Shalwar Kameez", href: "#" },
            { name: "Dupattas & Shawls", href: "#" },
            { name: "Bottoms", href: "#" },
            { name: "Kurtas", href: "#" },
            { name: "Festive Wear", href: "#" },
            { name: "Dresses", href: "#" },
          ],
        },
        {
          Category: "FOOTWEAR",
          href: "#",
          subcategories: [
            { name: "Heels", href: "#" },
            { name: "Sports Shoes", href: "#" },
            { name: "Flats", href: "#" },
            { name: "Pumps", href: "#" },
            { name: "Flip Flops", href: "#" },
            { name: "Slippers", href: "#" },
            { name: "Sneakers", href: "#" },
            { name: "Khussa", href: "#" },
            { name: "Mules", href: "#" },
            { name: "Wedges", href: "#" },
            { name: "Sandals", href: "#" },
          ],
        },
        {
          Category: "ACCESSORIES",
          href: "#",
          subcategories: [
            { name: "Watches", href: "#" },
            { name: "Jewellery", href: "#" },
            { name: "Bags", href: "#" },
          ],
        },
        {
          Category: "LINGERIE & NIGHTWEAR",
          href: "#",
          subcategories: [
            { name: "Sleepwear", href: "#" },
            { name: "Kaftan", href: "#" },
          ],
        },
      ],
    },
    {
      type: "kids",
      categories: [
        {
          Category: "GIRL'S",
          href: "#",
          subcategories: [
            { name: "Dresses", href: "#" },
            { name: "Bottoms", href: "#" },
            { name: "Tops & Tees", href: "#" },
            { name: "Festive wear", href: "#" },
            { name: "JumpSuit", href: "#" },
            { name: "Footwear", href: "#" },
          ],
        },
        {
          Category: "BOY'S",
          href: "#",
          subcategories: [
            { name: "Shirts", href: "#" },
            { name: "T-shirts", href: "#" },
            { name: "Festive wear", href: "#" },
            { name: "Footwear", href: "#" },
          ],
        },
        {
          Category: "KIDS ACCESSORIES",
          href: "#",
          subcategories: [],
        },
      ],
    },
    {
      type: "beauty",
      categories: [
        {
          Category: "MAKE UP",
          href: "#",
          subcategories: [
            { name: "Face", href: "#" },
            { name: "Eyes", href: "#" },
            { name: "Lips", href: "#" },
          ],
        },
        {
          Category: "SKIN CARE",
          href: "#",
          subcategories: [
            { name: "Cleansers", href: "#" },
            { name: "Mask", href: "#" },
          ],
        },
      ],
    },
    {
      type: "others",
      categories: [
        {
          Category: "HOME",
          href: "#",
          subcategories: [{ name: "Home Decor", href: "#" }],
        },
        {
          Category: "BEDDING",
          href: "#",
          subcategories: [
            { name: "Bedsheets", href: "#" },
            { name: "7 Pcs Comforter Sets", href: "#" },
            { name: "Pillow Covers", href: "#" },
            { name: "6 Pcs Winter Quilt Sets", href: "#" },
            { name: "Bridal Set", href: "#" },
            { name: "Mattress Protector", href: "#" },
          ],
        },
        {
          Category: "GADGETS",
          href: "#",
          subcategories: [
            { name: "Mobile Accessories", href: "#" },
            { name: "Smart Watches", href: "#" },
          ],
        },
      ],
    },
  ];
  

  // interface Subcategory {
  //   name: string;
  //   image: string;
  //   price: string;
  // }
  
  // interface Category {
  //   name: string;
  //   subcategories?: Subcategory[];
  // }

  export interface ShopItem {
    _id: string;
    img: string;
    name: string;
    price: string;
  }
  
  // export const categories: Category[] = [
  //   {
  //     name: "W",
  //     subcategories: [
  //       {
  //         name: "Shalwar Kameez",
  //         image: "/assets/home/Women/shalwar1.png",
  //         price: "2889",
  //       },
  //       {
  //         name: "heels",
  //         image: "/assets/home/Women/heels1.png",
  //         price: "3889",
  //       },
  //       {
  //         name: "heels",
  //         image: "/assets/home/Women/heels2.png",
  //         price: "3889",
  //       },
  //       {
  //         name: "heels",
  //         image: "/assets/home/Women/heels3.png",
  //         price: "3889",
  //       },
  //       // Add more subcategories as needed
  //     ],
  //   },
  //   {
  //     name: "M",
  //     subcategories: [
  //       {
  //         name: "Casual Shoes",
  //         image: "/assets/home/Men/CasualShoes1.png",
  //         price: "5889",
  //       },
  //       {
  //         name: "Casual Shoes",
  //         image: "/assets/home/Men/CasualShoes2.png",
  //         price: "5389",
  //       },
  //       {
  //         name: "Casual Shoes",
  //         image: "/assets/home/Men/CasualShoes3.png",
  //         price: "1889",
  //       },
  //       // Add more subcategories as needed
  //     ],
  //   },
  //   // Add more categories as needed
  // ];
  