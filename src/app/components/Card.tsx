import React from "react";
import { Product } from "../../types";
interface CardProps {
  product: Product;
}

const Card = ({ product }: CardProps) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={product.imageUrl} alt={product.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">${product.price}</p>
      </div>
    </div>
  );
};

export default Card;
