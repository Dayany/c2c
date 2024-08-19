import { uploadFileToS3 } from "@/utils/s3UploadFile";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file: File = formData.get("file") as File;

    if (!file)
      return NextResponse.json({ error: "No file found" }, { status: 400 });

    const fileName = await uploadFileToS3(file);

    return NextResponse.json({ success: true, message: fileName });
  } catch (e) {
    return NextResponse.json({ error: "Error Uploading file" + e });
  }
}
