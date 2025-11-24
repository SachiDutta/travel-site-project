import React, { useState } from 'react';
import '../styles/Contact.css'; // use shared styles folder

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    // Check empty fields
    if (name === "" || email === "" || message === "") {
      alert("⚠ Please fill in all fields!");
      return;
    }

    // Check email format
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (!email.match(emailPattern)) {
      alert("⚠ Please enter a valid email address!");
      return;
    }

    // If everything is valid
    alert("✅ Thank you, " + name + "! Your message has been sent.");
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section className="contact-container">
      <h2>Contact Us</h2>
      <p className="subtitle">We'd love to hear from you! Reach out with any questions or feedback.</p>

      <div className="contact-wrapper">
        {/* Contact Form */}
        <div className="contact-form">
          <h3>Send us a message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter your name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                rows="5" 
                placeholder="Write your message..." 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p><i className="fa-solid fa-location-dot"></i> Chitkara University, Punjab</p>
          <p><i className="fa-solid fa-envelope"></i> support@tourfinity.com</p>
          <p><i className="fa-solid fa-phone"></i> +91 98765 43210</p>

          {/* Social Links */}
          <div className="social-links">
            <h3>Follow Us</h3>
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="https://www.instagram.com/tour.finity/"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;