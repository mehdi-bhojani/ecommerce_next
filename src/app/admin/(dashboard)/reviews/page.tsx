"use client";

import { DataTable } from "@/components/admin/customUi/DataTable";
import Loader from "@/components/admin/customUi/Loader";
import { columns } from "@/components/admin/reviews/ReviewsColumns";
import { Separator } from "@/components/admin/ui/separator";
import { useEffect, useState } from "react";

const Page = () => {

  // const reviews = await Customer.find().sort({ createdAt: "desc" })
  let [reviews, setReviews] = useState([]);
  let [loading, setLoading] = useState(true);

  const getreviews = async () => {
    try {
      const res = await fetch("/api/review", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getreviews().then((data) => {
      setReviews(data);
    });
  }, []);

  return  (loading)? <Loader /> : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Reviews</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={reviews} searchKey="reviewText" />
    </div>
  );
};

export default Page;
