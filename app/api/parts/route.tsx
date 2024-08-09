import { Part } from "../../../types";
import { connectToDatabase } from "../../utils/database";

export async function GET() {
  await connectToDatabase();
  // Create an array of 10 fictitious products
  const parts: Part[] = Array.from({ length: 10 }, (v, i) => ({
    id: i,
    name: `Product ${i + 1}`,
    price: (Math.random() * 100).toFixed(2),
    imageUrl: `https://via.placeholder.com/300?text=Product+${i + 1}`, // Placeholder image URL
    owner: "John Doe",
    location: "New York, NY",
    createdAt: new Date().toISOString,
    carMake: "Toyota",
    partNumber: "12345",
    sold: false,
  }));

  return new Response(JSON.stringify(parts));
}
