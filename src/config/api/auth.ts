import { API } from './index';
import { API_PATHS } from '@/utils/apiPaths';
import type { LoginRequest, LoginResponse } from '@/utils/types';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return await API.post(API_PATHS.auth.login, credentials);
  },
  
  register: async (adminData: any): Promise<any> => {
    return await API.post(API_PATHS.auth.register, adminData);
  },
}; 