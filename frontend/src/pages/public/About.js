import React from 'react';

const About = () => (
  <>
    <div className="about-hero">
      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <div className="section-eyebrow" style={{ color:'var(--brand-accent)' }}>Our Story</div>
        <h1 style={{ fontFamily:'Poppins, sans-serif', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:700, color:'white', maxWidth:560, marginBottom:16, letterSpacing:'-0.5px' }}>
          Empowering Learners Across Pakistan
        </h1>
        <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1.05rem', maxWidth:500 }}>
          Inspired by Hunarmand Punjab's vision, we're bridging the skills gap through quality digital education.
        </p>
      </div>
    </div>

    <div className="container" style={{ padding:'72px 16px' }}>
      <div className="row align-items-center g-5 mb-5">
        <div className="col-lg-6">
          <div className="section-eyebrow">Our Mission</div>
          <h2 className="section-title">Making Quality Education Accessible to All</h2>
          <p style={{ fontSize:'1rem', color:'var(--ink-500)', lineHeight:1.8, marginBottom:16 }}>
            Salman's Acadeny LMS was built with a clear mission to make industry-level education accessible to every learner regardless of their background or location.
          </p>
          <p style={{ fontSize:'0.95rem', color:'var(--ink-500)', lineHeight:1.8 }}>
            Our platform connects passionate instructors with eager students, creating a vibrant learning community where skills are built and careers are transformed.
          </p>
        </div>
        <div className="col-lg-6">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {[
              { n:'10K+', l:'Active Students' },
              { n:'500+', l:'Courses Available' },
              { n:'200+', l:'Expert Instructors' },
              { n:'95%', l:'Satisfaction Rate' },
            ].map(s => (
              <div key={s.l} style={{ background:'var(--surface-0)', border:'1px solid var(--surface-3)', borderRadius:'var(--radius-md)', padding:24, textAlign:'center' }}>
                <div style={{ fontFamily:'Poppins, sans-serif', fontSize:'2rem', fontWeight:700, color:'var(--brand-primary)', letterSpacing:'-1px' }}>{s.n}</div>
                <div style={{ fontSize:'0.82rem', color:'var(--ink-500)', fontWeight:500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row g-4">
        {[
          { icon:'🏫', title:'Quality First', desc:'Every course is curated to meet industry standards. We believe in depth over breadth — meaningful learning that sticks.' },
          { icon:'🤝', title:'Community Driven', desc:'Learning is better together. Our platform fosters a supportive community of students and mentors from all over Pakistan and beyond.' },
          { icon:'💡', title:'Skill-Focused', desc:'Inspired by Hunarmand Punjab\'s vision of skills-based development, every course is designed to make you job-ready.' },
        ].map(item => (
          <div key={item.title} className="col-md-4">
            <div className="feature-card">
              <div className="feature-icon">{item.icon}</div>
              <h5>{item.title}</h5>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);
export default About;
