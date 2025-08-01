type ApiErrorCause = {
  message: string;
  description: string;
  code?: string;
};

export type ApiError = {
  type: string;
  status: number | null;
  cause: ApiErrorCause;
  retriable: boolean;
};

export interface Admin {
  id: string;
  email: string;
  fullName: string;
  role: 'ADMIN';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  admin: Admin;
}

export interface AuthState {
  isAuthenticated: boolean;
  admin: Admin | null;
  token: string | null;
}
