"use client";
import Image from "next/image";
import { Part } from "@/types";
import { DEFAULT_S3_URL } from "@/constants";
import { useEffect, useState } from "react";

const PartPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [part, setPart] = useState<Part | null>(null);

  useEffect(() => {
    const fetchPart = async () => {
      const res = await fetch(`http://localhost:3000/api/parts/${id}`);
      const partResult = await res.json();
      if (partResult) {
        setPart(partResult.data);
      }
    };
    fetchPart();
  }, [id]);

  if (!part) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-red-500">Part not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              src={part.imageUrl || DEFAULT_S3_URL}
              alt={part.name}
              width={500}
              height={500}
              className="h-64 w-full object-cover md:w-64"
            />
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900">{part.name}</h1>
            <p className="mt-4 text-gray-600">{part.description}</p>
            <div className="mt-6">
              <span className="text-3xl font-semibold text-gray-900">
                ${part.price}
              </span>
            </div>
            <div className="mt-6">
              <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartPage;
