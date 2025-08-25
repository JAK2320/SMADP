import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, role, loading } = useAuth();

  // Redirect if not admin
  useEffect(() => {
    if (!loading) {
      console.log('AdminDashboard - Current role:', role);
      console.log('AdminDashboard - Current user:', currentUser);
      
      if (!role || (role !== 'admin' && role !== 'superadmin')) {
        console.log('Redirecting to login - insufficient permissions');
        navigate('/login', { 
          state: { message: 'Please log in as admin to access this page' } 
        });
      }
    }
  }, [role, navigate, loading, currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!role || (role !== 'admin' && role !== 'superadmin')) {
    return null;
  }

  const Card = ({
    title,
    description,
    icon,
    route,
    color = 'blue',
  }: {
    title: string;
    description: string;
    icon: string;
    route: string;
    color?: string;
  }) => (
    <div
      onClick={() => navigate(route)}
      className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-xl shadow-md p-6 w-full max-w-xs text-center cursor-pointer transition duration-200 border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{description}</p>
      <button
        className={`bg-${color}-600 hover:bg-${color}-700 text-white px-4 py-2 rounded-full text-sm transition`}
      >
        Go to {title}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Welcome back, {currentUser?.name || 'Admin'}! Manage your store efficiently.
        </p>
      </header>

      <section className="flex flex-wrap justify-center gap-6">
        <Card
          title="Manage Products"
          description="Add, edit, or remove merchandise."
          icon="🛍️"
          route="/admin/products"
        />
        <Card
          title="View Orders"
          description="Track and fulfill customer orders."
          icon="📦"
          route="/admin/orders"
        />
        <Card
          title="User Management"
          description="Manage customer and admin accounts."
          icon="👥"
          route="/admin/users"
        />
        {role === 'superadmin' && (
          <>
            <Card
              title="Add Admin"
              description="Create new admin accounts securely."
              icon="🛡️"
              route="/admin/create-admin"
              color="red"
            />
            <Card
              title="Audit Logs"
              description="View admin activity and creation history."
              icon="📜"
              route="/admin/logs"
              color="gray"
            />
          </>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;