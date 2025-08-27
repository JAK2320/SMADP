
import React, { useState } from 'react'
import { Palette, Lightbulb, Award, Star, Camera, Eye, Heart, ExternalLink, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Designer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const navigate = useNavigate()
  const { role } = useAuth()

  const handleBackClick = () => {
    if (role === 'admin') {
      navigate('/admin/dashboard')
    } else {
      navigate('/')
    }
  }

  const designerInfo = {
    name: 'Alex Thompson',
    title: 'Lead Product Designer',
    bio: 'With over 10 years of experience in product design and a Master\'s degree in Industrial Design, Alex brings creativity and innovation to every project. Specializing in user-centered design and sustainable materials, Alex ensures that every product not only looks great but serves its purpose effectively.',
    profileImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    achievements: [
      'Design Excellence Award 2023',
      '50+ Products Designed',
      'Featured in Design Magazine 2022',
      'Sustainability Innovation Award 2021'
    ],
    skills: ['Product Design', 'User Experience', 'Sustainable Materials', '3D Modeling', 'Brand Identity'],
    contact: {
      email: 'alex.thompson@university.edu',
      portfolio: 'www.alexthompsondesign.com',
      linkedin: 'linkedin.com/in/alexthompson'
    }
  }

  const portfolioItems = [
    {
      id: 1,
      title: 'University T-Shirt Collection',
      description: 'Modern and comfortable apparel designs featuring the university logo with innovative fabric technology.',
      image: 'https://images.pexels.com/photos/5866728/pexels-photo-5866728.jpeg',
      category: 'apparel',
      year: '2023',
      client: 'University Marketing',
      price: 'R259.99',
      gallery: [
        'https://images.pexels.com/photos/5866728/pexels-photo-5866728.jpeg',
        'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
        'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg'
      ]
    },
    {
      id: 2,
      title: 'Ergonomic Study Furniture',
      description: 'Functional and stylish furniture designed for optimal studying experience with focus on comfort and productivity.',
      image: 'https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg',
      category: 'furniture',
      year: '2023',
      client: 'Academic Affairs',
      price: 'R1,999.99',
      gallery: [
        'https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg',
        'https://images.pexels.com/photos/586763/pexels-photo-586763.jpeg',
        'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg'
      ]
    },
    {
      id: 3,
      title: 'Campus Event Accessories',
      description: 'Custom promotional items and accessories for university events, designed to create lasting brand impressions.',
      image: 'https://images.pexels.com/photos/6195121/pexels-photo-6195121.jpeg',
      category: 'accessories',
      year: '2022',
      client: 'Events Department',
      price: 'R129.99',
      gallery: [
        'https://images.pexels.com/photos/6195121/pexels-photo-6195121.jpeg',
        'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg',
        'https://images.pexels.com/photos/3766230/pexels-photo-3766230.jpeg'
      ]
    },
    {
      id: 4,
      title: 'Outdoor Activity Gear',
      description: 'Durable and practical gear for outdoor university activities, combining functionality with weather resistance.',
      image: 'https://images.pexels.com/photos/6551065/pexels-photo-6551065.jpeg',
      category: 'outdoor',
      year: '2022',
      client: 'Recreation Center',
      price: 'R459.99',
      gallery: [
        'https://images.pexels.com/photos/6551065/pexels-photo-6551065.jpeg',
        'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg',
        'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg'
      ]
    },
    {
      id: 5,
      title: 'Digital Brand Identity',
      description: 'Comprehensive brand identity design including logos, color schemes, and digital assets.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
      category: 'branding',
      year: '2023',
      client: 'Marketing Department',
      price: 'R2,500.00',
      gallery: [
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
        'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg',
        'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg'
      ]
    },
    {
      id: 6,
      title: 'Sustainable Packaging',
      description: 'Eco-friendly packaging solutions that reduce environmental impact while maintaining brand appeal.',
      image: 'https://images.pexels.com/photos/4492031/pexels-photo-4492031.jpeg',
      category: 'packaging',
      year: '2021',
      client: 'Sustainability Office',
      price: 'R89.99',
      gallery: [
        'https://images.pexels.com/photos/4492031/pexels-photo-4492031.jpeg',
        'https://images.pexels.com/photos/4492034/pexels-photo-4492034.jpeg',
        'https://images.pexels.com/photos/4492032/pexels-photo-4492032.jpeg'
      ]
    }
  ]

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'apparel', name: 'Apparel' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'outdoor', name: 'Outdoor' },
    { id: 'branding', name: 'Branding' },
    { id: 'packaging', name: 'Packaging' }
  ]

  const filteredPortfolio = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory)

  return (
    <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', minHeight: '100vh' }}>
      {/* Navigation Header */}
      <div style={{
        background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
        borderBottom: '1px solid #cbd5e1',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <button
            onClick={handleBackClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#64748b',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#475569'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#64748b'}
          >
            <ArrowLeft size={16} />
            {role === 'admin' ? 'Back to Dashboard' : 'Back to Home'}
          </button>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: '#1e293b',
            margin: 0
          }}>
            Design Studio
          </h1>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
            Design Studio
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            Where creativity meets functionality. Discover the artistry behind our university's most iconic products.
          </p>
        </section>

        {/* Designer Profile */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ 
            padding: '3rem', 
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            borderRadius: '1rem',
            border: '1px solid #cbd5e1',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '3rem', 
              alignItems: 'center' 
            }}>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={designerInfo.profileImage}
                  alt={designerInfo.name}
                  style={{
                    width: '12rem',
                    height: '12rem',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto 1.5rem',
                    border: '4px solid white',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1f2937' }}>
                  {designerInfo.name}
                </h2>
                <p style={{ color: '#3b82f6', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                  {designerInfo.title}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Award size={20} style={{ color: '#f59e0b' }} />
                    <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>15+ Awards</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star size={20} style={{ color: '#f59e0b' }} />
                    <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>50+ Projects</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {designerInfo.skills.map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={{ gridColumn: 'span 2' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1f2937' }}>
                  About the Designer
                </h3>
                <p style={{ fontSize: '1.125rem', color: '#4b5563', marginBottom: '2rem', lineHeight: 1.7 }}>
                  {designerInfo.bio}
                </p>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                    Achievements & Recognition
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    {designerInfo.achievements.map((achievement, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '2rem',
                          height: '2rem',
                          backgroundColor: '#fef3c7',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Award size={16} style={{ color: '#d97706' }} />
                        </div>
                        <span style={{ fontSize: '0.95rem', color: '#374151', fontWeight: '500' }}>
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                    Contact Information
                  </h4>
                  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <a href={`mailto:${designerInfo.contact.email}`} style={{
                      color: '#3b82f6',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: '500'
                    }}>
                      📧 {designerInfo.contact.email}
                    </a>
                    <a href={`https://${designerInfo.contact.portfolio}`} style={{
                      color: '#3b82f6',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: '500'
                    }}>
                      🌐 Portfolio
                    </a>
                    <a href={`https://${designerInfo.contact.linkedin}`} style={{
                      color: '#3b82f6',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: '500'
                    }}>
                      💼 LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Philosophy */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937' }}>
              Design Philosophy
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              Our approach to creating meaningful and impactful designs
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{ 
              padding: '2.5rem', 
              textAlign: 'center', 
              border: '2px solid #e5e7eb',
              borderRadius: '1rem',
              backgroundColor: 'white',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '5rem',
                height: '5rem',
                backgroundColor: '#3b82f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white'
              }}>
                <Palette size={28} />
              </div>
              <h3 style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937' }}>
                Creative Vision
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: 1.6 }}>
                Every design starts with a creative spark. We explore bold ideas and innovative 
                solutions that push boundaries while staying true to the university's identity.
              </p>
            </div>

            <div style={{ 
              padding: '2.5rem', 
              textAlign: 'center', 
              border: '2px solid #e5e7eb',
              borderRadius: '1rem',
              backgroundColor: 'white',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '5rem',
                height: '5rem',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white'
              }}>
                <Lightbulb size={28} />
              </div>
              <h3 style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937' }}>
                User-Centered
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: 1.6 }}>
                Understanding our community's needs is paramount. We design with the end-user 
                in mind, ensuring functionality matches beauty.
              </p>
            </div>

            <div style={{ 
              padding: '2.5rem', 
              textAlign: 'center', 
              border: '2px solid #e5e7eb',
              borderRadius: '1rem',
              backgroundColor: 'white',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '5rem',
                height: '5rem',
                backgroundColor: '#8b5cf6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white'
              }}>
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937' }}>
                Quality Focus
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: 1.6 }}>
                We never compromise on quality. From material selection to final production, 
                every step is carefully monitored to ensure excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937' }}>
              Design Portfolio
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Explore our complete collection of design projects and creative solutions
            </p>
            
            {/* Category Filter */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '2rem',
                    border: 'none',
                    backgroundColor: selectedCategory === category.id ? '#3b82f6' : '#f3f4f6',
                    color: selectedCategory === category.id ? 'white' : '#6b7280',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    if (selectedCategory !== category.id) {
                      e.currentTarget.style.backgroundColor = '#e5e7eb'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedCategory !== category.id) {
                      e.currentTarget.style.backgroundColor = '#f3f4f6'
                    }
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
            gap: '2.5rem' 
          }}>
            {filteredPortfolio.map((project) => (
              <div key={project.id} style={{ 
                overflow: 'hidden', 
                border: '2px solid #e5e7eb',
                borderRadius: '1rem',
                backgroundColor: 'white',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease'
              }}>
                {/* Main Image */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '1rem',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {project.year}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{
                      display: 'inline-block',
                      backgroundColor: '#e0f2fe',
                      color: '#0277bd',
                      padding: '0.375rem 1rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                      marginBottom: '1rem'
                    }}>
                      {project.category}
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#1f2937' }}>
                      {project.title}
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                      {project.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <p style={{ color: '#4b5563', fontSize: '0.9rem', fontWeight: '500' }}>
                        Client: {project.client}
                      </p>
                      <p style={{ color: '#059669', fontSize: '1.125rem', fontWeight: '700' }}>
                        {project.price}
                      </p>
                    </div>
                  </div>

                  {/* Image Gallery Preview */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1f2937' }}>
                      Project Gallery
                    </h4>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {project.gallery.slice(0, 3).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${project.title} ${index + 1}`}
                          style={{
                            width: '4rem',
                            height: '4rem',
                            objectFit: 'cover',
                            borderRadius: '0.5rem',
                            border: '2px solid #e5e7eb',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)'
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)'
                          }}
                        />
                      ))}
                      {project.gallery.length > 3 && (
                        <div style={{
                          width: '4rem',
                          height: '4rem',
                          backgroundColor: '#f3f4f6',
                          borderRadius: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#6b7280'
                        }}>
                          +{project.gallery.length - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        flex: 1
                      }}
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                    <button
                      style={{
                        backgroundColor: 'transparent',
                        color: '#6b7280',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '2px solid #e5e7eb',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Heart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section style={{ marginTop: '5rem', textAlign: 'center' }}>
          <div style={{ 
            padding: '4rem', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '1rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <Camera size={48} style={{ margin: '0 auto 1.5rem', display: 'block' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              Have a Design Idea?
            </h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem' }}>
              We'd love to collaborate with you on your next project. 
              Let's create something amazing together that tells your story.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{
                backgroundColor: 'white',
                color: '#667eea',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '700',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer'
              }}>
                Get in Touch
              </button>
              <button style={{
                backgroundColor: 'transparent',
                color: 'white',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '700',
                borderRadius: '0.5rem',
                border: '2px solid white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <ExternalLink size={20} />
                View Full Portfolio
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Designer
