export interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  enrollmentDate: string;
  isActive: boolean;
  createdDate: string;
  modifiedDate: string;
}

export interface CreateStudentDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface UpdateStudentDto extends CreateStudentDto {
  studentId: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}
