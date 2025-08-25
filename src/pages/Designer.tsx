
import React from 'react'
import { Palette, Lightbulb, Award, Star } from 'lucide-react'

const Designer: React.FC = () => {
  const designProjects = [
    {
      id: 1,
      title: 'University T-Shirt Collection',
      description: 'Modern and comfortable apparel designs featuring the university logo',
      image: 'https://images.pexels.com/photos/5866728/pexels-photo-5866728.jpeg',
      category: 'Apparel'
    },
    {
      id: 2,
      title: 'Ergonomic Study Furniture',
      description: 'Functional and stylish furniture designed for optimal studying experience',
      image: 'https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg',
      category: 'Furniture'
    },
    {
      id: 3,
      title: 'Campus Event Accessories',
      description: 'Custom promotional items and accessories for university events',
      image: 'https://images.pexels.com/photos/6195121/pexels-photo-6195121.jpeg',
      category: 'Accessories'
    },
    {
      id: 4,
      title: 'Outdoor Activity Gear',
      description: 'Durable and practical gear for outdoor university activities',
      image: 'https://images.pexels.com/photos/6551065/pexels-photo-6551065.jpeg',
      category: 'Outdoor'
    }
  ]

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
          Design Studio
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
          Where creativity meets functionality. Our design team crafts unique products 
          that embody the spirit and values of our university community.
        </p>
      </section>

      {/* Designer Profile */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="card" style={{ padding: '3rem' }}>
          <div className="grid lg:grid-cols-3" style={{ gap: '3rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '10rem',
                height: '10rem',
                backgroundColor: '#e5e7eb',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                color: '#6b7280',
                backgroundImage: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white'
              }}>
                🎨
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                Alex Thompson
              </h2>
              <p style={{ color: '#3b82f6', fontSize: '1rem', fontWeight: '500' }}>
                Lead Product Designer
              </p>
            </div>
            
            <div style={{ gridColumn: 'span 2' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                About the Designer
              </h3>
              <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                With over 10 years of experience in product design and a Master's degree in Industrial Design, 
                Alex brings creativity and innovation to every project. Specializing in user-centered design 
                and sustainable materials, Alex ensures that every product not only looks great but serves 
                its purpose effectively.
              </p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={20} style={{ color: '#f59e0b' }} />
                  <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Design Excellence Award 2023</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={20} style={{ color: '#f59e0b' }} />
                  <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>50+ Products Designed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            Design Philosophy
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            Our approach to creating meaningful and impactful designs
          </p>
        </div>

        <div className="grid md:grid-cols-3" style={{ gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              backgroundColor: '#3b82f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: 'white'
            }}>
              <Palette size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              Creative Vision
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Every design starts with a creative spark. We explore bold ideas and innovative 
              solutions that push boundaries while staying true to the university's identity.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: 'white'
            }}>
              <Lightbulb size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              User-Centered
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Understanding our community's needs is paramount. We design with the end-user 
              in mind, ensuring functionality matches beauty.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              backgroundColor: '#8b5cf6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: 'white'
            }}>
              <Award size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              Quality Focus
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.5 }}>
              We never compromise on quality. From material selection to final production, 
              every step is carefully monitored to ensure excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            Featured Projects
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            A showcase of our latest design achievements
          </p>
        </div>

        <div className="grid md:grid-cols-2" style={{ gap: '2rem' }}>
          {designProjects.map((project) => (
            <div key={project.id} className="card" style={{ overflow: 'hidden' }}>
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: '#e0f2fe',
                  color: '#0277bd',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  marginBottom: '1rem'
                }}>
                  {project.category}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1f2937' }}>
                  {project.title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ marginTop: '4rem', textAlign: 'center' }}>
        <div className="card" style={{ 
          padding: '3rem', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>
            Have a Design Idea?
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
            We'd love to collaborate with you on your next project. 
            Let's create something amazing together!
          </p>
          <button className="btn" style={{
            backgroundColor: 'white',
            color: '#667eea',
            padding: '1rem 2rem',
            fontSize: '1rem',
            fontWeight: '600'
          }}>
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  )
}

export default Designer
