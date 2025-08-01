import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { AuthState, LoginResponse } from '@/utils/types';

interface AuthContextType extends AuthState {
  login: (response: LoginResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN'; payload: LoginResponse }
  | { type: 'LOGOUT' }
  | { type: 'INITIALIZE'; payload: AuthState };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        admin: action.payload.admin,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        admin: null,
        token: null,
      };
    case 'INITIALIZE':
      return action.payload;
    default:
      return state;
  }
};

const initialState: AuthState = {
  isAuthenticated: false,
  admin: null,
  token: null,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Initialize auth state from localStorage
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('admin');
    
    if (token && admin) {
      try {
        const adminData = JSON.parse(admin);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            admin: adminData,
            token,
          },
        });
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
      }
    }
  }, []);

  const login = (response: LoginResponse) => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('admin', JSON.stringify(response.admin));
    dispatch({ type: 'LOGIN', payload: response });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    dispatch({ type: 'LOGOUT' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 