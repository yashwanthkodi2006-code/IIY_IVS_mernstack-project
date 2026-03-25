import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">BlogVerse</span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          {user && (
            <>
              <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
              <Link to="/create" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>
                ✦ Write
              </Link>
            </>
          )}
        </div>

        {/* Auth */}
        <div className="navbar-auth">
          {user ? (
            <div className="user-menu">
              <Link to={`/profile/${user._id}`} className="user-avatar-btn">
                <div className="avatar-circle">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.username} />
                  ) : (
                    <span>{user.username[0].toUpperCase()}</span>
                  )}
                </div>
                <span className="username-text">{user.username}</span>
              </Link>
              <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '14px' }}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '14px' }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>Sign Up</Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="mobile-nav-link">Dashboard</Link>
              <Link to="/create" className="mobile-nav-link">Write Blog</Link>
              <Link to={`/profile/${user._id}`} className="mobile-nav-link">Profile</Link>
              <button onClick={handleLogout} className="mobile-nav-link" style={{ textAlign: 'left', background: 'none', border: 'none', color: '#f43f5e' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-nav-link">Login</Link>
              <Link to="/register" className="mobile-nav-link">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
