'use client';

import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex justify-between items-center"
    >
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-red-600 hover:text-red-800 ml-4">
          ×
        </button>
      )}
    </motion.div>
  );
}
