// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "next/navigation";
// import { toast } from "react-hot-toast";
// import { useAtom } from "jotai";
// import { storeAtom } from "@/shared/atoms/storeAtom";
// import { ProductType, VariantType } from "@/lib/types";
// import { createSlug } from "@/lib/utils/createSlug";

// // Component Imports
// import ProductDisplay from "@/components/product/productDisplay";
// import ProductDetails from "@/components/product/productDetails";
// import InteractiveButtons from "@/components/product/interactiveButtons";
// import ExpandableSection from "@/components/product/expandableSection";
// import RecommendedProducts from "@/components/product/recommendedProducts";
// import ClientLoading from "@/components/myUi/ClientLoading";
// import ShowReview from "@/components/product/showReview";

// // Hooks
// import useCart from "@/shared/hooks/useCart";
// import useWishList from "@/shared/hooks/useWishList";
// import Autoplay from "embla-carousel-autoplay";

// const Page = () => {

//   const param = useParams();
//   const { CategName, ProductDetail } = param;
//   const [selectedImage, setSelectedImage] = useState<string>("");
//   const [loading, setLoading] = useState(true);
//   const [tempProduct, setTempProduct] = useState<ProductType>();
//   const [colors, setColors] = useState<VariantType[]>([]);
//   const [selectedColor, setSelectedColor] = useState<string>("");
//   const [sizes, setSizes] = useState<VariantType[]>([]);
//   const [SelectSize, SetSelectSize] = useState<string>("");
//   const [SelectedHeart, SetSelectedHeart] = useState<boolean>(false);
//   const [selectedFabric, setSelectedFabric] = useState<string>("");
//   const searchParams = useSearchParams();
//   const { addToCart } = useCart();
//   const { addToWishList, removeFromWishList } = useWishList();
//   const [myStoreAtom] = useAtom(storeAtom);

//   // ... existing helper functions ...
//   const getColors = (tempProduct: ProductType) => {
//     const colors = tempProduct?.variants.filter(
//       (item, index, self) =>
//         index === self.findIndex((t) => t.name === item.name)
//     );

//     setColors(colors);
//     setSelectedColor(colors[0].name);
//     getSizes(colors[0].name, tempProduct);
//   };


//   const getSizes = (currentColor: string, currentProduct: ProductType) => {
//     // Filter the variants based on the currentColor
//     const sizes = currentProduct?.variants
//       .filter((variant) => variant.name === currentColor)
//       .map((variant) => variant); // Map to extract sizes from filtered variants

//     // Set sizes state
//     setSizes(sizes);

//     // Log sizes to the console
//   };

//   const handleChangeColor = (color: string) => {
//     setSelectedColor(color);
//     SetSelectSize("");
//     getSizes(color, tempProduct!);
//   };

//   const handleAddtoBag = () => {
//     if (SelectSize === "") {
//       toast.error("Please select a size");
//       return;
//     }

//     const cartItem = {
//       imgSrc: tempProduct!.img[0],
//       name: tempProduct!.name,
//       price: tempProduct!.price,
//       mrp: tempProduct!.mrp || 0,
//       offer: tempProduct!.offer || '0',
//       SelectSize: SelectSize,
//       allSizes: sizes,
//       slug: createSlug(tempProduct!.name),
//       productId: tempProduct!._id,
//       variantId: getSelectedVariant?._id,
//       quantity: 1,
//     };
//     addToCart(cartItem);
//     toast.success("Added to Bag");
//   };

//   const handleWishlistAction = async () => {
//     if (!SelectedHeart) {
//       await addToWishList({
//         imgSrc: tempProduct!.img[0],
//         name: tempProduct!.name,
//         price: tempProduct!.price,
//         mrp: tempProduct!.mrp!,
//         offer: tempProduct!.offer!,
//         _id: tempProduct!._id,
//       });
//       toast.success("Added to WishList");
//     } else {
//       removeFromWishList(tempProduct!._id);
//       toast.success("Removed from your Wishlist");
//     }
//     SetSelectedHeart(!SelectedHeart);
//   };

//   // ... existing useEffect ...
//   useEffect(() => {
//     const getProduct = async () => {
//       try {
//         const id = await searchParams.get("id");
//         const res = await fetch(`/api/product/${id}`);
//         const data = await res.json();
//         setTempProduct(data);
//         getColors(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getProduct();
//   }, []);

//   const handleAction = async () => {
//     if (SelectedHeart == false) {
//       await addToWishList({
//         imgSrc: tempProduct!.img[0],
//         name: tempProduct!.name,
//         price: tempProduct!.price,
//         mrp: tempProduct!.mrp!,
//         offer: tempProduct!.offer!,
//         _id: tempProduct!._id,
//       });

//       toast.success("Added to WishList");
//     } else {
//       removeFromWishList(tempProduct!._id);
//       toast.success("Removed from your Wishlist");
//     }
//   };

//   const plugin = React.useRef(
//     Autoplay({ delay: 4000, stopOnInteraction: false })
//   );

//   const getSelectedVariant = tempProduct?.variants.find(
//     (variant) => variant.size === SelectSize && variant.name === selectedColor
//   );

//   if (loading) return <ClientLoading />;

//   return loading ? (
//     <ClientLoading />
//   ) : (
//     <div className="bg-white px-4 md:px-8 md:pt-8">
//       <div className="md:grid md:grid-cols-12 md:gap-8">
//         {/* Product Display - Left Side */}
//         <div className="md:col-span-8">
//           <ProductDisplay 
//             product={tempProduct!} 
//             selectedColor={selectedColor}
//           />
//         </div>

//         {/* Product Details - Right Side */}
//         <div className="md:col-span-4">
//           <div className="space-y-6">
//             <ProductDetails
//               product={tempProduct!}
//               selectedColor={selectedColor}
//               setSelectedColor={handleChangeColor}
//               SelectSize={SelectSize}
//               SetSelectSize={SetSelectSize}
//               colors={colors}
//               sizes={sizes}
//               currency={myStoreAtom?.storeSettings.currency.default || "PKR"}
//               selectedFabric={selectedFabric}
//               setSelectedFabric={setSelectedFabric}
//             />

//             <InteractiveButtons
//               onAddToCart={handleAddtoBag}
//               onAddToWishlist={handleWishlistAction}
//               isWishlisted={SelectedHeart}
//             />

//             <ExpandableSection
//               sections={[
//                 {
//                   title: "PRODUCT DESCRIPTION",
//                   content: tempProduct?.description
//                 },
//                 ...(tempProduct?.reviews?.length ? [{
//                   title: `REVIEWS (${tempProduct.reviews.length})`,
//                   content: <ShowReview reviews={tempProduct.reviews} />
//                 }] : [])
//               ]}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Similar Products Section */}
//       {tempProduct?.similarProducts && tempProduct.similarProducts.length > 0 && (
//         <RecommendedProducts 
//           products={tempProduct.similarProducts}
//           currency={myStoreAtom?.storeSettings.currency.default || "PKR"}
//         />
//       )}
//     </div>
//   );
// };

// export default Page;

import { Breadcrumb } from "@/components/product/breadcrumb"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { ProductDetails } from "@/components/product/product-details"
import { ProductCarousel } from "@/components/product/product-carousel"
import { QASection } from "@/components/product/qa-section"

export default function Page() {
  return (
    <div>
      <Breadcrumb />
      <div className="grid lg:grid-cols-2 gap-6 px-6">
        <ProductGallery />
        <ProductInfo />
      </div>
      <div className="max-w-4xl mx-auto mt-12">
        <ProductDetails />
      </div>
      <div className="mt-12">
        <ProductCarousel title="More To Love" />
      </div>
      <div className="mt-12">
        <ProductCarousel title="More To Consider" />
      </div>
      <div className="mt-12">
        <QASection />
      </div>
    </div>
  )
}
