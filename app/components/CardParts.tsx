import React from "react";
import Image from "next/image";
import { Part } from "../../types";
interface CardProps {
  part: Part;
}

const Card = ({ part }: CardProps) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <Image className="w-full" src={part.imageUrl} alt={part.name} />
      <div className="px-6 py-4">
        <div className="text-black font-bold text-xl mb-2">{part.name}</div>
        <p className="text-gray-700 text-base">${part.price}</p>
      </div>
    </div>
  );
};

export default Card;
