"use client";
import React from "react";
import { useEffect, useState } from "react";
import CardParts from "@/components/parts/PartsCard";
import { Part } from "@/types";
import Link from "next/link";

export default function Home() {
  const [parts, setParts] = useState<Part[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/parts");
      const data: Part[] = await response.json();
      setParts(data);
    };

    fetchProducts();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {parts.map((part) => (
        <Link key={part._id} href={`/parts/${part._id}`} passHref>
          <CardParts key={part._id} part={part} />
        </Link>
      ))}
    </div>
  );
}
