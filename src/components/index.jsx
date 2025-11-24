import React, { useState } from "react";
import { Link } from "react-router-dom";


// Import your assets (these live in src/assets/images)
import logo7 from "../assets/images/logo-7.png";
import shore3 from "../assets/images/shore3.mp4";
import paris from "../assets/images/paris.jpg";
import japan from "../assets/images/japan.jpg";
import ladakh from "../assets/images/Ladakh.jpg";
import bali from "../assets/images/bali.jpg";
import la from "../assets/images/la.jpg";

function Index() {
  const [activeTab, setActiveTab] = useState('');
  return (
    <>
      <video autoPlay muted loop playsInline className="bg-video">
        <source src={shore3} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Infinite Journeys, One Destination</h1>
          <p>
            Discover amazing destinations and unforgettable experiences with
            Tourfinity. Your next adventure starts here.
          </p>
          <Link to="/destinations" className="btnn">
            Explore your Travels
          </Link>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking-section" className="booking-section">
        <div className="container">
          <div className="booking-intro">
            <h2>Book Your Trip Now!</h2>
            <p className="text-white/90">
              Find the perfect travel experience with our comprehensive booking
              platform
            </p>
          </div>

          {/* Booking widget, tabs and forms (uses same classes as booking stylesheet) */}
          <div className="booking-widget">
            <div className="booking-tabs" role="tablist">
              <button
                role="tab"
                className="tab-btn active"
                onClick={(e) => { e.preventDefault(); setActiveTab('flights'); }}
              >
                Flights
              </button>
              <button
                role="tab"
                className="tab-btn"
                onClick={(e) => { e.preventDefault(); setActiveTab('hotels'); }}
              >
                Hotels
              </button>
              <button
                role="tab"
                className="tab-btn"
                onClick={(e) => { e.preventDefault(); setActiveTab('buses'); }}
              >
                Buses
              </button>
            </div>

            <div className={`booking-form ${activeTab === 'flights' ? 'active' : ''}`} id="flights">
              <div className="form-grid">
                <div className="form-group">
                  <label>From</label>
                  <div className="input-wrapper">
                    <input className="form-input" type="text" placeholder="From" />
                  </div>
                </div>
                <div className="form-group">
                  <label>To</label>
                  <div className="input-wrapper">
                    <input className="form-input" type="text" placeholder="To" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Departure</label>
                  <div className="input-wrapper">
                    <input className="form-input" type="date" />
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button className="btn btn-search" onClick={(e) => { e.preventDefault(); alert('Searching flights...'); }}>
                  <i className="fas fa-search" /> Search Flights
                </button>
              </div>
            </div>

            <div className={`booking-form ${activeTab === 'hotels' ? 'active' : ''}`} id="hotels">
              <div className="form-grid">
                <div className="form-group">
                  <label>Destination</label>
                  <div className="input-wrapper">
                    <input className="form-input" type="text" placeholder="Destination" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Check-in</label>
                  <div className="input-wrapper">
                    <input className="form-input" type="date" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Check-out</label>
                  <div className="input-wrapper">
                    <input className="form-input" type="date" />
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button className="btn btn-search" onClick={(e) => { e.preventDefault(); alert('Searching hotels...'); }}>
                  <i className="fas fa-search" /> Search Hotels
                </button>
              </div>
            </div>

            <div className={`booking-form ${activeTab === 'buses' ? 'active' : ''}`} id="buses">
              <div className="form-grid">
                <div className="form-group">
                  <label>From</label>
                  <div className="input-wrapper">
                    <input className="form-input" type="text" placeholder="From" />
                  </div>
                </div>
                <div className="form-group">
                  <label>To</label>
                  <div className="input-wrapper">
                    <input className="form-input" type="text" placeholder="To" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Departure</label>
                  <div className="input-wrapper">
                    <input className="form-input" type="date" />
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button className="btn btn-search" onClick={(e) => { e.preventDefault(); alert('Searching buses...'); }}>
                  <i className="fas fa-search" /> Search Buses
                </button>
              </div>
            </div>
          </div>


          {/* Promo banner */}
          <div className="promo-banner limited-offer">
            <div className="promo-text">
              <h3>⏳ Limited Time: Book Before Sept 10th</h3>
              <ul>
                <li>✨ Flat 20% off on Domestic Flights*</li>
                <li>🏨 35% off on Hotels</li>
                <li>🚌 15% off on Buses</li>
              </ul>
              <p className="note">*Offer valid only till Sept 10th</p>
            </div>
            <div className="promo-timer">
              <h4>Hurry! Offer Ends In:</h4>
              <div id="countdown"></div>
              <Link to="/bookings" className="book-btn">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations-showcase" className="destinations-showcase">
        <div className="container">
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle">
            Explore our top picks for your next adventure
          </p>

          <div className="destinations-row">
            <div className="destination-item">
              <img src={paris} alt="Paris" />
              <span className="destination-label">Eiffel Tower Paris</span>
            </div>
            <div className="destination-item">
              <img src={japan} alt="Japan" />
              <span className="destination-label">Mount Fuji Japan</span>
            </div>
            <div className="destination-item">
              <img src={ladakh} alt="India" />
              <span className="destination-label">Ladakh India</span>
            </div>
            <div className="destination-item">
              <img src={bali} alt="Thailand" />
              <span className="destination-label">Bali Thailand</span>
            </div>
            <div className="destination-item">
              <img src={la} alt="USA" />
              <span className="destination-label">LA USA</span>
            </div>
          </div>

          <div className="explore-more">
            <Link to="/destinations" className="btn-explore">
              Explore More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer is rendered by shared Footer component */}
    </>
  );
}

export default Index;
