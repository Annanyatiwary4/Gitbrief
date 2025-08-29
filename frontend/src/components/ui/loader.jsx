"use client";
import { motion } from "motion/react";
import React from "react";

export const LoaderOne = () => {
  const transition = (x) => {
    return {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop",
      delay: x * 0.2,
      ease: "easeInOut",
    };
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={transition(0)}
          className="h-4 w-4 rounded-full border border-blue-500 bg-gradient-to-b from-blue-400 to-blue-600"
        />
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={transition(1)}
          className="h-4 w-4 rounded-full border border-blue-500 bg-gradient-to-b from-blue-400 to-blue-600"
        />
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={transition(2)}
          className="h-4 w-4 rounded-full border border-blue-500 bg-gradient-to-b from-blue-400 to-blue-600"
        />
      </div>
    </div>
  );
};
