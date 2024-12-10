"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import Loader from "@/components/admin/customUi/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/admin/ui/separator";
import { DataTable } from "@/components/admin/customUi/DataTable";
import { columns } from "@/components/admin/categories/categoryColumns";

const Categories = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await fetch("/api/category", {
        method: "GET",
      });
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    } catch (err) { 
      console.log("[Categories_GET]", err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-5xl font-bold">Categories</p>
        <Button className="bg-black text-white" onClick={() => router.push("/admin/categories/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Categories
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={categories} searchKey="title" />
    </div>
  );
};

export default Categories;
