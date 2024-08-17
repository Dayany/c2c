import React from "react";
import Image from "next/image";
import { Part } from "@/types";
import { DEFAULT_PART_IMAGE } from "@/constants";

interface CardProps {
  part: Part;
}

const Card = ({ part }: CardProps) => {
  return (
    <div className="max-w-60 rounded overflow-hidden shadow-lg m-4">
      <Image
        className="h-52 max-h-52"
        src={part.imageUrl || DEFAULT_PART_IMAGE}
        alt={part.name}
        width="300"
        height="300"
      />
      <div className="px-6 py-6 h-30">
        <div className="text-black font-bold text-xl mb-2 truncate">
          {part.name}
        </div>
        <p className="text-gray-700 text-base">${part.price}</p>
      </div>
    </div>
  );
};

export default Card;
