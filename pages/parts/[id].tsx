// pages/parts/[id].tsx
import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Part } from "@/types";
import Image from "next/image";

interface PartPageProps {
  part: Part | null;
}

const PartPage: NextPage<PartPageProps> = ({ part }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!part) {
    return <div>Part not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{part.name}</h1>
      <Image
        src={part.imageUrl || ""}
        alt={part.name}
        width={600}
        height={400}
        className="mb-4"
      />
      <p className="text-lg">{part.description}</p>
      <p className="text-lg font-bold mt-4">${part.price}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  const res = await fetch(`http://localhost:3000/api/parts/${id}`);
  const response = await res.json();
  const part = response.data;
  return {
    props: {
      part: part || null,
    },
  };
};

export default PartPage;
