import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { courseService } from '../../services/courseService';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    courseService.getInstructorCourses().then(r => setCourses(r.data)).catch(() => {});
  }, []);

  const published = courses.filter(c => c.isPublished).length;
  const totalStudents = courses.reduce((sum, c) => sum + (c.enrollmentCount || 0), 0);

  const nav = [
    { to:'/instructor', ico:'📊', label:'Dashboard' },
    { to:'/instructor/create-course', ico:'➕', label:'Create Course' },
    { to:'/instructor/courses', ico:'📚', label:'My Courses' },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="dash-sidebar">
        <div className="sidebar-label">Instructor Portal</div>
        {nav.map(n => (
          <Link key={n.to} to={n.to} className={`sidebar-item${location.pathname === n.to ? ' active' : ''}`}>
            <span className="s-ico">{n.ico}</span>{n.label}
          </Link>
        ))}
      </aside>

      <main className="dash-main">
        <div className="page-head d-flex justify-content-between align-items-start flex-wrap gap-3">
          <div>
            <div className="greeting">Instructor Portal</div>
            <h2>Welcome back, {user?.name?.split(' ')[0]}!</h2>
            <p>Manage your courses and track student engagement</p>
          </div>
          <Link to="/instructor/create-course" className="btn-lms">+ New Course</Link>
        </div>

        <div className="row g-4 mb-4">
          {[
            { label:'Total Courses', val: courses.length, cls:'stat-indigo', ico:'📚' },
            { label:'Published', val: published, cls:'stat-green', ico:'✅' },
            { label:'Total Students', val: totalStudents, cls:'stat-orange', ico:'👥' },
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

        <div className="content-card">
          <div className="content-card-head">
            <h5>My Courses</h5>
            <Link to="/instructor/courses" className="btn-lms-outline" style={{ fontSize:'0.8rem', padding:'6px 14px' }}>Manage All</Link>
          </div>
          <div className="content-card-body">
            {courses.length === 0 ? (
              <div className="empty-state" style={{ padding:'40px 20px' }}>
                <div className="empty-ico">📝</div>
                <h5>No courses yet</h5>
                <p>Create your first course and start sharing your knowledge</p>
                <Link to="/instructor/create-course" className="btn-lms">Create Your First Course</Link>
              </div>
            ) : (
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Students</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.slice(0, 5).map(c => (
                    <tr key={c._id}>
                      <td style={{ fontWeight:600, maxWidth:200 }}>{c.title}</td>
                      <td style={{ color:'var(--ink-500)', fontSize:'0.85rem' }}>{c.category}</td>
                      <td><span className={`badge-lms ${c.isPublished ? 'badge-published' : 'badge-draft'}`}>{c.isPublished ? 'Published' : 'Draft'}</span></td>
                      <td style={{ color:'var(--ink-500)' }}>👥 {c.enrollmentCount || 0}</td>
                      <td>
                        <Link to={`/instructor/courses`} className="btn-lms-outline" style={{ fontSize:'0.78rem', padding:'5px 12px' }}>Edit</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default InstructorDashboard;
