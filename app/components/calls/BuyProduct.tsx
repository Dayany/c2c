"use client";
import { Part } from "@/types";

type BuyProductProps = {
  part: Part;
  email: string;
};

const BuyProduct = ({ part, email }: BuyProductProps) => {
  const baseUrl: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;

  const sendBuyProduct = async () => {
    if (!part || part.sold || !email) return;
    if (!baseUrl) {
      console.error("Base URL is not defined");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/parts/buy`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: part._id, email }),
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={sendBuyProduct}
      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300"
    >
      Buy
    </button>
  );
};

export default BuyProduct;
