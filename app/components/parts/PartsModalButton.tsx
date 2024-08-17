import React, { useState } from "react";
import PartsModal from "./PartsModal";
import { Part } from "@/types";

type PartsModalButtonProps = {
  existingPart?: Part;
};

const PartsModalButton: React.FC<PartsModalButtonProps> = ({
  existingPart,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container my-auto mx-auto ">
      <button
        onClick={openModal}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        {existingPart ? "Edit product" : "Add New Part"}
      </button>
      <PartsModal
        isOpen={isModalOpen}
        existingPart={existingPart}
        onClose={closeModal}
      />
    </div>
  );
};

export default PartsModalButton;
