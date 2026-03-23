const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addLesson,
  getInstructorCourses,
  getAllCourses,
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourseById);

// Protected routes
router.get('/instructor/my-courses', protect, authorize('instructor', 'admin'), getInstructorCourses);
router.get('/admin/all', protect, authorize('admin'), getAllCourses);

router.post('/', protect, authorize('instructor', 'admin'), createCourse);
router.put('/:id', protect, authorize('instructor', 'admin'), updateCourse);
router.delete('/:id', protect, authorize('instructor', 'admin'), deleteCourse);
router.post('/:id/lessons', protect, authorize('instructor', 'admin'), addLesson);

module.exports = router;
