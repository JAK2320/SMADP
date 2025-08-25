import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(formData.email, formData.password, role);
      navigate(role === 'admin' ? '/admin' : from, { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 0'
    }}>
      <div className="container" style={{ maxWidth: '400px' }}>
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
              {role === 'admin' ? 'Admin Login' : 'Welcome Back'}
            </h1>
            <p style={{ color: '#6b7280' }}>
              {role === 'admin'
                ? 'Sign in to manage the University Store'
                : 'Sign in to your account to continue shopping'}
            </p>
          </div>

          {/* Role Switch */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              display: 'inline-flex',
              borderRadius: '9999px',
              backgroundColor: '#e5e7eb',
              padding: '0.25rem',
              gap: '0.25rem'
            }}>
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`btn ${role === 'user' ? 'btn-primary' : 'btn-outline'}`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`btn ${role === 'admin' ? 'btn-primary' : 'btn-outline'}`}
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            {error && (
              <p className="error-message text-center mt-4">
                {error}
              </p>
            )}
          </form>

          {role === 'user' && (
            <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#3b82f6', fontWeight: '500', textDecoration: 'none' }}>
                Sign up here
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;