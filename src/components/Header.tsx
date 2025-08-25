
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Search, MapPin } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth()
  const { itemCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showMaps, setShowMaps] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Failed to log out:', error)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <header style={{ 
      backgroundColor: '#ffffff', 
      borderBottom: '2px solid #e5e7eb',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
    }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '1.2rem 0',
          gap: '2rem'
        }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '3rem', 
                height: '3rem', 
                backgroundColor: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '900',
                fontSize: '1.5rem',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}>
                U
              </div>
              <div>
                <h1 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '800', 
                  color: '#1f2937', 
                  margin: 0,
                  letterSpacing: '-0.025em'
                }}>
                  University Store
                </h1>
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: '#6b7280', 
                  margin: 0,
                  fontWeight: '500'
                }}>
                  Marketing Department
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none' }} className="desktop-nav">
            <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
              <Link to="/" style={{ 
                textDecoration: 'none', 
                color: '#374151', 
                fontWeight: '600',
                fontSize: '0.95rem',
                padding: '0.5rem 0',
                borderBottom: '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#3b82f6'
                e.currentTarget.style.borderBottomColor = '#3b82f6'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#374151'
                e.currentTarget.style.borderBottomColor = 'transparent'
              }}>
                Home
              </Link>
              <Link to="/products" style={{ 
                textDecoration: 'none', 
                color: '#374151', 
                fontWeight: '600',
                fontSize: '0.95rem',
                padding: '0.5rem 0',
                borderBottom: '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#3b82f6'
                e.currentTarget.style.borderBottomColor = '#3b82f6'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#374151'
                e.currentTarget.style.borderBottomColor = 'transparent'
              }}>
                All Products
              </Link>
              <Link to="/contact" style={{ 
                textDecoration: 'none', 
                color: '#374151', 
                fontWeight: '600',
                fontSize: '0.95rem',
                padding: '0.5rem 0',
                borderBottom: '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#3b82f6'
                e.currentTarget.style.borderBottomColor = '#3b82f6'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#374151'
                e.currentTarget.style.borderBottomColor = 'transparent'
              }}>
                Contact Us
              </Link>
              <Link to="/about" style={{ 
                textDecoration: 'none', 
                color: '#374151', 
                fontWeight: '600',
                fontSize: '0.95rem',
                padding: '0.5rem 0',
                borderBottom: '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#3b82f6'
                e.currentTarget.style.borderBottomColor = '#3b82f6'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#374151'
                e.currentTarget.style.borderBottomColor = 'transparent'
              }}>
                About Us
              </Link>
              <Link to="/designer" style={{ 
                textDecoration: 'none', 
                color: '#374151', 
                fontWeight: '600',
                fontSize: '0.95rem',
                padding: '0.5rem 0',
                borderBottom: '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#3b82f6'
                e.currentTarget.style.borderBottomColor = '#3b82f6'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#374151'
                e.currentTarget.style.borderBottomColor = 'transparent'
              }}>
                Designer
              </Link>
            </div>
          </nav>

          {/* Search Bar and Actions */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.5rem',
            flex: 1,
            justifyContent: 'flex-end',
            maxWidth: '600px'
          }}>
            {/* Enhanced Search Bar */}
            <form onSubmit={handleSearch} style={{ 
              position: 'relative',
              flex: 1,
              maxWidth: '350px',
              minWidth: '250px'
            }}>
              <div style={{ position: 'relative' }}>
                <Search 
                  size={20} 
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6b7280',
                    zIndex: 1
                  }}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '3rem',
                    paddingRight: '1rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    backgroundColor: '#f9fafb',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6'
                    e.currentTarget.style.backgroundColor = '#ffffff'
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.backgroundColor = '#f9fafb'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>
            </form>

            {/* Maps Button */}
            <button
              onClick={() => setShowMaps(!showMaps)}
              style={{ 
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none',
                borderRadius: '50%',
                width: '2.75rem',
                height: '2.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}
            >
              <MapPin size={20} />
            </button>

            {/* Cart */}
            <Link to="/cart" style={{ 
              position: 'relative', 
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              borderRadius: '50%',
              width: '2.75rem',
              height: '2.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.4)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)'
            }}>
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  borderRadius: '50%',
                  width: '1.5rem',
                  height: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  border: '2px solid white',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {currentUser ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '50px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <User size={16} />
                  </div>
                  <span>
                    {currentUser.displayName || 'Profile'}
                  </span>
                </button>

                {isMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    backgroundColor: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    minWidth: '12rem',
                    zIndex: 50,
                    marginTop: '0.5rem',
                    overflow: 'hidden'
                  }}>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        display: 'block',
                        padding: '1rem 1.25rem',
                        textDecoration: 'none',
                        color: '#374151',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        borderBottom: '1px solid #f3f4f6',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '1rem 1.25rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#ef4444',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#fef2f2'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link to="/login" style={{
                  textDecoration: 'none',
                  padding: '0.6rem 1.5rem',
                  border: '2px solid #3b82f6',
                  borderRadius: '50px',
                  color: '#3b82f6',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#3b82f6'
                }}>
                  Login
                </Link>
                <Link to="/register" style={{
                  textDecoration: 'none',
                  padding: '0.6rem 1.5rem',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  borderRadius: '50px',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}>
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                display: 'block',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                color: '#6b7280'
              }}
              className="mobile-menu-btn"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav style={{ 
            display: 'block',
            borderTop: '1px solid #e5e7eb',
            paddingTop: '1rem',
            paddingBottom: '1rem'
          }} className="mobile-nav">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '600', padding: '0.5rem 0' }}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                onClick={() => setIsMenuOpen(false)}
                style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '600', padding: '0.5rem 0' }}
              >
                All Products
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)}
                style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '600', padding: '0.5rem 0' }}
              >
                Contact Us
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)}
                style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '600', padding: '0.5rem 0' }}
              >
                About Us
              </Link>
              <Link 
                to="/designer" 
                onClick={() => setIsMenuOpen(false)}
                style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '600', padding: '0.5rem 0' }}
              >
                Designer
              </Link>
            </div>
          </nav>
        )}

        {/* Google Maps Integration */}
        {showMaps && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            backgroundColor: 'white',
            borderTop: '2px solid #e5e7eb',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            zIndex: 40,
            padding: '1rem'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '1rem' 
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700', 
                color: '#1f2937', 
                margin: 0 
              }}>
                Find Our Store
              </h3>
              <button
                onClick={() => setShowMaps(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  color: '#6b7280'
                }}
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ 
              width: '100%', 
              height: '400px', 
              borderRadius: '0.75rem', 
              overflow: 'hidden',
              border: '2px solid #e5e7eb'
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.7839095903033!2d18.424620315080495!3d-33.9248685325324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc676c9b0c2b21%3A0x5e84b1e8c7b4c2c1!2sUniversity%20of%20Cape%20Town!5e0!3m2!1sen!2sza!4v1620000000000!5m2!1sen!2sza"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="University Store Location"
              ></iframe>
            </div>
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              backgroundColor: '#f8fafc', 
              borderRadius: '0.75rem' 
            }}>
              <p style={{ 
                fontSize: '0.9rem', 
                color: '#4b5563', 
                margin: '0 0 0.5rem 0',
                fontWeight: '600'
              }}>
                📍 University Marketing Store
              </p>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
                University Avenue, Rondebosch, Cape Town, 7700
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: block !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  )
}

export default Header
