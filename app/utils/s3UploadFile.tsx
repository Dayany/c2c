import { S3Client, S3ClientConfig, PutObjectCommand } from "@aws-sdk/client-s3";

const config: S3ClientConfig = {
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
  },
};

const s3Client = new S3Client(config);

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
