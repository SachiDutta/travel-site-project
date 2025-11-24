import React, { useEffect, useRef } from 'react';

const About = () => {
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

  // Feature data
  const features = [
    {
      icon: 'world.png',
      title: 'Flight Booking',
      description: 'Search and compare flights from hundreds of airlines worldwide. Real-time pricing, seat selection, and instant booking confirmation.'
    },
    {
      icon: 'hotel.png',
      title: 'Hotel Reservations',
      description: 'Find the perfect accommodation from budget-friendly stays to luxury resorts. Detailed reviews, photos, and flexible booking options.'
    },
    {
      icon: 'package.png',
      title: 'Holiday Packages',
      description: 'Curated travel packages combining flights, hotels, and experiences. Perfect for those seeking hassle-free vacation planning.'
    },
    {
      icon: 'payment-protection.png',
      title: 'Secure Payments',
      description: 'Industry-leading security with encrypted transactions, multiple payment methods, and fraud protection for peace of mind.'
    },
    {
      icon: 'mobile-application.png',
      title: 'Mobile Optimized',
      description: 'Fully responsive design that works seamlessly across all devices. Book your next trip from anywhere, anytime.'
    },
    {
      icon: 'real-time-strategy.png',
      title: 'Real-time Updates',
      description: 'Live flight status, weather updates, and instant notifications to keep you informed throughout your journey.'
    }
  ];

  const techFeatures = [
    {
      title: 'Real-time Data Processing',
      description: 'Instant access to live flight schedules, pricing, and availability'
    },
    {
      title: 'Advanced Security',
      description: 'Bank-level encryption and secure authentication protocols'
    },
    {
      title: 'Smart Recommendations',
      description: 'AI-powered suggestions based on your preferences and travel history'
    }
  ];

  const timelineItems = [
    {
      number: '1',
      title: 'Discover',
      description: 'Explore destinations, compare options, and get inspired by our curated travel recommendations tailored to your interests.'
    },
    {
      number: '2',
      title: 'Plan',
      description: 'Use our intuitive tools to build your perfect itinerary, from flights and accommodations to local experiences and activities.'
    },
    {
      number: '3',
      title: 'Book',
      description: 'Secure your reservations with confidence using our protected booking system and flexible cancellation policies.'
    },
    {
      number: '4',
      title: 'Travel',
      description: 'Enjoy your journey with our mobile app, real-time updates, and 24/7 customer support whenever you need assistance.'
    }
  ];

  const commitmentItems = [
    'Best price guarantee on all bookings',
    '24/7 customer support in multiple languages',
    'Flexible cancellation and modification policies',
    'Sustainable travel options and carbon offset programs'
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

        /* Platform Intro */
        .platform-intro {
          padding: 80px 0;
          background: white;
        }

        .platform-intro .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .intro-content h2 {
          font-size: 36px;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .intro-text {
          font-size: 18px;
          color: #6b7280;
          line-height: 1.7;
        }

        .platform-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
        }

        /* Features Section */
        .features-section {
          padding: 80px 0;
          background: #f8fafc;
        }

        .section-title {
          font-size: 36px;
          font-weight: 700;
          color: #1e40af;
          text-align: center;
          margin-bottom: 64px;
          letter-spacing: -0.02em;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 32px;
        }

        .feature-card {
          background: #1e40af;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.05);
          color: white;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .feature-card:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
        }

        .feature-card:active {
          transform: scale(0.95);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
        }

        .feature-icon {
          margin-bottom: 20px;
        }

        .feature-card h3 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .feature-card p {
          color: #f8fafc;
          line-height: 1.6;
        }

        /* Technology Section */
        .technology-section {
          padding: 80px 0;
          background: white;
        }

        .tech-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .tech-text h2 {
          font-size: 36px;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .tech-text > p {
          font-size: 16px;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .tech-features {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .tech-feature {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .tech-bullet {
          color: #1e40af;
          font-weight: 700;
          font-size: 20px;
          min-width: 8px;
        }

        .tech-feature strong {
          color: #1f2937;
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }

        .tech-feature p {
          color: #6b7280;
          font-size: 14px;
          line-height: 1.5;
        }

        .tech-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
        }

        /* Experience Section */
        .experience-section {
          padding: 80px 0;
          background: #f8fafc;
        }

        .experience-timeline {
          max-width: 800px;
          margin: 0 auto;
        }

        .timeline-item {
          display: flex;
          align-items: flex-start;
          gap: 32px;
          margin-bottom: 48px;
          position: relative;
        }

        .timeline-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 23px;
          top: 48px;
          width: 2px;
          height: 48px;
          background: #e5e7eb;
        }

        .timeline-number {
          width: 48px;
          height: 48px;
          background: #1e40af;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          flex-shrink: 0;
        }

        .timeline-content h3 {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 12px;
        }

        .timeline-content p {
          color: #6b7280;
          line-height: 1.6;
        }

        /* Commitment Section */
        .commitment-section {
          padding: 80px 0;
          background: white;
        }

        .commitment-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .commitment-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
        }

        .commitment-text h2 {
          font-size: 36px;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .commitment-text > p {
          font-size: 16px;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .commitment-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .commitment-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .checkmark {
          width: 24px;
          height: 24px;
          background: #10b981;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .commitment-item span:last-child {
          color: #374151;
          font-weight: 500;
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
          .platform-intro .container,
          .tech-content,
          .commitment-content {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          
          .commitment-content {
            grid-template-columns: 1fr;
          }
          
          .commitment-image {
            order: -1;
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
          
          .intro-content h2,
          .tech-text h2,
          .commitment-text h2 {
            font-size: 28px;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .footer-content {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
          
          .timeline-item {
            gap: 20px;
          }
          
          .timeline-number {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }
          
          .timeline-item:not(:last-child)::after {
            left: 19px;
            top: 40px;
            height: 40px;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 28px;
          }
          
          .section-title {
            font-size: 24px;
          }
          
          .feature-card {
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
            <img src="https://images.squarespace-cdn.com/content/v1/5ab27899cef372f7e5a64015/1521645777123-AUXM4FTED7W9AJWJY6X7/AdobeStock_50819585.jpg?format=2500w" alt="Modern technology and travel" />
          </div>
          <div className="hero-overlay">
            <div className="container">
              <h1 className="page-title">About Us</h1>
              <p className="page-subtitle">Discover, travel, and explore without limits</p>
            </div>
          </div>
        </section>

        {/* Platform Intro */}
        <section className="platform-intro">
          <div className="container">
            <div className="intro-content">
              <h2>The Complete Travel Solution</h2>
              <p className="intro-text">
                Tourfinity is a modern travel booking web application that offers users a seamless experience to explore, search, and book flights, hotels, and holiday packages - all in one place. We combine real-time data handling, secure authentication, and a clean, responsive design to deliver an interactive and user-friendly travel solution.
              </p>
            </div>
            <div className="platform-image">
              <img src="https://images.unsplash.com/photo-1747276737245-b10e95175577?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI3fHx8ZW58MHx8fHx8" alt="Travel platform interface" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Platform Features</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <img src={feature.icon} alt="" style={{ width: '40px', height: 'auto' }} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="technology-section">
          <div className="container">
            <div className="tech-content">
              <div className="tech-text">
                <h2>Built with Modern Technology</h2>
                <p>
                  Our platform leverages cutting-edge technology to ensure reliability, speed, and security. From our robust backend infrastructure to our intuitive user interface, every component is designed for optimal performance.
                </p>
                
                <div className="tech-features">
                  {techFeatures.map((tech, index) => (
                    <div key={index} className="tech-feature">
                      <span className="tech-bullet">•</span>
                      <div>
                        <strong>{tech.title}</strong>
                        <p>{tech.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tech-image">
                <img src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Modern technology interface" />
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="experience-section">
          <div className="container">
            <h2 className="section-title">The Tourfinity Experience</h2>
            <div className="experience-timeline">
              {timelineItems.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-number">{item.number}</div>
                  <div className="timeline-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="commitment-section">
          <div className="container">
            <div className="commitment-content">
              <div className="commitment-image">
                <img src="https://images.pexels.com/photos/1591382/pexels-photo-1591382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sustainable travel" />
              </div>
              <div className="commitment-text">
                <h2>Our Commitment To You</h2>
                <p>
                  Whether you're planning a weekend getaway or a cross-country adventure, Tourfinity is your gateway to infinite travel possibilities. We're not just a booking platform – we're your travel partner, committed to making every journey memorable.
                </p>
                
                <div className="commitment-list">
                  {commitmentItems.map((item, index) => (
                    <div key={index} className="commitment-item">
                      <span className="checkmark">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
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
              <a href="/about">Who We Are</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;