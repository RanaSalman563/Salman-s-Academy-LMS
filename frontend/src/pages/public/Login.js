import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      navigate(from || { admin:'/admin', instructor:'/instructor', student:'/student' }[user.role] || '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        {/* Left Panel */}
        <div className="auth-left">
          <Link to="/" className="auth-logo-link">
            <div className="auth-logo-icon">📚</div>
           Salman's Academy LMS
          </Link>
          <div className="auth-tagline">
            <h2>Welcome back to your learning journey</h2>
            <p>Sign in to continue where you left off and keep building your skills.</p>
            <ul className="auth-bullets">
              <li>Access all your enrolled courses</li>
              <li>Track your learning progress</li>
              <li>Connect with expert instructors</li>
              <li>Earn completion certificates</li>
            </ul>
          </div>
          <div style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.35)' }}>
            Salman's Academy LMS — MERN Stack Project
          </div>
        </div>

        {/* Right Panel */}
        <div className="auth-right">
          <h3>Sign In</h3>
          <p className="auth-sub">Enter your credentials to access your account</p>

          {error && <div className="alert-error">⚠️ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })} required />
            </div>
            <button type="submit" className="btn-submit-lms" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one free</Link>
          </p>

          <div className="demo-box">
            <div className="demo-box-title">Demo Accounts</div>
            <span>Admin: admin@lms.com / admin123</span>
            <span>Instructor: instructor@lms.com / pass123</span>
            <span>Student: student@lms.com / pass123</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
