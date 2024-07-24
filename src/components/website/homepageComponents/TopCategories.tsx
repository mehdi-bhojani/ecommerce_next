import React from 'react'
import img1 from '/assets/home/img1.png'
import Image from 'next/image';

interface CategoryItemProps {
  name: string;
  image: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name, image }) => (
  <div className="flex flex-col items-center w-2/12">
    <img src={image} alt={name} className="w-48 h-48 object-cover mb-3" />
    <span className="text-center font-medium  text-lg">{name}</span>
  </div>
);

const categories: CategoryItemProps[] = [
  { name: 'Tops', image: 'https://d30fs77zq6vq2v.cloudfront.net/files/shares/20231003/Category_Top%20(1).gif' },
  { name: 'Kurta', image: 'https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Kurta.gif' },
  { name: "Women's Shalwar Kameez", image: 'https://d30fs77zq6vq2v.cloudfront.net/files/shares/20231003/Category_Fusion%20(1).gif' },
  { name: 'Handbags', image: 'https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_HandBags.gif' },
  { name: 'Dresses', image: 'https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Dresses.gif' },
  { name: "Men's Casual Shirts", image: 'https://d30fs77zq6vq2v.cloudfront.net/files/shares/20231003/Category_Men_Casual_Shirt.gif' },
  { name: "Men's T-Shirts", image: 'https://d30fs77zq6vq2v.cloudfront.net/files/shares/20231003/7.Mens-T-Shirts.gif' },
  { name: 'Girls Clothing', image: 'https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Gilrs_Clothing.gif' },
  { name: 'Boys Clothing', image: 'https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Boys_Clothing.gif' },
  { name: 'Lawn', image: 'https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Lawn.gif' },
  { name: "Women's Sneakers", image: "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Women's_Sneakers.gif" },
  { name: 'Sports Shoes', image: 'https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Sports_Shoes.gif' },
  { name: "Women's Pumps", image: "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Women's_Pumps.gif" },
  { name: 'Casual Shoes', image: 'https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Casual_Shoes.gif' },
  { name: 'Trousers', image: 'https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Trousers.gif' },
  { name: "Women's Bottoms", image: "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Women's_Bottoms.gif" },
  { name: 'Makeup', image: 'https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Makeup.gif' },
  { name: "Women's Sleepwear", image: "https://d30fs77zq6vq2v.cloudfront.net/files/shares/20230828/Category_Women's_Sleepwear.gif" },
];

const CategoryGrid: React.FC = () => (
  <div className="flex flex-wrap justify-between flex">
    {categories.map((category) => (
      <CategoryItem key={category.name} name={category.name} image={category.image} />
    ))}
  </div>
);






const TopCategories = () => {
  return (
    <>
      <div className='text-center flex flex-col '>

     
      <span className='font-sans font-bold text-3xl py-2' >
    TOP CATEGORIES
        </span>
        <CategoryGrid/>
  

        </div>
       
      </>
  )
}

export default TopCategories