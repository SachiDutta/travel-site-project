import React, { useEffect, useRef } from 'react';

const About2 = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    // Animated counter for stats
    const animateCounter = (element, target) => {
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        // Format large numbers
        let displayValue;
        if (target >= 1000000) {
          displayValue = (current / 1000000).toFixed(1) + 'M+';
        } else if (target >= 1000) {
          displayValue = Math.floor(current / 1000) + 'K+';
        } else {
          displayValue = Math.floor(current);
        }
        element.textContent = displayValue;
      }, 16);
    };

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate stat numbers
          if (entry.target.classList.contains('stat-number')) {
            const target = parseInt(entry.target.dataset.count);
            animateCounter(entry.target, target);
            observerRef.current.unobserve(entry.target);
          }
          
          // Add reveal animation to cards
          if (entry.target.classList.contains('value-card') || 
              entry.target.classList.contains('feature-card') ||
              entry.target.classList.contains('intro-card')) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observerRef.current.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe stat numbers for counter animation
    document.querySelectorAll('.stat-number[data-count]').forEach(stat => {
      observerRef.current.observe(stat);
    });
    
    // Set initial state for cards and observe them
    document.querySelectorAll('.value-card, .feature-card, .intro-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observerRef.current.observe(card);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Data arrays
  const values = [
    {
      icon: '🎯',
      title: 'Simplicity First',
      description: 'We believe travel planning should be intuitive and enjoyable, not overwhelming. Every feature we build prioritizes user experience and clarity.'
    },
    {
      icon: '🔒',
      title: 'Trust & Security',
      description: 'Your safety and privacy are paramount. We implement industry-leading security measures to protect your personal information and transactions.'
    },
    {
      icon: '🌍',
      title: 'Global Accessibility',
      description: 'Travel should be for everyone, everywhere. We\'re committed to making our platform accessible and inclusive for travelers worldwide.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We continuously evolve our platform using cutting-edge technology to provide you with the best possible travel booking experience.'
    }
  ];

  const teamStats = [
    { number: '50+', label: 'Team Members' },
    { number: '15', label: 'Countries Represented' },
    { number: '100M+', label: 'Bookings Processed' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const missionPoints = [
    {
      number: '01',
      title: 'Empower Travelers',
      description: 'Give every traveler the tools and confidence to explore the world on their own terms.'
    },
    {
      number: '02',
      title: 'Support Communities',
      description: 'Partner with local businesses and communities to ensure tourism benefits everyone.'
    },
    {
      number: '03',
      title: 'Sustainable Travel',
      description: 'Promote responsible tourism practices that preserve destinations for future generations.'
    }
  ];

  return (
    <div>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #1f2937;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Page Hero */
        .page-hero {
          position: relative;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-background img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-overlay {
          position: relative;
          z-index: 2;
          background: rgba(0, 0, 0, 0.5);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .page-title {
          font-size: 60px;
          font-weight: 600;
          color: whitesmoke;
          text-align: left;  
          margin-bottom: 10px;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.9);
          text-align: left;
        }

        /* Story Section */
        .story-section {
          padding: 80px 0;
          background: #f8fafc;
        }

        .story-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .story-text h2 {
          font-size: 36px;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 32px;
          letter-spacing: -0.02em;
        }

        .story-text p {
          font-size: 16px;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .story-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
        }

        /* Values Section */
        .values-section {
          padding: 80px 0;
          background: white;
        }

        .section-title {
          font-size: 36px;
          font-weight: 700;
          color: #1e40af;
          text-align: center;
          margin-bottom: 64px;
          letter-spacing: -0.02em;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .value-card {
          background: #1e40af;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .value-card:hover {
          transform: translateY(-4px);
        }

        .value-icon {
          font-size: 40px;
          margin-bottom: 24px;
        }

        .value-card h3 {
          font-size: 20px;
          font-weight: 600;
          color: whitesmoke;
          margin-bottom: 16px;
        }

        .value-card p {
          color: whitesmoke;
          line-height: 1.6;
        }

        /* Team Section */
        .team-section {
          padding: 80px 0;
          background: #f8fafc;
        }

        .team-intro {
          text-align: center;
          font-size: 18px;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto 64px;
          line-height: 1.7;
        }

        .team-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
          margin-bottom: 64px;
        }

        .stat-item {
          text-align: center;
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
        }

        .stat-number {
          font-size: 36px;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .team-image {
          text-align: center;
        }

        .team-image img {
          width: 100%;
          max-width: 800px;
          height: 400px;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        /* Mission Section */
        .mission-section {
          padding: 80px 0;
          background: white;
        }

        .mission-content h2 {
          font-size: 36px;
          font-weight: 700;
          color: #1e40af;
          text-align: center;
          margin-bottom: 32px;
          letter-spacing: -0.02em;
        }

        .mission-statement {
          font-size: 20px;
          color: #374151;
          text-align: center;
          max-width: 800px;
          margin: 0 auto 64px;
          line-height: 1.7;
          font-weight: 500;
        }

        .mission-points {
          display: flex;
          flex-direction: column;
          gap: 32px;
          max-width: 800px;
          margin: 0 auto;
        }

        .mission-point {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          padding: 32px;
          background: #f8fafc;
          border-radius: 16px;
          border-left: 4px solid #1e40af;
        }

        .point-number {
          font-size: 24px;
          font-weight: 700;
          color: #1e40af;
          min-width: 40px;
        }

        .point-content h4 {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .point-content p {
          color: #6b7280;
          line-height: 1.6;
        }

        /* Footer */
        .footer {
          background: #1f2937;
          color: white;
          padding: 32px 0;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-links {
          display: flex;
          gap: 24px;
        }

        .footer-links a {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: white;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .story-content {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 16px;
          }
          
          .page-title {
            font-size: 36px;
          }
          
          .page-subtitle {
            font-size: 18px;
          }
          
          .section-title {
            font-size: 28px;
          }
          
          .story-text h2 {
            font-size: 28px;
          }
          
          .values-grid {
            grid-template-columns: 1fr;
          }
          
          .team-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          
          .footer-content {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 28px;
          }
          
          .section-title {
            font-size: 24px;
          }
          
          .team-stats {
            grid-template-columns: 1fr;
          }
          
          .value-card {
            padding: 24px;
          }
          
          .page-hero {
            height: 300px;
          }
        }
      `}</style>

      <main className="main-content">
        {/* Hero Section */}
        <section className="page-hero">
          <div className="hero-background">
            <img src="https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Team collaboration" />
          </div>
          <div className="hero-overlay">
            <div className="container">
              <h1 className="page-title">Who We Are</h1>
              <p className="page-subtitle">The passionate team behind your next adventure</p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <div className="container">
            <div className="story-content">
              <div className="story-text">
                <h2>Our Story</h2>
                <p>
                  Tourfinity was born from a simple yet powerful vision: to make travel accessible, enjoyable, and stress-free for everyone. Founded by a group of travel enthusiasts and technology experts, we understand the frustration of juggling multiple booking platforms, comparing endless options, and worrying about the reliability of your travel arrangements.
                </p>
                
                <p>
                  Our journey began when our founders, after years of experiencing the complexities of travel planning, decided to create something better. We envisioned a platform that would not only simplify the booking process but also inspire people to explore the world with confidence.
                </p>
              </div>
              <div className="story-image">
                <img src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Travel planning" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="container">
            <h2 className="section-title">Our Values</h2>
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="container">
            <h2 className="section-title">Our Team</h2>
            <p className="team-intro">
              We're a diverse group of travel lovers, tech innovators, and customer experience experts united by our passion for making travel better for everyone.
            </p>
            
            <div className="team-stats">
              {teamStats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="team-image">
              <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Diverse team working together" />
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="container">
            <div className="mission-content">
              <h2>Our Mission</h2>
              <p className="mission-statement">
                To democratize travel by providing a comprehensive, reliable, and user-friendly platform that connects travelers with their dream destinations while supporting local communities and sustainable tourism practices.
              </p>
              
              <div className="mission-points">
                {missionPoints.map((point, index) => (
                  <div key={index} className="mission-point">
                    <span className="point-number">{point.number}</span>
                    <div className="point-content">
                      <h4>{point.title}</h4>
                      <p>{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2025 Tourfinity. Your gateway to infinite travel possibilities.</p>
            <div className="footer-links">
              <a href="/">Home</a>
              <a href="/about">About Our Platform</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About2;