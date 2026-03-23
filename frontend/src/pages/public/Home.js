import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../../components/CourseCard';
import { courseService } from '../../services/courseService';

const FEATURES = [
  { icon: '🎯', title: 'Expert Instructors', desc: 'Learn from industry professionals with proven real-world experience.' },
  { icon: '⚡', title: 'Learn at Your Pace', desc: 'Access your courses anytime, anywhere, on any device.' },
  { icon: '🏆', title: 'Earn Certificates', desc: 'Get recognized with completion certificates for every course.' },
  { icon: '🌐', title: 'Global Community', desc: 'Join thousands of learners from all over the world.' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    courseService.getCourses({ limit: 3 }).then(r => setFeatured(r.data.courses)).catch(() => {});
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-lms">
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="hero-badge">🚀 Pakistan's Premier Learning Platform</div>
              <h1>Unlock Your <span className="highlight">Potential</span> Through Learning</h1>
              <p className="hero-desc">
                Discover hundreds of courses taught by industry experts. Gain skills that matter from web development to data science, design and beyond.
              </p>
              <div className="hero-actions">
                <Link to="/courses" className="btn-hero-primary">
                  Browse Courses <span>→</span>
                </Link>
                <Link to="/register" className="btn-hero-ghost">
                  Start Free Today
                </Link>
              </div>
              <div className="hero-stats">
                {[
                  { num: '10K+', label: 'Active Students' },
                  { num: '500+', label: 'Courses Available' },
                  { num: '200+', label: 'Expert Instructors' },
                ].map(s => (
                  <div key={s.label}>
                    <span className="hero-stat-num">{s.num}</span>
                    <span className="hero-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex justify-content-center">
              <div style={{ position:'relative', width:'100%', maxWidth:460, height:320 }}>
                {/* Floating cards */}
                <div style={{
                  position:'absolute', top:'10%', left:'5%',
                  background:'rgba(255,255,255,0.07)', backdropFilter:'blur(16px)',
                  border:'1px solid rgba(255,255,255,0.12)', borderRadius:'var(--radius-md)',
                  padding:'16px 20px', color:'white', minWidth:200,
                  animation:'float1 4s ease-in-out infinite'
                }}>
                  <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)', marginBottom:8, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px' }}>🔥 Trending Now</div>
                  <div style={{ fontSize:'0.9rem', fontWeight:600, marginBottom:4 }}>Full-Stack Development</div>
                  <div style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.6)' }}>👥 2,341 enrolled this week</div>
                </div>
                <div style={{
                  position:'absolute', bottom:'5%', right:'5%',
                  background:'rgba(255,255,255,0.07)', backdropFilter:'blur(16px)',
                  border:'1px solid rgba(255,255,255,0.12)', borderRadius:'var(--radius-md)',
                  padding:'16px 20px', color:'white',
                  animation:'float2 5s ease-in-out infinite'
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                    <div style={{ width:36, height:36, borderRadius:'50%', background:'var(--brand-primary)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem' }}>✅</div>
                    <div>
                      <div style={{ fontSize:'0.82rem', fontWeight:700 }}>Ahmed K. just completed</div>
                      <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.6)' }}>React Masterclass</div>
                    </div>
                  </div>
                  <div style={{ height:6, background:'rgba(255,255,255,0.1)', borderRadius:99, overflow:'hidden' }}>
                    <div style={{ width:'100%', height:'100%', background:'var(--brand-primary)', borderRadius:99 }}></div>
                  </div>
                </div>
                {/* Center decoration */}
                <div style={{
                  position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
                  width:180, height:180,
                  background:'rgba(255,107,53,0.1)', border:'1px solid rgba(255,107,53,0.2)',
                  borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'4rem'
                }}>🎓</div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        `}</style>
      </section>

      {/* ── STATS STRIP ── */}
      <div className="stats-strip">
        <div className="container">
          <div className="row">
            {[
              { num: '10,000+', label: 'Students Enrolled' },
              { num: '500+', label: 'Total Courses' },
              { num: '200+', label: 'Expert Instructors' },
              { num: '15+', label: 'Course Categories' },
            ].map(s => (
              <div key={s.label} className="col-6 col-md-3">
                <div className="stat-strip-item">
                  <span className="stat-strip-num">{s.num}</span>
                  <span className="stat-strip-label">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED COURSES ── */}
      {featured.length > 0 && (
        <section className="g-section">
          <div className="container">
            <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap gap-3">
              <div>
                <div className="section-eyebrow">Handpicked for you</div>
                <h2 className="section-title mb-2">Featured Courses</h2>
                <p className="section-subtitle">Start with our most popular and top rated courses</p>
              </div>
              <Link to="/courses" className="btn-lms-outline">View All Courses →</Link>
            </div>
            <div className="row g-4">
              {featured.map(c => (
                <div key={c._id} className="col-lg-4 col-md-6">
                  <CourseCard course={c} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURES ── */}
      <section className="g-section" style={{ background:'var(--surface-0)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-eyebrow">Why choose us</div>
            <h2 className="section-title">Everything You Need to Succeed</h2>
            <p className="section-subtitle mx-auto" style={{ maxWidth:440 }}>
              Built specifically for learners and educators in Pakistan and beyond
            </p>
          </div>
          <div className="row g-4">
            {FEATURES.map(f => (
              <div key={f.title} className="col-lg-3 col-md-6">
                <div className="feature-card">
                  <div className="feature-icon">{f.icon}</div>
                  <h5>{f.title}</h5>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="g-section-sm">
        <div className="container">
          <div className="cta-banner">
            <div className="row align-items-center g-4" style={{ position:'relative', zIndex:1 }}>
              <div className="col-lg-7">
                <h2>Ready to Start Your Learning Journey?</h2>
                <p className="mb-0">Join thousands of students already building their future on Salman's Academy LMS</p>
              </div>
              <div className="col-lg-5 d-flex gap-3 flex-wrap justify-content-lg-end">
                <Link to="/register" className="btn-hero-primary">Create Free Account</Link>
                <Link to="/courses" className="btn-hero-ghost">Browse Courses</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
