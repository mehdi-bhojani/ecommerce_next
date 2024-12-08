"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Loader from "@/components/admin/customUi/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/admin/ui/separator";
import { DataTable } from "@/components/admin/customUi/DataTable";
import { SizeType } from "@/lib/types"; // Update to use SizeType
import { columns } from "@/components/admin/products/sizes/sizeColumns";

const Sizes = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [sizes, setSizes] = useState<SizeType[]>([]);

  const getSizes = async () => {
    try {
      const res = await fetch("/api/size", {
        method: "GET",
      });
      const data = await res.json();
      setSizes(data);
      setLoading(false);
    } catch (err) {
      console.log("[sizes_GET]", err);
    }
  };

  useEffect(() => {
    getSizes();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Sizes</p>
        <Button
          className="bg-black text-white"
          onClick={() => router.push("/admin/sizes/new")} // Adjusted route for creating sizes
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Size
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={sizes} searchKey="label" /> {/* Adjust searchKey for sizes */}
    </div>
  );
};

export default Sizes;
