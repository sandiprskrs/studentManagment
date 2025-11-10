'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  openModal,
  closeModal,
  clearError,
} from '../store/slices/studentSlice';
import StudentCard from '../components/StudentCard';
import StudentModal from '../components/StudentModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { CreateStudentDto, UpdateStudentDto } from '../types/student';

export default function Home() {
  const dispatch = useAppDispatch();
  const { students, selectedStudent, loading, error, isModalOpen, modalMode } = useAppSelector(
    (state) => state.students
  );
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleCreateClick = () => {
    dispatch(openModal({ mode: 'create' }));
  };

  const handleViewClick = (studentId: number) => {
    const student = students.find((s) => s.studentId === studentId);
    if (student) {
      dispatch(openModal({ mode: 'view', student }));
    }
  };

  const handleEditClick = (studentId: number) => {
    const student = students.find((s) => s.studentId === studentId);
    if (student) {
      dispatch(openModal({ mode: 'edit', student }));
    }
  };

  const handleDeleteClick = (studentId: number) => {
    setDeleteConfirm(studentId);
  };

  const confirmDelete = async () => {
    if (deleteConfirm) {
      await dispatch(deleteStudent(deleteConfirm));
      setDeleteConfirm(null);
    }
  };

  const handleModalSubmit = async (data: CreateStudentDto | UpdateStudentDto) => {
    if (modalMode === 'create') {
      await dispatch(createStudent(data as CreateStudentDto));
    } else if (modalMode === 'edit') {
      await dispatch(updateStudent(data as UpdateStudentDto));
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Student Management System
              </h1>
              <p className="text-gray-600">
                Complete CRUD operations with Next.js, Redux & .NET Web API
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateClick}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg"
            >
              + Add Student
            </motion.button>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onClose={() => dispatch(clearError())} />
          </div>
        )}

        {/* Loading */}
        {loading && students.length === 0 && <LoadingSpinner />}

        {/* Students Grid */}
        {!loading && students.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No students found. Add your first student!</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <StudentCard
              key={student.studentId}
              student={student}
              onView={() => handleViewClick(student.studentId)}
              onEdit={() => handleEditClick(student.studentId)}
              onDelete={() => handleDeleteClick(student.studentId)}
            />
          ))}
        </div>

        {/* Modal */}
        <StudentModal
          isOpen={isModalOpen}
          mode={modalMode}
          student={selectedStudent}
          onClose={() => dispatch(closeModal())}
          onSubmit={handleModalSubmit}
          loading={loading}
        />

        {/* Delete Confirmation */}
        {deleteConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this student? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </main>
  );
}
