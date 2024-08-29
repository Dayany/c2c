import React from "react";
import CardParts from "@/components/parts/PartsCard";
import { Part } from "@/types";
import Link from "next/link";

async function fetchData(): Promise<Part[] | null> {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/parts`);

  if (!response.ok) {
    return null;
  }
  return response.json();
}

export default async function Home() {
  const parts: Part[] | null = await fetchData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 w-full ">
      {parts?.map((part: Part) => (
        <Link
          key={part._id}
          href={`/parts/${part._id}`}
          className="w-full"
          passHref
        >
          <CardParts key={part._id} part={part} />
        </Link>
      ))}
    </div>
  );
}
