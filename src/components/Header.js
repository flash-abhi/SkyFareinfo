import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, Menu, X } from 'lucide-react';
import { useContact, useSiteSettings } from '../context/ContactContext';
import Logo from './Logo';
import './Header.css';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { contactSettings } = useContact();
  const { siteSettings } = useSiteSettings();
  const headerColors = siteSettings.colors || {};

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header" style={{ background: headerColors.headerBg || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: headerColors.headerText || '#ffffff' }}>
      <div className="header-container">
        {/* Left Section - Logo */}
        <div className="header-left">
          <Link to="/" className="logo-link">
            <Logo />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Center Section - Navigation */}
        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMobileMenu}>Home</Link>
          <Link to="/flights" className="nav-link" onClick={closeMobileMenu}>Flights</Link>
          <Link to="/hotels" className="nav-link" onClick={closeMobileMenu}>Hotels</Link>
          <Link to="/cruises" className="nav-link" onClick={closeMobileMenu}>Cruises</Link>
          <Link to="/packages" className="nav-link" onClick={closeMobileMenu}>Packages</Link>
          <Link to="/airlines" className="nav-link" onClick={closeMobileMenu}>Airlines</Link>
        </nav>

        {/* Right Section - Call & Actions */}
        <div className="header-right">
          <div className="support-badge">
            <Clock size={14} />
            <span>24/7 Support</span>
          </div>
          
          <div className="agent-contact">
            <div className="agent-avatar">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" fill="#fff"/>
                <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="11" stroke="#fff" strokeWidth="0.5" opacity="0.3"/>
              </svg>
            </div>
            <a href={`tel:${contactSettings.tfn.replace(/[^0-9+]/g, '')}`} className="call-button" title="Click to call">
              <Phone size={18} />
              <div className="call-info">
                <span className="call-label">Call Us Now</span>
                <span className="phone-number">{contactSettings.tfn}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
