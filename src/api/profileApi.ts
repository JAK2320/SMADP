import axiosInstance from './axiosInstance';

// ==================== ADMIN SECTION ====================

export interface Admin {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Optional since we might not want to expose this everywhere
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// ==================== Admin Authentication ====================

export const registerAdmin = async (adminData: Admin) => {
  const response = await axiosInstance.post('/admins/register', adminData);
  return response.data;
};

export const loginAdmin = async (credentials: LoginCredentials) => {
  const response = await axiosInstance.post('/admins/login', credentials);
  return response.data;
};

// ==================== Admin CRUD Operations ====================

export const getAllAdmins = async () => {
  const response = await axiosInstance.get('/admins/all');
  return response.data;
};

export const getAdminById = async (id: number) => {
  const response = await axiosInstance.get(`/admins/read/${id}`);
  return response.data;
};

export const updateAdmin = async (adminData: Admin) => {
  // backend expects POST, not PUT
  const response = await axiosInstance.post('/admins/update', adminData);
  return response.data;
};

export const deleteAdmin = async (id: number) => {
  const response = await axiosInstance.delete(`/admins/delete/${id}`);
  return response.data;
};

// ==================== Admin Utility Function ====================

export const pingAdminBackend = async () => {
  const response = await axiosInstance.get('/admins/ping');
  return response.data;
};
// ==================== CUSTOMER SECTION ====================

export interface Customer {
  id?: string; // UUID as string in frontend
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  paymentMethod?: string;
  // Add other customer properties as needed
}

export interface CustomerLoginRequest {
  email: string;
  password: string;
}

// Customer CRUD Operations - Updated for consistency
export const registerCustomer = async (customerData: Customer) => {
  try {
    console.log('Attempting customer registration with:', customerData.email);
    const response = await axiosInstance.post('/customer/create', customerData);
    console.log('Customer registration response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Customer registration error:', error);
    if (error.response?.status === 409) {
      throw new Error('Email already exists');
    } else if (error.response?.status === 400) {
      throw new Error('Invalid registration data');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to backend server');
    }
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Alias for backward compatibility
export const createCustomer = registerCustomer;

export const getCustomer = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/customer/read/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching customer with ID ${id}:`, error);
    if (error.response?.status === 404) {
      throw new Error('Customer not found');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to backend server');
    }
    throw new Error(error.response?.data?.message || `Failed to fetch customer with ID ${id}`);
  }
};

export const updateCustomer = async (customerData: Customer) => {
  try {
    const response = await axiosInstance.put('/customer/update', customerData);
    return response.data;
  } catch (error: any) {
    console.error('Error updating customer:', error);
    if (error.response?.status === 400) {
      throw new Error('Invalid customer data');
    } else if (error.response?.status === 404) {
      throw new Error('Customer not found');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to backend server');
    }
    throw new Error(error.response?.data?.message || 'Failed to update customer');
  }
};

export const deleteCustomer = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/customer/delete/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error deleting customer with ID ${id}:`, error);
    if (error.response?.status === 404) {
      throw new Error('Customer not found');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to backend server');
    }
    throw new Error(error.response?.data?.message || `Failed to delete customer with ID ${id}`);
  }
};

export const getAllCustomers = async () => {
  try {
    const response = await axiosInstance.get('/customer/getAll');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching all customers:', error);
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to backend server');
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch customers');
  }
};

export const findCustomersByPaymentMethod = async (paymentMethod: string) => {
  try {
    const response = await axiosInstance.get(`/customer/findByPaymentMethod?paymentMethod=${encodeURIComponent(paymentMethod)}`);
    return response.data;
  } catch (error: any) {
    console.error('Error finding customers by payment method:', error);
    if (error.response?.status === 400) {
      throw new Error('Invalid payment method');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to backend server');
    }
    throw new Error(error.response?.data?.message || 'Failed to find customers by payment method');
  }
};

export const loginCustomer = async (credentials: { email: string; password: string }) => {
  try {
    console.log('Attempting customer login with:', credentials.email);
    const response = await axiosInstance.post('/customer/login', credentials);
    console.log('Customer login response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Customer login error:', error);
    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error('Invalid customer credentials');
    } else if (error.response?.status === 404) {
      throw new Error('Customer login endpoint not found');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to backend server');
    }
    throw new Error(error.response?.data?.message || 'Customer login failed');
  }
};

// ==================== PROFILE SECTION ====================

// Profile Management Functions
export const getProfile = async () => {
  try {
    const response = await axiosInstance.get('/profile');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    if (error.response?.status === 404) {
      throw new Error('Profile not found');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to backend server');
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};

export const updateProfile = async (profileData: any) => {
  try {
    const response = await axiosInstance.put('/profile', profileData);
    return response.data;
  } catch (error: any) {
    console.error('Error updating profile:', error);
    if (error.response?.status === 400) {
      throw new Error('Invalid profile data');
    } else if (error.response?.status === 404) {
      throw new Error('Profile not found');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to backend server');
    }
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};

export const changePassword = async (oldPassword: string, newPassword: string) => {
  try {
    const response = await axiosInstance.post('/profile/change-password', { oldPassword, newPassword });
    return response.data;
  } catch (error: any) {
    console.error('Error changing password:', error);
    if (error.response?.status === 401) {
      throw new Error('Incorrect current password');
    } else if (error.response?.status === 400) {
      throw new Error('Invalid password data');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to backend server');
    }
    throw new Error(error.response?.data?.message || 'Password change failed');
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axiosInstance.delete('/profile');
    return response.data;
  } catch (error: any) {
    console.error('Error deleting account:', error);
    if (error.response?.status === 404) {
      throw new Error('Account not found');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to backend server');
    }
    throw new Error(error.response?.data?.message || 'Account deletion failed');
  }
};

// Export all functions for easy importing
export default {
  // Admin exports
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  pingAdminBackend,
  
  // Customer exports
  registerCustomer,
  createCustomer, // alias for backward compatibility
  getCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
  findCustomersByPaymentMethod,
  loginCustomer,
  
  // Profile exports
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount
};