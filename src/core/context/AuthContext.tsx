import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import type { AuthState, LoginResponse } from '@/utils/types';
import { isTokenValid, clearAuthData } from '@/utils/auth';

interface AuthContextType extends AuthState {
  login: (response: LoginResponse) => void;
  logout: () => void;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state from localStorage
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('admin');
    
    if (token && admin) {
      try {
        // Validate token before restoring session
        if (!isTokenValid(token)) {
          console.log('Stored token is invalid or expired, clearing auth data');
          clearAuthData();
          setIsLoading(false);
          return;
        }
        
        const adminData = JSON.parse(admin);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            admin: adminData,
            token,
          },
        });
        console.log('Auth state restored from localStorage');
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
        clearAuthData();
      }
    } else {
      console.log('No stored auth data found');
    }
    
    // Mark initialization as complete
    setIsLoading(false);
  }, []);

  const login = (response: LoginResponse) => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('admin', JSON.stringify(response.admin));
    dispatch({ type: 'LOGIN', payload: response });
  };

  const logout = () => {
    clearAuthData();
    dispatch({ type: 'LOGOUT' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    isLoading,
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