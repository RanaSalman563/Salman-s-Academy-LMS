const express = require('express');
const router = express.Router();
const { enrollInCourse, getMyCourses, updateProgress, checkEnrollment } = require('../controllers/enrollmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/enroll', protect, authorize('student'), enrollInCourse);
router.get('/my-courses', protect, authorize('student'), getMyCourses);
router.put('/:courseId/progress', protect, authorize('student'), updateProgress);
router.get('/check/:courseId', protect, checkEnrollment);

module.exports = router;
