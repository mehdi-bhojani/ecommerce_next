import { ProductType } from "@/lib/types";
import Image from "next/image";
import { PriceIntoCurrency } from "@/shared/helpers/help";
import Link from "next/link";

interface Props {
  products: ProductType[];
  currency: string;
}

export default function RecommendedProducts({ products, currency }: Props) {
  return (
    <div className="mt-12">
      <div className="mt-5">
        <span className="text-2xl font-bold uppercase">Similar Products</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {products.map((product, index) => (
          <Link 
            href={`/product/${product._id}`} 
            key={product._id} 
            className="group cursor-pointer"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={product.img[0]}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 rounded-b-lg">
                <p className="text-white text-sm font-medium">
                  {product.name}
                </p>
                <p className="text-white/90 text-sm">
                  {PriceIntoCurrency(product.price, currency)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
  