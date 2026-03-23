const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

// Simple seed without requiring models to avoid circular deps
const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
  tlsAllowInvalidCertificates: true
});
  console.log('Connected to MongoDB');

  const User = require('./models/User');
  const Course = require('./models/Course');

  // Clear existing data
  await User.deleteMany({});
  await Course.deleteMany({});
  console.log('Cleared existing data');

  // Create users
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@lms.com',
    password: 'admin123',
    role: 'admin',
  });

  const instructor = await User.create({
    name: 'DR.UMER',
    email: 'instructor@lms.com',
    password: 'pass123',
    role: 'instructor',
    bio: 'Full Stack Developer with 10+ years of experience.',
  });

  await User.create({
    name: 'Awais Student',
    email: 'student@lms.com',
    password: 'pass123',
    role: 'student',
  });

  console.log('✅ Users created');

  // Create sample courses
  const courses = [
    {
      title: 'Complete React Developer 2024',
      description: 'Learn React JS from scratch with hooks, context, and real projects. Build production-ready applications.',
      instructor: instructor._id,
      category: 'Web Development',
      price: 49,
      level: 'Beginner',
      isPublished: true,
      lessons: [
        { title: 'Introduction to React', content: 'What is React and why use it?', duration: 10, order: 1 },
        { title: 'JSX and Components', content: 'Understanding JSX syntax and creating components.', duration: 20, order: 2 },
        { title: 'State and Props', content: 'Managing component state and passing props.', duration: 25, order: 3 },
        { title: 'React Hooks', content: 'useState, useEffect, and custom hooks.', duration: 30, order: 4 },
      ],
    },
    {
      title: 'Node.js & Express Backend Development',
      description: 'Build robust REST APIs with Node.js, Express, and MongoDB. Learn authentication, middleware, and deployment.',
      instructor: instructor._id,
      category: 'Web Development',
      price: 59,
      level: 'Intermediate',
      isPublished: true,
      lessons: [
        { title: 'Node.js Fundamentals', content: 'Event loop, modules, and npm.', duration: 15, order: 1 },
        { title: 'Express Framework', content: 'Routing, middleware, and error handling.', duration: 25, order: 2 },
        { title: 'MongoDB & Mongoose', content: 'Database integration and schemas.', duration: 30, order: 3 },
      ],
    },
    {
      title: 'Python for Data Science',
      description: 'Master Python for data analysis, visualization, and machine learning with pandas, numpy, and scikit-learn.',
      instructor: instructor._id,
      category: 'Data Science',
      price: 0,
      level: 'Beginner',
      isPublished: true,
      lessons: [
        { title: 'Python Basics', content: 'Variables, loops, and functions in Python.', duration: 20, order: 1 },
        { title: 'NumPy & Pandas', content: 'Data manipulation and analysis.', duration: 35, order: 2 },
      ],
    },
  ];

  for (const courseData of courses) {
    await Course.create(courseData);
  }

  console.log('✅ Sample courses created');
  console.log('\n🎉 Seed complete! Demo accounts:');
  console.log('  Admin:      admin@lms.com    / admin123');
  console.log('  Instructor: instructor@lms.com / pass123');
  console.log('  Student:    student@lms.com  / pass123');

  await mongoose.disconnect();
};

seed().catch(err => { console.error(err); process.exit(1); });
