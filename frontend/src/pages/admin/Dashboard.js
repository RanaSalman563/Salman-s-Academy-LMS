import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { userService } from '../../services/courseService';

const AdminDashboard = () => {
  const location = useLocation();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getAnalytics().then(r => setAnalytics(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const nav = [
    { to:'/admin', ico:'📊', label:'Dashboard' },
    { to:'/admin/users', ico:'👥', label:'Manage Users' },
    { to:'/admin/courses', ico:'📚', label:'All Courses' },
  ];

  const stats = analytics ? [
    { label:'Total Users', val: analytics.totalUsers, cls:'stat-indigo', ico:'👥' },
    { label:'Students', val: analytics.totalStudents, cls:'stat-blue', ico:'👨‍🎓' },
    { label:'Instructors', val: analytics.totalInstructors, cls:'stat-green', ico:'👨‍🏫' },
    { label:'Total Courses', val: analytics.totalCourses, cls:'stat-orange', ico:'📚' },
    { label:'Enrollments', val: analytics.totalEnrollments, cls:'stat-red', ico:'📝' },
    { label:'New (30d)', val: analytics.newUsers, cls:'stat-teal', ico:'🆕' },
  ] : [];

  return (
    <div className="dashboard-layout">
      <aside className="dash-sidebar">
        <div className="sidebar-label">Admin Panel</div>
        {nav.map(n => (
          <Link key={n.to} to={n.to} className={`sidebar-item${location.pathname === n.to ? ' active' : ''}`}>
            <span className="s-ico">{n.ico}</span>{n.label}
          </Link>
        ))}
      </aside>

      <main className="dash-main">
        <div className="page-head">
          <div className="greeting">Administration</div>
          <h2>Platform Overview</h2>
          <p>Monitor all users, courses, and platform analytics</p>
        </div>

        {loading ? (
          <div className="spinner-lms"></div>
        ) : (
          <>
            <div className="row g-4 mb-4">
              {stats.map(s => (
                <div key={s.label} className="col-md-4 col-sm-6">
                  <div className={`stat-card-lms ${s.cls}`}>
                    <div className="stat-icon">{s.ico}</div>
                    <span className="stat-val">{s.val ?? '—'}</span>
                    <span className="stat-lbl">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="content-card">
                  <div className="content-card-head">
                    <h5>👥 User Management</h5>
                  </div>
                  <div className="content-card-body">
                    <p style={{ fontSize:'0.875rem', color:'var(--ink-500)', marginBottom:16 }}>
                      View, manage, and remove user accounts across all roles. Admin accounts are protected from deletion.
                    </p>
                    <Link to="/admin/users" className="btn-lms">Manage Users →</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="content-card">
                  <div className="content-card-head">
                    <h5>📚 Course Management</h5>
                  </div>
                  <div className="content-card-body">
                    <p style={{ fontSize:'0.875rem', color:'var(--ink-500)', marginBottom:16 }}>
                      Browse and oversee all courses from every instructor. Monitor published and draft content.
                    </p>
                    <Link to="/admin/courses" className="btn-lms">View All Courses →</Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
export default AdminDashboard;
