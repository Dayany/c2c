import React, { useEffect, useState } from "react";
import { Part } from "@/types";
import UploadFile from "@/utils/components/UploadFile";
import { useSession } from "next-auth/react";

interface PartsModalProps {
  isOpen: boolean;
  existingPart?: Part;
  onClose: () => void;
}

const PartsModal: React.FC<PartsModalProps> = ({
  isOpen,
  existingPart,
  onClose,
}) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<Partial<Part>>({
    name: "",
    price: "",
    imageUrl: "",
    location: "",
    description: "",
    owner: session?.user?.email || "",
    carMake: "",
    partNumber: "",
    sold: false,
    soldDate: null,
    soldTo: "",
  });

  useEffect(() => {
    if (existingPart) {
      setFormData(existingPart);
    }
  }, [existingPart]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (url: string) => {
    setFormData({
      ...formData,
      imageUrl: url, // Set the imageUrl when the file is uploaded
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = existingPart ? "PUT" : "POST";
      const res = await fetch("/api/parts", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onClose(); // Close the modal
        window.location.reload();
      } else {
        console.error("Failed to create part");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-gray-700 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-6">
        <h2 className="text-xl font-bold mb-4">
          {existingPart ? "Edit Product" : "Add New Part"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="text"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="imageUrl"
            >
              Image URL
            </label>
            <UploadFile
              handleFileUpload={handleFileUpload}
              existingFile={formData.imageUrl}
            />
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl || ""}
              onChange={handleChange}
              className="hidden"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="carMake"
            >
              Car Make
            </label>
            <input
              type="text"
              name="carMake"
              value={formData.carMake || ""}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="partNumber"
            >
              Part Number
            </label>
            <input
              type="text"
              name="partNumber"
              value={formData.partNumber || ""}
              onChange={handleChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartsModal;
