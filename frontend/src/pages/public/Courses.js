import React, { useState, useEffect } from 'react';
import CourseCard from '../../components/CourseCard';
import { courseService } from '../../services/courseService';

const CATS = ['All', 'Web Development', 'Mobile Development', 'Data Science', 'Design', 'Business', 'Other'];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchCourses = async (s, c, p) => {
    setLoading(true);
    try {
      const params = { page: p, limit: 9 };
      if (s) params.search = s;
      if (c !== 'All') params.category = c;
      const { data } = await courseService.getCourses(params);
      setCourses(data.courses);
      setTotalPages(data.pages);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchCourses(search, category, page); }, [page, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCourses(search, category, 1);
  };

  const handleCat = (c) => { setCategory(c); setPage(1); };

  return (
    <>
      {/* Page header */}
      <div style={{ background:'var(--brand-secondary)', padding:'48px 0 40px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 80% at 70% 50%, rgba(255,107,53,0.12) 0%, transparent 70%)', pointerEvents:'none' }}></div>
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="section-eyebrow" style={{ color:'var(--brand-accent)' }}>Learn Something New</div>
          <h1 style={{ fontFamily:'Poppins, sans-serif', fontSize:'clamp(1.8rem, 4vw, 2.6rem)', fontWeight:700, color:'white', letterSpacing:'-0.5px', marginBottom:8 }}>
            Browse All Courses
          </h1>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1rem', marginBottom:28 }}>
            Explore our full catalog of courses across every skill level
          </p>
          {/* Search */}
          <form onSubmit={handleSearch}>
            <div className="search-lms">
              <span className="search-ico">🔍</span>
              <input
                type="text"
                placeholder="Search for any course or topic..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button type="submit" className="search-btn">Search</button>
            </div>
          </form>
        </div>
      </div>

      <div className="container" style={{ padding:'36px 16px 60px' }}>
        {/* Category filter */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:28, alignItems:'center' }}>
          {CATS.map(c => (
            <button key={c} className={`cat-pill${category === c ? ' active' : ''}`} onClick={() => handleCat(c)}>
              {c}
            </button>
          ))}
          {total > 0 && (
            <span style={{ marginLeft:'auto', fontSize:'0.82rem', color:'var(--ink-400)', fontWeight:500 }}>
              {total} course{total !== 1 ? 's' : ''} found
            </span>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <div className="spinner-lms"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-ico">🔍</div>
            <h5>No courses found</h5>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
            <button className="btn-lms" onClick={() => { setSearch(''); setCategory('All'); setPage(1); fetchCourses('', 'All', 1); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {courses.map(c => (
                <div key={c._id} className="col-lg-4 col-md-6">
                  <CourseCard course={c} />
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="pagination-lms">
                <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} className={`page-btn${page === p ? ' active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                ))}
                <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
                <span className="page-info">Page {page} of {totalPages}</span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default Courses;
