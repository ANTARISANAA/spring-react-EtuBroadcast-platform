export interface Student {
  id: string; // UUID
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface StudentFilters {
  search?: string;
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
  id?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface StudentAction {
  type: 'view' | 'edit' | 'delete';
  student: Student;
}
