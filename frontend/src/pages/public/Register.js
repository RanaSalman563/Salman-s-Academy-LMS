import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name:'', email:'', password:'', confirmPassword:'', role:'student' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const u = (f, v) => setFormData({ ...formData, [f]: v });

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match.');
    if (formData.password.length < 6) return setError('Password must be at least 6 characters.');
    setLoading(true);
    try {
      const user = await register(formData.name, formData.email, formData.password, formData.role);
      navigate({ student:'/student', instructor:'/instructor' }[user.role] || '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-split" style={{ minHeight: 640 }}>
        <div className="auth-left">
          <Link to="/" className="auth-logo-link">
            <div className="auth-logo-icon">📚</div>
           Salman's Academy LMS
          </Link>
          <div className="auth-tagline">
            <h2>Start your learning journey today</h2>
            <p>Create your free account and unlock access to hundreds of expert led courses.</p>
            <ul className="auth-bullets">
              <li>Free to get started, no credit card required</li>
              <li>Learn from 200+ expert instructors</li>
              <li>500+ courses across all skill levels</li>
              <li>Track progress and earn certificates</li>
            </ul>
          </div>
          <div style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.35)' }}>Salman's Academy LMS  MERN Stack Project</div>
        </div>

        <div className="auth-right" style={{ justifyContent:'flex-start', paddingTop:40 }}>
          <h3>Create Account</h3>
          <p className="auth-sub">Join thousands of learners already on the platform</p>

          {error && <div className="alert-error">⚠️ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Full Name</label>
              <input placeholder="Your full name" value={formData.name} onChange={e => u('name', e.target.value)} required />
            </div>
            <div className="form-field">
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" value={formData.email} onChange={e => u('email', e.target.value)} required />
            </div>
            <div className="form-field">
              <label>I am joining as</label>
              <select value={formData.role} onChange={e => u('role', e.target.value)}>
                <option value="student">Student   I want to learn</option>
                <option value="instructor">Instructor   I want to teach</option>
              </select>
            </div>
            <div className="row g-3">
              <div className="col-6">
                <div className="form-field" style={{ marginBottom:0 }}>
                  <label>Password</label>
                  <input type="password" placeholder="Min. 6 characters" value={formData.password} onChange={e => u('password', e.target.value)} required />
                </div>
              </div>
              <div className="col-6">
                <div className="form-field" style={{ marginBottom:0 }}>
                  <label>Confirm Password</label>
                  <input type="password" placeholder="Repeat password" value={formData.confirmPassword} onChange={e => u('confirmPassword', e.target.value)} required />
                </div>
              </div>
            </div>
            <button type="submit" className="btn-submit-lms" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Free Account →'}
            </button>
          </form>

          <p className="auth-switch">Already have an account? <Link to="/login">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
};
export default Register;
