import { connectToDatabase } from "@/utils/database";
import Parts from "@/models/parts";

export async function PUT(req: Request): Promise<Response> {
  try {
    await connectToDatabase();
    const json = await req.json();
    if (!json.id || !json.email)
      return new Response(
        JSON.stringify({
          message: "Missing information [id or email] in the request.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );

    const updateData = { sold: true, soldTo: json.email, soldDate: new Date() };
    console.log("updateData", updateData);

    const updatedPart = await Parts.findByIdAndUpdate(json.id, updateData, {
      new: true,
    });

    if (!updatedPart)
      return new Response(
        JSON.stringify({ message: "Part not found/updated" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );

    return new Response(
      JSON.stringify({ message: "success", data: updatedPart }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(
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
