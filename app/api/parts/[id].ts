import { connectToDatabase } from "@/utils/database";
import Parts from "@/models/parts";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  try {
    await connectToDatabase();
    const part = await Parts.findById(id);
    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }
    res.status(200).json(part);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

//
// export async function GET(req: Request){
//   const { id } = req.query;
//   await connectToDatabase();
//
//   const parts = await Parts.find({});
//   return new Response(JSON.stringify(parts));
// }
