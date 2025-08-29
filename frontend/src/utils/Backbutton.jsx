// components/BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // optional, or use any SVG/Unicode arrow

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center text-blue-500 cursor-pointer hover:text-blue-700 ${className}`}
    >
      <ArrowLeft size={20} /> {/* simple blue arrow */}
    </button>
  );
};

export default BackButton;
