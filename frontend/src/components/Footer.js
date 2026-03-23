import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer-lms">
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-4 col-md-6">
          <div className="footer-brand">
            <div className="footer-logo-icon">📚</div>
            Salman's Academy LMS
          </div>
          <p className="footer-desc">
            A modern, full-stack learning management system connecting passionate instructors with eager learners worldwide.
          </p>
        </div>
        <div className="col-lg-2 col-md-6 col-6">
          <div className="footer-col-head">Platform</div>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Browse Courses</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
        <div className="col-lg-2 col-md-6 col-6">
          <div className="footer-col-head">Account</div>
          <ul className="footer-links">
            <li><Link to="/login">Sign In</Link></li>
            <li><Link to="/register">Create Account</Link></li>
          </ul>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="footer-col-head">About This Project</div>
          <p style={{ fontSize:'0.85rem', lineHeight:'1.7' }}>
            Built as a MERN stack academic project demonstrating full-stack development with React 18, Node.js, Express, and MongoDB. Featuring JWT auth, role-based access control, and RESTful APIs.
          </p>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:8 }}>
            {['React 18','Node.js','MongoDB','Express'].map(t => (
              <span key={t} style={{ fontSize:'0.72rem', fontWeight:700, padding:'4px 10px', borderRadius:'var(--radius-pill)', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.6)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Salman's 
          Academy LMS. All rights reserved.</span>
        <span className="tech-badge">⚡ Built with MERN Stack</span>
      </div>
    </div>
  </footer>
);
export default Footer;
