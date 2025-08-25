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

// Admin Authentication
export const registerAdmin = async (adminData: Admin) => {
  const res = await axiosInstance.post('/admins/register', adminData);
  return res.data;
};

export const loginAdmin = async (credentials: LoginCredentials) => {
  const res = await axiosInstance.post('/admins/login', credentials);
  return res.data;
};

// Admin CRUD Operations
export const getAllAdmins = async () => {
  const res = await axiosInstance.get('/admins/all');
  return res.data;
};

export const getAdminById = async (id: number) => {
  const res = await axiosInstance.get(`/admins/read/${id}`);
  return res.data;
};

export const updateAdmin = async (adminData: Admin) => {
  const res = await axiosInstance.post('/admins/update', adminData);
  return res.data;
};

export const deleteAdmin = async (id: number) => {
  const res = await axiosInstance.delete(`/admins/delete/${id}`);
  return res.data;
};

// Admin Utility function
export const pingAdminBackend = async () => {
  const res = await axiosInstance.get('/admins/ping');
  return res.data;
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

// Customer CRUD Operations
export const createCustomer = async (customerData: Customer) => {
  const res = await axiosInstance.post('/customer/create', customerData);
  return res.data;
};

export const getCustomer = async (id: string) => {
  const res = await axiosInstance.get(`/customer/read/${id}`);
  return res.data;
};

export const updateCustomer = async (customerData: Customer) => {
  const res = await axiosInstance.put('/customer/update', customerData);
  return res.data;
};

export const deleteCustomer = async (id: string) => {
  const res = await axiosInstance.delete(`/customer/delete/${id}`);
  return res.data;
};

export const getAllCustomers = async () => {
  const res = await axiosInstance.get('/customer/getAll');
  return res.data;
};

export const findCustomersByPaymentMethod = async (paymentMethod: string) => {
  const res = await axiosInstance.get(`/customer/findByPaymentMethod?paymentMethod=${encodeURIComponent(paymentMethod)}`);
  return res.data;
};

export const loginCustomer = async (loginData: CustomerLoginRequest) => {
  const res = await axiosInstance.post('/customer/login', loginData);
  return res.data;
};

// ==================== PROFILE SECTION ====================

// Profile Management Functions
export const getProfile = async () => {
  const res = await axiosInstance.get('/profile');
  return res.data;
};

export const updateProfile = async (profileData: any) => {
  const res = await axiosInstance.put('/profile', profileData);
  return res.data;
};

export const changePassword = async (oldPassword: string, newPassword: string) => {
  const res = await axiosInstance.post('/profile/change-password', { oldPassword, newPassword });
  return res.data;
};

export const deleteAccount = async () => {
  const res = await axiosInstance.delete('/profile');
  return res.data;
};