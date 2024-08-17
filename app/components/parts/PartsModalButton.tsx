import React, { useState } from "react";
import PartsModal from "./PartsModal";
import { Part } from "@/types";

type PartsModalButtonProps = {
  existingPart?: Part;
  className?: string;
};

const PartsModalButton: React.FC<PartsModalButtonProps> = ({
  existingPart,
  className,
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
      <button onClick={openModal} className={className}>
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
