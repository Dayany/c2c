import { S3Client, S3ClientConfig, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { Session } from "next-auth";

const config: S3ClientConfig = {
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
  },
};

const s3Client = new S3Client(config);

const acceptedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

export async function generateUploadUrl(
  type: string,
  size: number,
  checksum: string,
  session: Session | null,
) {
  if (!acceptedFileTypes.includes(type))
    return { success: false, message: "File type not supported" };
  if (!session?.user?.email)
    return { success: false, message: "User not authenticated" };

  const rawKey = crypto.randomBytes(16).toString("hex");
  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: rawKey,
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      email: session?.user?.email,
    },
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  return { success: true, url: uploadUrl };
}

export async function uploadFileToS3(file: File) {
  const fileName = file.name;
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: Date.now() + fileName,
    Body: fileBuffer,
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
}
