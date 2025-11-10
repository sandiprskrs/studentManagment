import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Student, CreateStudentDto, UpdateStudentDto } from '../../types/student';
import { studentAPI } from '../../lib/api';

interface StudentState {
  students: Student[];
  selectedStudent: Student | null;
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  modalMode: 'create' | 'edit' | 'view';
}

const initialState: StudentState = {
  students: [],
  selectedStudent: null,
  loading: false,
  error: null,
  isModalOpen: false,
  modalMode: 'view',
};

// Async Thunks
export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async () => {
    const students = await studentAPI.getAllStudents();
    return students;
  }
);

export const fetchStudentById = createAsyncThunk(
  'students/fetchById',
  async (id: number) => {
    const student = await studentAPI.getStudentById(id);
    return student;
  }
);

export const createStudent = createAsyncThunk(
  'students/create',
  async (studentDto: CreateStudentDto) => {
    const student = await studentAPI.createStudent(studentDto);
    return student;
  }
);

export const updateStudent = createAsyncThunk(
  'students/update',
  async (studentDto: UpdateStudentDto) => {
    const student = await studentAPI.updateStudent(studentDto.studentId, studentDto);
    return student;
  }
);

export const deleteStudent = createAsyncThunk(
  'students/delete',
  async (id: number) => {
    await studentAPI.deleteStudent(id);
    return id;
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ mode: 'create' | 'edit' | 'view'; student?: Student }>) => {
      state.isModalOpen = true;
      state.modalMode = action.payload.mode;
      state.selectedStudent = action.payload.student || null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedStudent = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch students';
      })
      // Fetch student by ID
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStudent = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch student';
      })
      // Create student
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.unshift(action.payload);
        state.isModalOpen = false;
        state.selectedStudent = null;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create student';
      })
      // Update student
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.students.findIndex(s => s.studentId === action.payload.studentId);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        state.isModalOpen = false;
        state.selectedStudent = null;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update student';
      })
      // Delete student
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(s => s.studentId !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete student';
      });
  },
});

export const { openModal, closeModal, clearError } = studentSlice.actions;
export default studentSlice.reducer;
