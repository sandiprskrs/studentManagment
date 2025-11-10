'use client';

import { motion } from 'framer-motion';
import { Student } from '../types/student';

interface StudentCardProps {
  student: Student;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function StudentCard({ student, onView, onEdit, onDelete }: StudentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl p-6 border border-gray-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {student.firstName} {student.lastName}
          </h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p className="flex items-center">
              <span className="font-medium mr-2">📧</span>
              {student.email}
            </p>
            {student.phone && (
              <p className="flex items-center">
                <span className="font-medium mr-2">📱</span>
                {student.phone}
              </p>
            )}
            {student.city && (
              <p className="flex items-center">
                <span className="font-medium mr-2">📍</span>
                {student.city}, {student.state}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2 ml-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onView}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            View
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEdit}
            className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
          >
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDelete}
            className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </motion.button>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );
}
