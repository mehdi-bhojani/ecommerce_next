"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/admin/customUi/Loader";
import CollectionForm from "@/components/admin/collections/CollectionForm";
import Category from "@/lib/models/Category";
import CategoryForm from "@/components/admin/categories/CategoryForm";

const CategoryDetails = ({ params }: { params: { categoryId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [categoryDetails, setCategoryDetails] = useState<CategoryType | null>(
    null
  );

  const getCategoryDetails = async () => {
    try {
      const res = await fetch(`/api/category/${params.categoryId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCategoryDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[categoryId_GET]", err);
    }
  };

  useEffect(() => {
    getCategoryDetails();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <CategoryForm initialData={categoryDetails} />
  );
};

export default CategoryDetails;
