"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BreadCrumb from "@/components/website/ProductGridComponent/BreadCrumb";
import ProductHeading from "@/components/website/ProductGridComponent/ProductHeading";
import Filtering from "@/components/website/ProductGridComponent/Filtering";
import { useAtom } from "jotai";
import { subCategoryAtom } from "@/lib/store"; // Adjust the path as needed
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

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/website/ProductGridComponent/Products";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getproducts = async (categoryId: string) => {
        const res = await fetch(`/api/product/category/${categoryId}`);
        if (!res.ok) {
          // router.push("/404?message=products not found");
        }
        const data = await res.json();
        return data;
      };

      const searchCategory = async () => {
        const res = await fetch(`/api/category/${id}`);
        if (!res.ok) {
          // router.push("/404?message=Category not found");
        }
        const data = await res.json();
        const dataProducts = await getproducts(data._id);
        setProducts(dataProducts);
      };
      searchCategory();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const test = params.CategName.split("-");

  const TempProd = ProductItems.find(
    (item) =>
      (item.Category.replace(/-/g, " ") ===
        decodeURIComponent(test.slice(1).join("-")).replace(/-/g, " ") &&
        item.Type === test[0]) ||
      (item.subCategory.replace(/-/g, " ") ===
        decodeURIComponent(test.slice(1).join("-")).replace(/-/g, " ") &&
        item.Type === test[0])
  );
  const Prod = ProductItems.filter(
    (item) =>
      (item.Category.replace(/-/g, " ") ===
        decodeURIComponent(test.slice(1).join("-")).replace(/-/g, " ") &&
        item.Type === test[0]) ||
      (item.subCategory.replace(/-/g, " ") ===
        decodeURIComponent(test.slice(1).join("-")).replace(/-/g, " ") &&
        item.Type === test[0])
  );
  const Prod2 = ProductItems.filter(
    (item) =>
      (item.Category.replace(/-/g, " ") ===
        decodeURIComponent(test.slice(1).join("-")).replace(/-/g, " ") &&
        item.Type === test[0]) ||
      (item.subCategory.replace(/-/g, " ") ===
        decodeURIComponent(test.slice(1).join("-")).replace(/-/g, " ") &&
        item.Type === test[0])
  );

  // Function to sort products in ascending order based on discountedPrice
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<string[]>([]);
  const productsPerPage = 4;

  // Calculate total pages
  // const totalPages = Math.ceil(products.length / productsPerPage);

  // const startIndex = (currentPage - 1) * productsPerPage;
  // const endIndex = startIndex + productsPerPage;
  // const currentproducts = products.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [CategSub, setSubCategory] = useAtom(subCategoryAtom);

  function handleClick(product: Product) {
    setSubCategory(product.subCategory);
  }

  useEffect(() => {
    // Assume you have a default or initial product object
    const initialProduct = { subCategory: "DefaultSubCategory" };
    setSubCategory(initialProduct.subCategory);
  }, []);

  // useEffect(() => {
  //   const generatePageNumbers = () => {
  //     const pageSet = new Set<string>();

  //     for (let i = 1; i <= totalPages; i++) {
  //       if (
  //         i <= 3 ||
  //         i === totalPages ||
  //         (i >= currentPage - 1 && i <= currentPage + 1)
  //       ) {
  //         pageSet.add(i.toString());
  //       } else if (i > 4) {
  //         pageSet.add("...");
  //       }
  //     }

  //     setPageNumbers(Array.from(pageSet));
  //   };

  //   generatePageNumbers();
  // }, [currentPage, totalPages]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="bg-gray-100 border-b border-gray-300">
        <div className="container mx-auto px-4 py-4">
          <BreadCrumb id={id!} CategName={params.CategName} />
          <ProductHeading title={params.CategName} />
          <Filtering
            Prods={products}
            setProd={setProducts}
          />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid py-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div key={index}>
              <Link
                onClick={() => handleClick(product)}
                href={`/product/${"shirt"}?id=${product._id}`}
              >
                <ProductCard product={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(1)}
              className={`${
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              } px-3 py-1 border border-gray-300 rounded`}
            >
              &laquo;
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href={"#"}
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage <= 1 ? -1 : undefined}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>

          {/* const [currentPage, setCurrentPage] = useState(1);
  const [TempPageNo, setTempPageNo] = useState(1);
  const productsPerPage = 1; 
        

          {pageNumbers.map((item) => {
            const pageNum = item;
            if (pageNum === "...") {
              return (
                <>
                  <span className="px-3 py-2 border rounded border-gray-300">
                    ...
                  </span>
                </>
              );
            } else {
              return (
                <PaginationItem key={item}>
                  <PaginationLink
                    href="#"
                    className={`${
                      currentPage === parseInt(pageNum)
                        ? "bg-blue-500 text-white"
                        : "border border-gray-300"
                    } px-3 py-1 rounded`}
                    isActive={currentPage === parseInt(pageNum)}
                    onClick={() => handlePageChange(parseInt(pageNum))}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          })}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              aria-disabled={currentPage == totalPages}
              tabIndex={currentPage == totalPages ? -1 : undefined}
              className={
                currentPage == totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              // disabled={currentPage === totalPages}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(totalPages)}
              className={`${
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              } px-3 py-1 border border-gray-300 rounded`}
            >
              &raquo;
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
    </div>
  );
};

export default Page;
