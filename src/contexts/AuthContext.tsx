import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../api/axiosInstance';
import { createCustomer } from '../api/profileApi';

interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'user' | 'superadmin';
}

interface AuthContextType {
  currentUser: User | null;
  role: 'admin' | 'user' | 'superadmin' | null;
  login: (email: string, password: string, role?: 'admin' | 'user') => Promise<void>;
  register: (email: string, password: string, name: string, role?: 'admin' | 'user') => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [role, setRole] = useState<'admin' | 'user' | 'superadmin' | null>(null);
  const [loading, setLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedRole = localStorage.getItem('userRole');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedRole) {
      setRole(savedRole as 'admin' | 'user' | 'superadmin');
    }
  }, []);

  const login = async (email: string, password: string, loginRole: 'admin' | 'user' = 'user') => {
    setLoading(true);
    try {
      console.log('Attempting login as:', loginRole);
      const endpoint = loginRole === 'admin' ? '/admin/login' : '/customer/login';
      const res = await axiosInstance.post(endpoint, { email, password });

      console.log('Login response:', res.data);

      // Extract user data based on common response patterns
      const userData = res.data.user || res.data.data?.user || res.data;
      // Use the loginRole as the definitive role since that's what the user selected
      const userRole = loginRole;

      const user: User = {
        id: userData.id || userData._id || Date.now().toString(),
        email: userData.email || email,
        name: userData.name || userData.firstName || userData.lastName || 'User',
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userRole
      };

      console.log('Setting user:', user);
      console.log('Setting role:', userRole);

      setCurrentUser(user);
      setRole(userRole);
      
      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('userRole', userRole);
      
      toast.success(`${userRole === 'admin' ? 'Admin' : 'User'} logged in!`);
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || error.response?.data || error.message || 'Failed to log in';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    registerRole: 'admin' | 'user' = 'user'
  ) => {
    setLoading(true);
    try {
      if (registerRole === 'admin') {
        await axiosInstance.post('/admin/create', {
          email,
          password,
          firstName: name,
          lastName: '',
        });
      } else {
        await createCustomer({ email, password, firstName: name, lastName: '' });
      }
      toast.success(`${registerRole === 'admin' ? 'Admin' : 'User'} account created!`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data || error.message || 'Failed to create account';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setCurrentUser(null);
    setRole(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    toast.success('Successfully logged out!');
  };

  const value = {
    currentUser,
    role,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};