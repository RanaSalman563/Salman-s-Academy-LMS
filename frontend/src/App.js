import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';


import Navbar from './components/Navbar';
import Footer from './components/Footer';


import Home from './pages/public/Home';
import About from './pages/public/About';
import Courses from './pages/public/Courses';
import CourseDetail from './pages/public/CourseDetail';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Unauthorized from './pages/public/Unauthorized';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import MyCourses from './pages/student/MyCourses';
import Profile from './pages/student/Profile';

// Instructor Pages
import InstructorDashboard from './pages/instructor/Dashboard';
import CreateCourse from './pages/instructor/CreateCourse';
import ManageCourses from './pages/instructor/ManageCourses';
import EditCourse from './pages/instructor/EditCourse';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import AdminCourses from './pages/admin/AdminCourses';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Student Routes */}
              <Route path="/student" element={<PrivateRoute roles={['student']}><StudentDashboard /></PrivateRoute>} />
              <Route path="/student/my-courses" element={<PrivateRoute roles={['student']}><MyCourses /></PrivateRoute>} />
              <Route path="/student/profile" element={<PrivateRoute roles={['student']}><Profile /></PrivateRoute>} />

              {/* Instructor Routes */}
              <Route path="/instructor" element={<PrivateRoute roles={['instructor']}><InstructorDashboard /></PrivateRoute>} />
              <Route path="/instructor/create-course" element={<PrivateRoute roles={['instructor']}><CreateCourse /></PrivateRoute>} />
              <Route path="/instructor/courses" element={<PrivateRoute roles={['instructor']}><ManageCourses /></PrivateRoute>} />
              <Route path="/instructor/courses/:id/edit" element={<PrivateRoute roles={['instructor']}><EditCourse /></PrivateRoute>} />

              {/* Admin Routes */}
              <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
              <Route path="/admin/users" element={<PrivateRoute roles={['admin']}><ManageUsers /></PrivateRoute>} />
              <Route path="/admin/courses" element={<PrivateRoute roles={['admin']}><AdminCourses /></PrivateRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
