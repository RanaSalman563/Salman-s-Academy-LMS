const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Enroll in a course
// @route   POST /api/enrollments/enroll
// @access  Private (Student)
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!course.isPublished) return res.status(400).json({ message: 'Course is not available for enrollment' });

    const alreadyEnrolled = await Enrollment.findOne({ student: req.user._id, course: courseId });
    if (alreadyEnrolled) return res.status(400).json({ message: 'Already enrolled in this course' });

    const enrollment = await Enrollment.create({ student: req.user._id, course: courseId });

    // Increment enrollment count
    await Course.findByIdAndUpdate(courseId, { $inc: { enrollmentCount: 1 } });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @access  Private (Student)
const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate({
        path: 'course',
        populate: { path: 'instructor', select: 'name email' },
      })
      .sort({ enrolledAt: -1 });

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lesson progress
// @route   PUT /api/enrollments/:courseId/progress
// @access  Private (Student)
const updateProgress = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const enrollment = await Enrollment.findOne({ student: req.user._id, course: req.params.courseId });

    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }

    const course = await Course.findById(req.params.courseId);
    const totalLessons = course.lessons.length;
    enrollment.progress = totalLessons > 0 ? Math.round((enrollment.completedLessons.length / totalLessons) * 100) : 0;
    enrollment.isCompleted = enrollment.progress === 100;

    await enrollment.save();
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check if student is enrolled
// @route   GET /api/enrollments/check/:courseId
// @access  Private
const checkEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({ student: req.user._id, course: req.params.courseId });
    res.json({ isEnrolled: !!enrollment, enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { enrollInCourse, getMyCourses, updateProgress, checkEnrollment };
