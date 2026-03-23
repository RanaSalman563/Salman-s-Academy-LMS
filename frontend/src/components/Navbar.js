import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropRef = useRef(null);

  const handleLogout = () => { logout(); navigate('/'); setMenuOpen(false); };
  const getDashLink = () => ({ admin: '/admin', instructor: '/instructor', student: '/student' }[user?.role] || '/');
  const isActive = (path) => location.pathname === path;
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  useEffect(() => {
    const h = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <nav className="navbar-lms">
  <div className="container" style={{ display:'flex', alignItems:'center', height:'68px', position:'relative' }}>
    <Link to="/" className="navbar-brand me-4">
      <div className="brand-logo">📚</div>
      <span className="brand-name">Salman's Academy<span> LMS</span></span>
    </Link>
        <div className="d-none d-lg-flex align-items-center gap-1 me-auto">
          <Link to="/" className={`nav-link${isActive('/') ? ' active-nav' : ''}`}>Home</Link>
          <Link to="/courses" className={`nav-link${isActive('/courses') ? ' active-nav' : ''}`}>Courses</Link>
          <Link to="/about" className={`nav-link${isActive('/about') ? ' active-nav' : ''}`}>About</Link>
        </div>

        <div className="d-none d-lg-flex align-items-center gap-2 ms-auto">
          {user ? (
            <div ref={dropRef} style={{ position:'relative' }}>
              <button className="user-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                <div className="user-avatar-sm">{initials}</div>
                <span>{user.name.split(' ')[0]}</span>
                <span style={{ fontSize:'0.7rem', color:'var(--ink-300)' }}>▾</span>
              </button>
              {menuOpen && (
                <div style={{ position:'absolute', top:'110%', right:0, background:'var(--surface-0)', border:'1px solid var(--surface-3)', borderRadius:'var(--radius-md)', boxShadow:'var(--shadow-lg)', minWidth:200, zIndex:9999, padding:'8px 0' }}>
                  <div style={{ padding:'10px 16px', borderBottom:'1px solid var(--surface-2)' }}>
                    <div style={{ fontSize:'0.875rem', fontWeight:700, color:'var(--ink-900)' }}>{user.name}</div>
                    <div style={{ fontSize:'0.75rem', color:'var(--ink-400)' }}>{user.email}</div>
                  </div>
                  <Link to={getDashLink()} className="dd-item" onClick={() => setMenuOpen(false)}>📊 Dashboard</Link>
                  {user.role === 'student' && <>
                    <Link to="/student/my-courses" className="dd-item" onClick={() => setMenuOpen(false)}>📚 My Courses</Link>
                    <Link to="/student/profile" className="dd-item" onClick={() => setMenuOpen(false)}>👤 Profile</Link>
                  </>}
                  {user.role === 'instructor' && <Link to="/instructor/create-course" className="dd-item" onClick={() => setMenuOpen(false)}>➕ Create Course</Link>}
                  <div style={{ borderTop:'1px solid var(--surface-2)', marginTop:4, paddingTop:4 }}>
                    <button className="dd-item" style={{ color:'var(--danger)', width:'100%', textAlign:'left' }} onClick={handleLogout}>🚪 Sign Out</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-nav-login">Sign In</Link>
              <Link to="/register" className="btn-nav-cta">Get Started</Link>
            </>
          )}
        </div>

        <button className="d-lg-none ms-auto" style={{ border:'none', background:'none', fontSize:'1.4rem', cursor:'pointer', padding:'8px' }} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {mobileOpen && (
        <div style={{ background:'var(--surface-0)', borderTop:'1px solid var(--surface-2)', padding:'16px', position:'absolute', top:'68px', left:0, right:0, zIndex:999, boxShadow:'var(--shadow-md)' }}>
          {['/', '/courses', '/about'].map((p, i) => (
            <Link key={p} to={p} style={{ display:'block', padding:'12px 8px', fontSize:'0.95rem', fontWeight:500, color:'var(--ink-700)', textDecoration:'none', borderBottom:'1px solid var(--surface-2)' }} onClick={() => setMobileOpen(false)}>
              {['Home','Courses','About'][i]}
            </Link>
          ))}
          {user ? (
            <>
              <Link to={getDashLink()} style={{ display:'block', padding:'12px 8px', fontSize:'0.95rem', fontWeight:500, color:'var(--ink-700)', textDecoration:'none', borderBottom:'1px solid var(--surface-2)' }} onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} style={{ border:'none', background:'none', padding:'12px 8px', width:'100%', textAlign:'left', fontSize:'0.95rem', color:'var(--danger)', cursor:'pointer' }}>Sign Out</button>
            </>
          ) : (
            <div style={{ display:'flex', gap:8, marginTop:12 }}>
              <Link to="/login" className="btn-nav-login" style={{ flex:1, textAlign:'center' }} onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link to="/register" className="btn-nav-cta" style={{ flex:1, textAlign:'center', justifyContent:'center' }} onClick={() => setMobileOpen(false)}>Register</Link>
            </div>
          )}
        </div>
      )}
      <style>{`.dd-item{display:block;padding:9px 16px;font-size:.875rem;font-weight:500;color:var(--ink-700);text-decoration:none;transition:background .15s;background:none;border:none;cursor:pointer;width:100%;text-align:left}.dd-item:hover{background:var(--surface-1);color:var(--ink-900)}`}</style>
    </nav>
  );
};
export default Navbar;
