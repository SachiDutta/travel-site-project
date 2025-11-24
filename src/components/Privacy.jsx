import React from 'react';

const Privacy = () => {
  return (
    <div>
      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          background: #f9f9f9;
          color: #333;
        }
        .container {
          max-width: 900px;
          margin: 40px auto;
          background: #fff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        h1, h2 {
          color: #2563EB;
        }
        a {
          color: #2563EB;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        ul {
          padding-left: 20px;
        }
        li {
          margin-bottom: 8px;
        }
        p {
          margin-bottom: 16px;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            margin: 20px auto;
            padding: 20px;
          }
          
          h1 {
            font-size: 1.5rem;
          }
          
          h2 {
            font-size: 1.25rem;
          }
        }
      `}</style>

      <div className="container">
        <h1>Privacy Policy</h1>
        <p>Last updated: September 11, 2025</p>

        <p>At <strong>TOURFINITY</strong>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li>Personal details you provide (such as name, email, phone number when booking or contacting us).</li>
          <li>Usage data (pages visited, time spent, clicks).</li>
          <li>Cookies and tracking technologies to improve user experience.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We may use your information to:</p>
        <ul>
          <li>Provide and manage our booking services.</li>
          <li>Improve our website and customer experience.</li>
          <li>Send important updates, offers, or promotional material (if you opt-in).</li>
          <li>Comply with legal obligations.</li>
        </ul>

        <h2>3. Cookies</h2>
        <p>We use cookies to enhance your browsing experience. You can disable cookies in your browser settings, but some features may not work properly.</p>

        <h2>4. Sharing of Information</h2>
        <p>We do not sell your personal data. However, we may share information with trusted third-party partners (such as payment processors or analytics providers) to deliver our services.</p>

        <h2>5. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your data from unauthorized access, disclosure, alteration, or destruction.</p>

        <h2>6. Your Rights</h2>
        <p>You have the right to access, update, or request deletion of your personal data. Please contact us at <a href="mailto:info@tourfinity.com">info@tourfinity.com</a> for any privacy-related inquiries.</p>

        <h2>7. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised date.</p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <p>Email: <a href="mailto:tour.finity@website.com">info@tourfinity.com</a></p>
        <p>Phone: +91 1234567890</p>
      </div>
    </div>
  );
};

export default Privacy;