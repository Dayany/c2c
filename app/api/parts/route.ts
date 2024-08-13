import { connectToDatabase } from "@/utils/database";
import Parts from "@/models/parts";

export async function GET() {
  await connectToDatabase();

  const parts = await Parts.find({});
  return new Response(JSON.stringify(parts));
}

export async function POST(req: Request): Promise<Response> {
  try {
    await connectToDatabase();
    const json = await req.json();
    const part = new Parts(json);
    await part.save();
    return new Response(JSON.stringify({ message: "success", data: part }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
