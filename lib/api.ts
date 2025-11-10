import axios from 'axios';
import { Student, CreateStudentDto, UpdateStudentDto, ApiResponse } from '../types/student';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5031/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studentAPI = {
  getAllStudents: async (): Promise<Student[]> => {
    const response = await apiClient.get<ApiResponse<Student[]>>('/Students');
    return response.data.data || [];
  },

  getStudentById: async (id: number): Promise<Student | null> => {
    const response = await apiClient.get<ApiResponse<Student>>(`/Students/${id}`);
    return response.data.data || null;
  },

  createStudent: async (student: CreateStudentDto): Promise<Student> => {
    const response = await apiClient.post<ApiResponse<Student>>('/Students', student);
    return response.data.data!;
  },

  updateStudent: async (id: number, student: UpdateStudentDto): Promise<Student> => {
    const response = await apiClient.put<ApiResponse<Student>>(`/Students/${id}`, student);
    return response.data.data!;
  },

  deleteStudent: async (id: number): Promise<void> => {
    await apiClient.delete(`/Students/${id}`);
  },
};

export default apiClient;
