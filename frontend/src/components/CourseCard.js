import React from 'react';
import { Link } from 'react-router-dom';

const levelClass = { Beginner: 'level-beginner', Intermediate: 'level-intermediate', Advanced: 'level-advanced' };

const CourseCard = ({ course }) => {
  const thumb = course.thumbnail || `https://picsum.photos/seed/${course._id}/600/340`;
  const initials = (course.instructor?.name || 'I').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <Link to={`/courses/${course._id}`} className="course-card-lms" style={{ display:'flex' }}>
      <div className="card-thumb">
        <img src={thumb} alt={course.title} loading="lazy" />
        <span className={`level-badge ${levelClass[course.level] || 'level-beginner'}`}>{course.level}</span>
        <span className={`price-chip${course.price === 0 ? ' free' : ''}`}>
          {course.price === 0 ? 'Free' : `$${course.price}`}
        </span>
      </div>
      <div className="card-body-lms">
        <div className="cat-tag">{course.category}</div>
        <div className="course-card-title">{course.title}</div>
        <div className="course-card-desc">{course.description}</div>
        <div className="instructor-row">
          <div className="inst-avatar-sm">{initials}</div>
          <span className="inst-name-sm">{course.instructor?.name || 'Instructor'}</span>
        </div>
        <div className="card-footer-row">
          <span className="students-sm">
            <span>👥</span> {course.enrollmentCount || 0} students
          </span>
          <span className="btn-view-course">View →</span>
        </div>
      </div>
    </Link>
  );
};
export default CourseCard;
