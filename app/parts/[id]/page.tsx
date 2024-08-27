import Image from "next/image";
import { DEFAULT_S3_URL } from "@/constants";
import PartsModalButton from "@/components/parts/PartsModalButton";
import { Part } from "@/types";
import { getServerSession } from "next-auth";
import BuyProduct from "@/components/calls/BuyProduct.tsx";

async function fetchData(id: string): Promise<Part | null> {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/parts/${id}`);

  if (!response.ok) {
    return null;
  }
  return response.json();
}

export default async function PartPage({ params }: { params: { id: string } }) {
  const response = await fetchData(params.id);
  const session = getServerSession();
  const email: string | undefined = session?.user?.email;

  if (!response) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
      </div>
    );
  }
  const part = response.data;
  const productOwner: boolean = email === part?.owner;

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
          <h1>Hello</h1>
          <PartsModalButton
            className="bg-gray-800 p-2 px-4 rounded-md"
            existingPart={part}
          />
        </>
      );

    return <BuyProduct part={part} email={email} />;
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
}
