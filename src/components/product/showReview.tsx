import { ReviewType } from "@/lib/types";
import { Quote } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

interface myProps {
  reviews: ReviewType[];
}

const ShowReview: React.FC<myProps> = ({ reviews }) => {
  return (
    <>
      {reviews.map((review, index) => (
        <div key={index} className="flex flex-col gap-2 mb-4 p-2 border">
          <div className="flex items-center justify-between ">
            <h4>Anonymous</h4>
            <span>
              {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
            </span>
          </div>
          <div className="flex  my-2 w-full">
            <span>{review.reviewText}
            </span>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, starIndex) => (
              <FaStar
                key={starIndex}
                className={`text-xl ${
                  starIndex < review.rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div>
            {review.images[0] != "" && <Image src={review.images[0]} alt="review image" width={100} height={100} />}
          </div>
        </div>
      ))}
    </>
  );
};

export default ShowReview;
