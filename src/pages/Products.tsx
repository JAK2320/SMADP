import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Filter, Grid, List, Search } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'

const Products: React.FC = () => {
  const { categoryId } = useParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedCategory, setSelectedCategory] = useState('')

  // Get search term from URL parameters
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const searchParam = urlParams.get('search')
    if (searchParam) {
      setSearchTerm(searchParam)
    }
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (categoryId) {
      filtered = filtered.filter(product => product.category === categoryId)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return filtered
  }, [categoryId, searchTerm, sortBy, priceRange])

  const currentCategory = categories.find(cat => cat.id === categoryId)

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}>
            {currentCategory ? currentCategory.name : 'All Products'}
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
            {currentCategory
              ? currentCategory.description
              : 'Browse our complete collection of university merchandise'
            }
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
            <Search
              size={20}
              style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6b7280'
              }}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input"
              style={{ width: 'auto', minWidth: '150px' }}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* View Mode */}
            <div style={{ display: 'flex', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '0.5rem',
                  border: 'none',
                  backgroundColor: viewMode === 'grid' ? '#3b82f6' : 'transparent',
                  color: viewMode === 'grid' ? 'white' : '#6b7280',
                  borderRadius: '0.375rem 0 0 0.375rem',
                  cursor: 'pointer'
                }}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '0.5rem',
                  border: 'none',
                  backgroundColor: viewMode === 'list' ? '#3b82f6' : 'transparent',
                  color: viewMode === 'list' ? 'white' : '#6b7280',
                  borderRadius: '0 0.375rem 0.375rem 0',
                  cursor: 'pointer'
                }}
              >
                <List size={16} />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
              Filters
            </h3>

            <div className="grid md:grid-cols-3" style={{ gap: '1.5rem' }}>
              {/* Price Range */}
              <div>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem' }}>
                  Price Range
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange(prev => [Number(e.target.value), prev[1]])}
                    className="input"
                    style={{ width: '100px' }}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange(prev => [prev[0], Number(e.target.value)])}
                    className="input"
                    style={{ width: '100px' }}
                  />
                </div>
              </div>

              {/* Category Filter (if viewing all products) */}
              {!categoryId && (
                <div>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem' }}>
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Stock Filter */}
              <div>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem' }}>
                  Availability
                </label>
                <select className="input">
                  <option value="">All Items</option>
                  <option value="in-stock">In Stock Only</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: '#6b7280' }}>
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-3' : 'grid grid-cols-1'} style={{ gap: '1.5rem' }}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#6b7280'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              No products found
            </h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products