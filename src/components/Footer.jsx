import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-col">
            <h4>About</h4>
            <ul>
              <li><Link to="/about2">Who are we</Link></li>
              <li><Link to="/about">About the site</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Help</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-info">
          <div className="info-box">
            <h5>Why TourInfinity?</h5>
            <p>Founded with a vision to make travel more accessible, TourInfinity offers unbeatable deals and a seamless booking experience.</p>
          </div>
        </div>
      </div>

      {/* Full-bleed bottom strip */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div className="social-links">
            <a href="https://www.instagram.com/tour.finity/" target="_blank" rel="noreferrer" aria-label="Instagram">
              {/* Instagram SVG */}
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 3.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm4.8-.8a.9.9 0 11-1.8 0 .9.9 0 011.8 0z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              {/* Facebook SVG */}
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 10-11.5 9.9v-7H8.5v-3h2V9.1c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              {/* Twitter SVG */}
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 5.9c-.6.3-1.2.5-1.9.6.7-.4 1.2-1.1 1.4-1.9-.6.4-1.3.7-2.1.9C18.9 4.6 18 4 17 4c-1.8 0-3.2 1.5-3.2 3.3 0 .3 0 .6.1.9C10.1 8 6.1 6 3.4 3.1c-.3.6-.5 1.2-.5 1.9 0 1.1.6 2 1.6 2.6-.5 0-1-.2-1.5-.4v.1c0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.2 1.6 2 3 2-1.1.9-2.4 1.4-3.9 1.4H6c1.4.9 3 1.5 4.7 1.5 5.6 0 8.6-4.7 8.6-8.8v-.4c.6-.4 1-1 1.3-1.7-.6.3-1.2.5-1.9.6z"/></svg>
            </a>
            <a href="mailto:support@tourfinity.com" aria-label="Email">
              {/* Mail SVG */}
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </a>
          </div>
          <p>© 2025 TourInfinity Pvt. Ltd. | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
