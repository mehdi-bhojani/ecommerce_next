// import React, { useEffect } from "react";
// import img1 from "/assets/home/img1.png";
// import Image from "next/image";
// import Link from "next/link";
// import useSWR from 'swr';
// import ClientLoading from "@/components/myUi/ClientLoading";
// import { CategoryType } from "@/lib/types";

// interface CategoryItemProps {
//   name: string;
//   image: string;
// }

// const CategoryItem: React.FC<CategoryItemProps> = ({ name, image }) => (
//   <div className="flex flex-col items-center m-2  my-2">
//     <Image src={image} width={100} height={100} alt={name} className="w-full h-full object-cover mb-1" />
//     <span className="text-center p-0 m-0 font-medium text-sm truncate w-4/5 ">{name}</span>
//   </div>
// );

// // const categories: CategoryItemProps[] = [
// //   {
// //     name: "Tops",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20231003/Category_Top%20(1).gif",
// //   },
// //   {
// //     name: "Kurta",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Kurta.gif",
// //   },
// //   {
// //     name: "Women's Shalwar Kameez",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20231003/Category_Fusion%20(1).gif",
// //   },
// //   {
// //     name: "Handbags",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_HandBags.gif",
// //   },
// //   {
// //     name: "Dresses",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Dresses.gif",
// //   },
// //   {
// //     name: "Men's Casual Shirts",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20231003/Category_Men_Casual_Shirt.gif",
// //   },
// //   {
// //     name: "Men's T-Shirts",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20231003/7.Mens-T-Shirts.gif",
// //   },
// //   {
// //     name: "Girls Clothing",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Gilrs_Clothing.gif",
// //   },
// //   {
// //     name: "Boys Clothing",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Boys_Clothing.gif",
// //   },
// //   {
// //     name: "Lawn",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Lawn.gif",
// //   },
// //   {
// //     name: "Women's Sneakers",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Women's_Sneakers.gif",
// //   },
// //   {
// //     name: "Sports Shoes",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Sports_Shoes.gif",
// //   },
// //   {
// //     name: "Women's Pumps",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Women's_Pumps.gif",
// //   },
// //   {
// //     name: "Casual Shoes",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Casual_Shoes.gif",
// //   },
// //   {
// //     name: "Trousers",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Trousers.gif",
// //   },
// //   {
// //     name: "Women's Bottoms",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Women's_Bottoms.gif",
// //   },
// //   {
// //     name: "Makeup",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Makeup.gif",
// //   },
// //   {
// //     name: "Women's Sleepwear",
// //     image:
// //       "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Women's_Sleepwear.gif",
// //   },
// // ];
// interface myProps {
//   categories: CategoryType[];
// }
// const CategoryGrid: React.FC<myProps> = ({ categories }) => (
//   <div className="grid-cols-3 grid items-center   md:grid-cols-5 ">
//     {categories.map((category, index) => (
//       <Link key={index} href={'/product/'}>
//         <CategoryItem
//           key={category.name}
//           name={category.name}
//           image={category.image}
//         />
//       </Link>
//     ))}
//   </div>
// );


// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const TopCategories = () => {
//   // Using SWR to fetch and cache the data
//   const { data, error } = useSWR('/api/collection/66e8298ea2e71f263f9c1ead', fetcher);
//   console.log(data, error);
//   if (error) {
//     console.log("Error fetching data", error);
//     return <div>Failed to load categories</div>;
//   }

//   if (!data) {
//     return <div><ClientLoading /></div>;
//   }

//   return (
//     <>
//       <div className="text-center flex flex-col ">
//         <span className="uppercase font-semibold text-2xl py-10">
//           top category
//         </span>
//         <CategoryGrid categories={data?.categories} />
//       </div>
//     </>
//   );
// };

// export default TopCategories;


"use client";

import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import ClientLoading from "@/components/myUi/ClientLoading";
import { CategoryType } from "@/lib/types";

interface CategoryItemProps {
  name: string;
  image: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name, image }) => (
  <div className="flex flex-col items-center m-2 my-2">
    <Image
      src={image}
      width={100}
      height={100}
      alt={name}
      className="w-full h-full object-cover mb-1"
    />
    <span className="text-center p-0 m-0 font-medium text-sm truncate w-4/5">
      {name}
    </span>
  </div>
);

interface myProps {
  categories: CategoryType[];
}

const CategoryGrid: React.FC<myProps> = ({ categories }) => (
  <div className="grid grid-cols-3 items-center md:grid-cols-5">
    {categories && categories.map((category) => (
      <Link key={category._id} href={`/search?q=${category.name}`}>
        <CategoryItem name={category.name} image={category.image} />
      </Link>
    ))}
  </div>
);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CategoryApiResponse {
  categories: CategoryType[];
}

const TopCategories: React.FC = () => {
  // Using SWR to fetch and cache the data
  const { data, error } = useSWR<CategoryApiResponse>(
    "/api/collection/6751c86caaf7d179a3cd9c4b",
    fetcher
  );

  if (error) {
    console.log("Error fetching data", error);
    return <div>Failed to load categories</div>;
  }

  if (!data) {
    return (
      <div>
        <ClientLoading />
      </div>
    );
  }

  return (
    <>
      <div className="text-center flex flex-col">
        <span className="uppercase font-semibold text-2xl py-10">
          top category
        </span>
        <CategoryGrid categories={data.categories} />
      </div>
    </>
  );
};

export default TopCategories;
