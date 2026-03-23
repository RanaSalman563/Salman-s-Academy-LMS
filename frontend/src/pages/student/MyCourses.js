import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { enrollmentService } from '../../services/courseService';

const MyCourses = () => {
  const location = useLocation();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enrollmentService.getMyCourses().then(r => setEnrollments(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const nav = [
    { to:'/student', ico:'📊', label:'Dashboard' },
    { to:'/student/my-courses', ico:'📚', label:'My Courses' },
    { to:'/student/profile', ico:'👤', label:'Profile' },
    { to:'/courses', ico:'🔍', label:'Browse Courses' },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="dash-sidebar">
        <div className="sidebar-label">Student Portal</div>
        {nav.map(n => (
          <Link key={n.to} to={n.to} className={`sidebar-item${location.pathname === n.to ? ' active' : ''}`}>
            <span className="s-ico">{n.ico}</span>{n.label}
          </Link>
        ))}
      </aside>

      <main className="dash-main">
        <div className="page-head">
          <div className="greeting">My Learning</div>
          <h2>My Courses</h2>
          <p>Track your progress across all enrolled courses</p>
        </div>

        {loading ? (
          <div className="spinner-lms"></div>
        ) : enrollments.length === 0 ? (
          <div className="content-card">
            <div className="empty-state">
              <div className="empty-ico">📚</div>
              <h5>No courses enrolled yet</h5>
              <p>Explore our catalog and enroll in your first course to get started</p>
              <Link to="/courses" className="btn-lms">Browse Courses</Link>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {enrollments.map(e => (
              <div key={e._id} className="col-lg-4 col-md-6">
                <div style={{ background:'var(--surface-0)', border:'1px solid var(--surface-2)', borderRadius:'var(--radius-md)', overflow:'hidden' }}>
                  <div style={{ height:140, background:'var(--surface-2)', overflow:'hidden', position:'relative' }}>
                    <img src={`https://picsum.photos/seed/${e.course?._id}/600/280`} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    <span style={{ position:'absolute', top:10, left:10 }} className={`badge-lms ${e.isCompleted ? 'badge-published' : 'badge-student'}`}>
                      {e.isCompleted ? '✅ Completed' : '⚡ In Progress'}
                    </span>
                  </div>
                  <div style={{ padding:18 }}>
                    <div style={{ fontSize:'0.7rem', fontWeight:700, color:'var(--brand-primary)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:6 }}>
                      {e.course?.category}
                    </div>
                    <div style={{ fontFamily:'Poppins, sans-serif', fontSize:'0.93rem', fontWeight:600, marginBottom:4 }}>{e.course?.title}</div>
                    <div style={{ fontSize:'0.78rem', color:'var(--ink-400)', marginBottom:14 }}>By {e.course?.instructor?.name}</div>
                    <div className="prog-labels"><span>Progress</span><strong>{e.progress}%</strong></div>
                    <div className="prog-bar" style={{ marginBottom:14 }}>
                      <div className={`prog-fill${e.isCompleted ? ' done' : ''}`} style={{ width:`${e.progress}%` }}></div>
                    </div>
                    <Link to={`/courses/${e.course?._id}`} className="btn-lms" style={{ width:'100%', justifyContent:'center', fontSize:'0.85rem' }}>
                      {e.isCompleted ? 'Review Course' : 'Continue Learning →'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
export default MyCourses;
