"use client";
import React from "react";
import { useEffect, useState } from "react";
import CardParts from "./parts/PartsCard";
import { Part } from "../types";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white font-black ">
      <div className="min-h-screen p-6 w-9/12">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {parts.map((part) => (
            <CardParts key={part.id} part={part} />
          ))}
        </div>
      </div>
    </main>
  );
}
