import React, { useState } from "react";
import { generateUploadUrl } from "../s3UploadFile";
import { computeSHA256 } from "../crypto.utils";
import { useSession } from "next-auth/react";
import { DEFAULT_S3_URL } from "@/constants";
import Image from "next/image";

interface UploadFileProps {
  existingFile?: string;
  handleFileUpload: (url: string) => void;
}
const UploadFile = ({ existingFile, handleFileUpload }: UploadFileProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState(existingFile || "");
  const [fileUploaded, setFileUploaded] = useState(!!existingFile);
  const { data: session } = useSession();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const sendFile = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!file) return;
    const checkSum = await computeSHA256(file);
    const signedURLResult = await generateUploadUrl(
      file.type,
      file.size,
      checkSum,
      session,
    );

    if (!signedURLResult.success) {
      throw new Error(signedURLResult.message);
    }
    if (!signedURLResult.url) {
      throw new Error("No URL returned");
    }

    const result = await fetch(signedURLResult.url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (result.status === 200) {
      setFileUploaded(true);
      handleFileUpload(DEFAULT_S3_URL + signedURLResult.fileName);
      setFileName(DEFAULT_S3_URL + signedURLResult.fileName);
    } else {
      setFileName("");
      setFileUploaded(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {fileUploaded && (
        <>
          <div className="flex-grow text-sm text-gray-700">
            <span className="font-semibold text-xl">File Uploaded! File:</span>
            <Image src={fileName} height={100} width={100} alt="File" />
          </div>
          <button
            onClick={(): void => {
              setFileUploaded(false);
              setFile(null);
            }}
            className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Upload New File
          </button>
        </>
      )}

      {!fileUploaded && (
        <>
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Choose a file
            </label>
            <div className="mt-1 flex items-center">
              <input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-gray-50 file:text-gray-700
            hover:file:bg-gray-100
            focus:outline-none"
              />
            </div>
          </div>
          <button
            onClick={sendFile}
            className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Upload File
          </button>
        </>
      )}
    </div>
  );
};

export default UploadFile;
