
import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../api/axiosInstance';
import { loginAdmin, loginCustomer } from '../api/profileApi';

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
  loading: boolean;
  login: (email: string, password: string, loginRole?: 'admin' | 'user') => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
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
    
    if (savedUser && savedRole) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setRole(savedRole as 'admin' | 'user' | 'superadmin');
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRole');
      }
    }
  }, []);

  const login = async (email: string, password: string, loginRole: 'admin' | 'user' = 'user'): Promise<boolean> => {
    setLoading(true);
    try {
      console.log('Attempting login as:', loginRole, 'with email:', email);
      
      let response;
      if (loginRole === 'admin') {
        response = await loginAdmin({ email, password });
      } else {
        response = await loginCustomer({ email, password });
      }

      console.log('Login response:', response);

      if (response && (response.success || response.id || response.email)) {
        const userData: User = {
          id: response.id?.toString() || response.userId?.toString() || email,
          email: response.email || email,
          name: response.name || `${response.firstName || ''} ${response.lastName || ''}`.trim() || 'User',
          firstName: response.firstName,
          lastName: response.lastName,
          role: loginRole
        };

        setCurrentUser(userData);
        setRole(loginRole);
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(userData));
        localStorage.setItem('userRole', loginRole);
        
        toast.success(`Welcome back, ${userData.name}!`);
        return true;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ');

      const customerData = {
        firstName,
        lastName,
        email,
        password
      };

      const response = await axiosInstance.post('/customer/create', customerData);
      
      if (response.data && (response.data.success || response.data.id)) {
        toast.success('Registration successful! Please log in.');
        return true;
      } else {
        throw new Error('Registration failed');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error?.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setRole(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    toast.success('Logged out successfully');
  };

  const value = {
    currentUser,
    role,
    loading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
