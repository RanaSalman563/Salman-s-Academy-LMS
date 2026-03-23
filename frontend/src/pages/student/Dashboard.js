import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { enrollmentService } from '../../services/courseService';

const StudentDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    enrollmentService.getMyCourses().then(r => setEnrollments(r.data)).catch(() => {});
  }, []);

  const completed = enrollments.filter(e => e.isCompleted).length;
  const inProgress = enrollments.filter(e => !e.isCompleted && e.progress > 0).length;
  const initials = user?.name?.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() || 'S';

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
          <div className="greeting">Student Dashboard</div>
          <h2>Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
          <p>Here's your learning overview for today</p>
        </div>

        {/* Stats */}
        <div className="row g-4 mb-4">
          {[
            { label:'Total Enrolled', val: enrollments.length, cls:'stat-indigo', ico:'📚' },
            { label:'In Progress', val: inProgress, cls:'stat-orange', ico:'⚡' },
            { label:'Completed', val: completed, cls:'stat-green', ico:'🏆' },
          ].map(s => (
            <div key={s.label} className="col-md-4">
              <div className={`stat-card-lms ${s.cls}`}>
                <div className="stat-icon">{s.ico}</div>
                <span className="stat-val">{s.val}</span>
                <span className="stat-lbl">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Courses */}
        <div className="content-card">
          <div className="content-card-head">
            <h5>Recent Courses</h5>
            <Link to="/student/my-courses" className="btn-lms-outline" style={{ fontSize:'0.8rem', padding:'6px 14px' }}>View All</Link>
          </div>
          <div className="content-card-body">
            {enrollments.length === 0 ? (
              <div className="empty-state" style={{ padding:'40px 20px' }}>
                <div className="empty-ico">📚</div>
                <h5>No courses yet</h5>
                <p>Start your learning journey by browsing our course catalog</p>
                <Link to="/courses" className="btn-lms">Browse Courses</Link>
              </div>
            ) : (
              <div className="row g-3">
                {enrollments.slice(0, 3).map(e => (
                  <div key={e._id} className="col-md-4">
                    <div className="prog-course-card">
                      <div className="pcn">{e.course?.title}</div>
                      <div className="pci">By {e.course?.instructor?.name}</div>
                      <div className="prog-labels">
                        <span>Progress</span>
                        <strong>{e.progress}%</strong>
                      </div>
                      <div className="prog-bar">
                        <div className={`prog-fill${e.isCompleted ? ' done' : ''}`} style={{ width:`${e.progress}%` }}></div>
                      </div>
                      <div style={{ marginTop:12 }}>
                        <Link to={`/courses/${e.course?._id}`} className="btn-lms" style={{ fontSize:'0.78rem', padding:'6px 14px', width:'100%', justifyContent:'center' }}>
                          {e.isCompleted ? 'Review' : 'Continue Learning'}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Profile card */}
        <div className="content-card" style={{ marginTop:20 }}>
          <div className="content-card-head"><h5>Your Profile</h5></div>
          <div className="content-card-body">
            <div style={{ display:'flex', alignItems:'center', gap:16 }}>
              <div className="profile-av">{initials}</div>
              <div>
                <div style={{ fontFamily:'Poppins', fontSize:'1.1rem', fontWeight:700 }}>{user?.name}</div>
                <div style={{ fontSize:'0.85rem', color:'var(--ink-400)', marginTop:2 }}>{user?.email}</div>
                <span className="badge-lms badge-student" style={{ marginTop:8 }}>Student</span>
              </div>
              <Link to="/student/profile" className="btn-lms-outline ms-auto" style={{ fontSize:'0.8rem' }}>Edit Profile</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default StudentDashboard;
