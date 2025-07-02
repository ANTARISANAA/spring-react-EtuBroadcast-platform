export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  status: 'active' | 'inactive' | 'graduated';
  enrollmentDate: string;
  grade: string;
  major: string;
  gpa: number;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface StudentFilters {
  search?: string;
  status?: Student['status'];
  gender?: Student['gender'];
  grade?: string;
  major?: string;
  enrollmentDateRange?: [string, string];
  gpaRange?: [number, number];
}

export interface StudentTableState {
  data: Student[];
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  filters: StudentFilters;
  sortField?: string;
  sortOrder?: 'ascend' | 'descend';
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  gender: Student['gender'];
  status: Student['status'];
  grade: string;
  major: string;
  gpa: number;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface StudentAction {
  type: 'view' | 'edit' | 'delete';
  student: Student;
}
