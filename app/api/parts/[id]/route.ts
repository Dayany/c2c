import { connectToDatabase } from "@/utils/database";
import Parts from "@/models/parts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    await connectToDatabase();
    const part = await Parts.findById(id);
    if (!part) {
      return new NextResponse(
        JSON.stringify({ message: "Not found", data: req }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "success", data: part }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error fetching part:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error allocating resource" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
