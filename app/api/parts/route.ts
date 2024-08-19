import { connectToDatabase } from "@/utils/database";
import Parts from "@/models/parts";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const parts = await Parts.find({}).sort({ createdAt: -1 });
  return new NextResponse(JSON.stringify(parts));
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const json = await req.json();

    const part = new Parts(json);
    if (!part)
      return new NextResponse(
        JSON.stringify({ message: "Part Could not be created" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );

    await part.save();

    return new NextResponse(
      JSON.stringify({ message: "success", data: part }),
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

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const json = await req.json();
    if (!json._id)
      return new NextResponse(
        JSON.stringify({
          message: "Please provide an id",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );

    const updatedPart = await Parts.findByIdAndUpdate(json._id, json, {
      new: true,
    });

    if (!updatedPart)
      return new NextResponse(JSON.stringify({ message: "Part not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });

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
