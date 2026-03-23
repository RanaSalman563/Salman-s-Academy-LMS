import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService, enrollmentService } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState({ text:'', type:'' });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await courseService.getCourseById(id);
        setCourse(data);
        if (user?.role === 'student') {
          const r = await enrollmentService.checkEnrollment(id);
          setIsEnrolled(r.data.isEnrolled);
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) return navigate('/login');
    setEnrolling(true);
    try {
      await enrollmentService.enroll(id);
      setIsEnrolled(true);
      setMessage({ text:'You\'re enrolled! 🎉 Head to your dashboard to start learning.', type:'success' });
    } catch (e) {
      setMessage({ text: e.response?.data?.message || 'Enrollment failed. Please try again.', type:'error' });
    } finally { setEnrolling(false); }
  };

  if (loading) return <div style={{ textAlign:'center', padding:'80px 0' }}><div className="spinner-lms"></div></div>;
  if (!course) return <div style={{ textAlign:'center', padding:'80px 0', color:'var(--ink-500)' }}>Course not found.</div>;

  const thumb = course.thumbnail || `https://picsum.photos/seed/${course._id}/800/450`;
  const initials = (course.instructor?.name || 'I').split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();

  return (
    <>
      {/* Course Hero */}
      <div className="course-hero-section">
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="row">
            <div className="col-lg-8">
              <div className="course-chip">{course.category}</div>
              <h1>{course.title}</h1>
              <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'1rem', lineHeight:1.7, marginBottom:20 }}>
                {course.description}
              </p>
              <div className="course-meta-row">
                {[
                  { icon:'👤', text: course.instructor?.name || 'Instructor' },
                  { icon:'📊', text: course.level },
                  { icon:'📚', text: `${course.lessons?.length || 0} lessons` },
                  { icon:'👥', text: `${course.enrollmentCount} students` },
                ].map(m => (
                  <div key={m.text} className="meta-chip"><span>{m.icon}</span>{m.text}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding:'40px 16px 72px' }}>
        {message.text && (
          <div className={message.type === 'success' ? 'alert-success' : 'alert-error'} style={{ marginBottom:24 }}>
            {message.text}
          </div>
        )}

        <div className="row g-5">
          {/* Main content */}
          <div className="col-lg-8">
            {/* What you'll learn */}
            {course.lessons?.length > 0 && (
              <div style={{ marginBottom:36 }}>
                <h3 style={{ fontFamily:'Poppins', fontSize:'1.3rem', fontWeight:700, marginBottom:16 }}>
                  Course Content
                </h3>
                <div style={{ fontSize:'0.85rem', color:'var(--ink-500)', marginBottom:14 }}>
                  {course.lessons.length} lessons
                </div>
                <div className="lesson-list">
                  {course.lessons.map((lesson, i) => (
                    <div key={lesson._id || i} className="lesson-row">
                      <div className="lesson-num">{i + 1}</div>
                      <span className="lesson-title-text">📖 {lesson.title}</span>
                      {lesson.duration && <span className="lesson-dur">{lesson.duration} min</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div style={{ marginBottom:36 }}>
              <h3 style={{ fontFamily:'Poppins', fontSize:'1.3rem', fontWeight:700, marginBottom:12 }}>About This Course</h3>
              <p style={{ fontSize:'0.95rem', color:'var(--ink-500)', lineHeight:1.8 }}>{course.description}</p>
            </div>

            {/* Instructor */}
            <div>
              <h3 style={{ fontFamily:'Poppins', fontSize:'1.3rem', fontWeight:700, marginBottom:16 }}>Your Instructor</h3>
              <div className="inst-card">
                <div className="inst-big-av">{initials}</div>
                <div>
                  <h5 style={{ fontFamily:'Poppins', fontSize:'1.05rem', fontWeight:700, marginBottom:4 }}>{course.instructor?.name}</h5>
                  <p style={{ fontSize:'0.875rem', color:'var(--ink-500)', margin:0, lineHeight:1.6 }}>
                    {course.instructor?.bio || 'Experienced instructor passionate about sharing knowledge and helping students succeed.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enrollment card */}
          <div className="col-lg-4">
            <div className="enroll-card">
              <div className="enroll-thumb"><img src={thumb} alt={course.title} /></div>
              <div className="enroll-body">
                <div className={`enroll-price${course.price === 0 ? ' free' : ''}`}>
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </div>
                {isEnrolled ? (
                  <button className="btn-enroll enrolled" onClick={() => navigate('/student/my-courses')}>
                    ✅ Go to My Courses
                  </button>
                ) : (
                  <button className="btn-enroll" onClick={handleEnroll} disabled={enrolling}>
                    {enrolling ? 'Enrolling...' : `Enroll Now${course.price > 0 ? ` — $${course.price}` : ' — Free'}`}
                  </button>
                )}
                <ul className="perks-list">
                  <li>Full lifetime access to course content</li>
                  <li>{course.lessons?.length || 0} structured lessons</li>
                  <li>Certificate of completion</li>
                  <li>Access on any device</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CourseDetail;
