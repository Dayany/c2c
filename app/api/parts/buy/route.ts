import { connectToDatabase } from "@/utils/database";
import Parts from "@/models/parts";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const json = await req.json();
    if (!json.id || !json.email)
      return new NextResponse(
        JSON.stringify({
          message: "Missing information [id or email] in the request.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );

    const updateData = { sold: true, soldTo: json.email, soldDate: new Date() };

    const updatedPart = await Parts.findByIdAndUpdate(json.id, updateData, {
      new: true,
    });

    if (!updatedPart)
      return new NextResponse(
        JSON.stringify({ message: "Part not found/updated" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );

    return new NextResponse(
      JSON.stringify({ message: "success", data: updatedPart }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error,
        message: "There was a problem creating the part.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
