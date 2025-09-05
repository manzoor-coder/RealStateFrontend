'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authApi } from '@/lib/api/auth';
import { User } from '@/types';

interface AuthContextType {
  user: { id: string; username: string; roles: number[] } | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => Promise<void>;
  verifyToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: string; username: string; roles: number[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      try {
        const parsedUser = JSON.parse(cachedUser);
        setUser(parsedUser);
        verifyToken(); // ✅ Validate against backend using cookie
      } catch {
        setUser(null);
        toast.error('Failed to load user data');
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);


const saveToStorage = (token: string, userData: User) => {
    const storedUser = {
      id: userData._id,
      username: `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
      roles: userData.roles,
    };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(storedUser));
    setUser(storedUser);
  };


  const login = async (credentials: { email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await authApi.login(credentials); 
         const { access_token: token, user: userData } = response.data;
      saveToStorage(token, userData);

      const role = userData.roles[0];
      if (role === 1) {
        router.replace('/admin/dashboard');
      } else if(role === 5) {
        router.replace('/dashboard');
      }else if(role === 2) {
        router.replace('/user-dashboard');
      }

      toast.success('Logged in successfully!');
    } catch (error: any) {
      setUser(null);
      if (error.response?.status === 401) {
        toast.error('Invalid email or password');
      } else {
        toast.error(error.response?.data?.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    try {
      setLoading(true);
      const response = await authApi.register(data);
      const { access_token: token, user: userData } = response.data;
      saveToStorage(token, userData);
      toast.success('Registered successfully!');
      router.push('/');
    } catch (error: any) {
      setUser(null);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout(); // ✅ Backend will clear cookie
      localStorage.removeItem('user');
      setUser(null);
      toast.success('Logged out successfully!');
      // router.push('/auth/login');
      router.push('/');
    } catch (error) {
      toast.error('Logout failed!');
    }
  };

  const verifyToken = async () => {
    try {
      const response = await authApi.verify(); // ✅ This uses cookies automatically
       console.log('Verify response:', response.data); // Debug the response
      const { user: userData, valid } = response.data;
      if (valid && userData) {
        const token = localStorage.getItem('token') || '';
        saveToStorage(token, userData); // Full 'User' data from backend response
      } else {
        throw new Error('Token validation failed');
      }
    } catch (error) {
      localStorage.removeItem('user');
      setUser(null);
      router.push('/auth/login');
    }
  };

  

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};
