import {
  DollarSign,
  Edit,
  Eye,
  LogOut,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
  TrendingUp,
  Users
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface DashboardStats {
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  paymentMethod?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const AdminDashboard: React.FC = () => {
  const { currentUser, logout, role } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'customers' | 'products' | 'orders'>('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not admin
    if (currentUser && role !== 'admin') {
      navigate('/');
    } else if (!currentUser) {
      navigate('/login?role=admin');
    }
    // Load dashboard data if the user is an admin
    if (currentUser && role === 'admin') {
      loadDashboardData();
    }
  }, [currentUser, role, navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API calls
      setStats({
        totalCustomers: 156,
        totalProducts: 89,
        totalOrders: 342,
        totalRevenue: 25430
      });

      setCustomers([
        { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', paymentMethod: 'Credit Card' },
        { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', paymentMethod: 'PayPal' },
        { id: '3', firstName: 'Mike', lastName: 'Johnson', email: 'mike@example.com', paymentMethod: 'Debit Card' }
      ]);

      setProducts([
        { id: '1', name: 'University T-Shirt', price: 25.99, category: 'Apparel', stock: 45 },
        { id: '2', name: 'Study Desk', price: 199.99, category: 'Furniture', stock: 12 },
        { id: '3', name: 'University Mug', price: 12.99, category: 'Promotional', stock: 78 }
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Show loading or redirect if not authenticated
  if (!currentUser || role !== 'admin') {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  const renderOverview = () => (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Customers</p>
              <p style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>{stats.totalCustomers}</p>
            </div>
            <Users size={40} style={{ color: '#3b82f6' }} />
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Products</p>
              <p style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>{stats.totalProducts}</p>
            </div>
            <Package size={40} style={{ color: '#10b981' }} />
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Orders</p>
              <p style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>{stats.totalOrders}</p>
            </div>
            <ShoppingCart size={40} style={{ color: '#f59e0b' }} />
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Revenue</p>
              <p style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign size={40} style={{ color: '#ef4444' }} />
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TrendingUp size={20} />
          Quick Actions
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={16} />
            Add Product
          </button>
          <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={16} />
            View Customers
          </button>
          <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingCart size={16} />
            Manage Orders
          </button>
        </div>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Customer Management</h3>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} />
          Add Customer
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Name</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Email</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Payment Method</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '0.75rem' }}>{customer.firstName} {customer.lastName}</td>
                <td style={{ padding: '0.75rem' }}>{customer.email}</td>
                <td style={{ padding: '0.75rem' }}>{customer.paymentMethod || 'N/A'}</td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer', color: '#3b82f6' }}>
                      <Eye size={16} />
                    </button>
                    <button style={{ padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer', color: '#10b981' }}>
                      <Edit size={16} />
                    </button>
                    <button style={{ padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Product Management</h3>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} />
          Add Product
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Name</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Category</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Price</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Stock</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '0.75rem' }}>{product.name}</td>
                <td style={{ padding: '0.75rem' }}>{product.category}</td>
                <td style={{ padding: '0.75rem' }}>${product.price.toFixed(2)}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    backgroundColor: product.stock > 20 ? '#dcfce7' : product.stock > 0 ? '#fef3c7' : '#fee2e2',
                    color: product.stock > 20 ? '#166534' : product.stock > 0 ? '#92400e' : '#991b1b'
                  }}>
                    {product.stock}
                  </span>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer', color: '#3b82f6' }}>
                      <Eye size={16} />
                    </button>
                    <button style={{ padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer', color: '#10b981' }}>
                      <Edit size={16} />
                    </button>
                    <button style={{ padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}>
              Admin Dashboard
            </h1>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Welcome back, {currentUser?.firstName || currentUser?.name || 'Admin'}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => navigate('/')}
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Eye size={16} />
              View Store
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e5e7eb',
          marginBottom: '2rem',
          backgroundColor: 'white',
          borderRadius: '0.5rem 0.5rem 0 0'
        }}>
          {[
            { key: 'overview', label: 'Overview', icon: TrendingUp },
            { key: 'customers', label: 'Customers', icon: Users },
            { key: 'products', label: 'Products', icon: Package },
            { key: 'orders', label: 'Orders', icon: ShoppingCart }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              style={{
                padding: '1rem 1.5rem',
                border: 'none',
                backgroundColor: activeTab === key ? '#3b82f6' : 'transparent',
                color: activeTab === key ? 'white' : '#6b7280',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderRadius: activeTab === key ? '0.5rem 0.5rem 0 0' : '0'
              }}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'customers' && renderCustomers()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'orders' && (
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <h3>Orders Management</h3>
            <p style={{ color: '#6b7280', marginTop: '1rem' }}>Orders management feature coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;