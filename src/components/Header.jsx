import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo7 from '../assets/images/logo-7.png';

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('tourfinity_user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      setUser(null);
    }
  }, []);

  const activeClass = ({ isActive }) => (isActive ? 'active-link' : '');

  const handleLogout = () => {
    localStorage.removeItem('tourfinity_user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/">
          <img src={logo7} alt="Tourfinity logo" />
          Tourfinity
        </Link>
      </div>
      <nav className="main-nav">
        <NavLink to="/" className={activeClass} end>Home</NavLink>
        <NavLink to="/bookings" className={activeClass}>Bookings</NavLink>
        <NavLink to="/destinations" className={activeClass}>Destinations</NavLink>
        <NavLink to="/flights" className={activeClass}>Flights</NavLink>
        <NavLink to="/contact" className={activeClass}>Contact</NavLink>
        {!user ? (
          <NavLink to="/login" className={activeClass}>Account</NavLink>
        ) : (
          <>
            <span className="nav-user">Hi, {user.name || user.email}</span>
            <button className="nav-logout" onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}
