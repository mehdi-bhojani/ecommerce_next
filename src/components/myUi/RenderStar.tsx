import { Star } from "lucide-react";
import React from "react";

interface Props {
  rating: number;
}

const RenderStars: React.FC<Props> = ({ rating }) => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: rating }, (_, index) => (
        <Star color="gold" key={index} fill="gold" />
      ))}
    </div>
  );
};

export default RenderStars;