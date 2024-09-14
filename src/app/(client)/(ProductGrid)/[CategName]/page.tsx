"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BreadCrumb from "@/components/website/ProductGridComponent/BreadCrumb";
import ProductHeading from "@/components/website/ProductGridComponent/ProductHeading";
import Filtering from "@/components/website/ProductGridComponent/Filtering";
import { useAtom } from "jotai";
import ProductItems from "@/shared/json/products.json";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { notFound, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/website/ProductGridComponent/Products";
import ClientLoading from "@/components/myUi/ClientLoading";

interface Product {
  img: string[];
  mrp: number;
  name: string;
  offer: number;
  price: number;
  _id: string;
  createdAt: string;
}

const Page = ({ params }: { params: { CategName: string } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const query = searchParams.get("q");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.CategName !== "search" || !query) {
      notFound();
    }
    try {
      const searchProducts = async (query: string) => {
        const res = await fetch(`/api/search/${query}`);
        if (!res.ok) {
          notFound();
        }
        const data = await res.json();
        return data;
      };

      const searchCategoryorQuery = async () => {
        console.log(params.CategName);
        if (params.CategName !== "search") {
          notFound();
        }
        const dataProducts = await searchProducts(query!);
        setProducts(dataProducts);
      };
      searchCategoryorQuery();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return (
      <div>
        <ClientLoading />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="bg-gray-100 border-b border-gray-300">
        <div className="container mx-auto px-4 py-4">
          <BreadCrumb id={id!} CategName={query!} />
          <ProductHeading title={query!} />
          <Filtering Prods={products} setProd={setProducts} />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid py-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div key={index}>
              <Link
                // onClick={() => handleClick(product)}
                href={`/product/${"shirt"}?id=${product._id}`}
              >
                <ProductCard product={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
