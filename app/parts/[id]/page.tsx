"use client";
import Image from "next/image";
import { Part } from "@/types";
import { DEFAULT_S3_URL } from "@/constants";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PartsModalButton from "@/components/parts/PartsModalButton";

const PartPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [part, setPart] = useState<Part | null>(null);
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const { data: session } = useSession();
  const productOwner: boolean = session?.user?.email === part?.owner;

  useEffect(() => {
    const fetchPart = async () => {
      if (!baseUrl) return;
      const res = await fetch(`${baseUrl}/api/parts/${id}`);
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
        <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
      </div>
    );
  }

  const buyProduct = async () => {
    if (!session) return;
    if (part.sold) return;
    if (!baseUrl) return;
    const res = await fetch(`${baseUrl}/api/parts/buy`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, email: session?.user?.email }),
    });
    if (res.ok) {
      window.location.reload();
    }
  };

  const showActions = () => {
    if (part.sold)
      return (
        <h4 className="text-gray-700 text-xl border-2 border-gray-800 rounded-md  px-6 w-52 text-center">
          SOLD!
        </h4>
      );

    if (productOwner)
      return (
        <>
          <PartsModalButton
            className="bg-gray-800 p-2 px-4 rounded-md"
            existingPart={part}
          />
        </>
      );

    return (
      <button
        onClick={buyProduct}
        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300"
      >
        Buy
      </button>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              src={part.imageUrl || DEFAULT_S3_URL}
              alt={part.name}
              width={200}
              height={200}
              className="h-52 w-full object-cover md:w-52"
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
            <div className="mt-6">{showActions()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartPage;
