const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @desc,  @route, @access

const getCourses = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const query = { isPublished: true };

    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    const courses = await Course.find(query)
      .populate('instructor', 'name email avatar')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Course.countDocuments(query);

    res.json({ courses, total, pages: Math.ceil(total / limit), page: Number(page) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single course
// @route  GET /api/courses/:id
// @access Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email avatar bio');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private (Instructor, Admin)
const createCourse = async (req, res) => {
  try {
    const { title, description, category, price, thumbnail, level } = req.body;

    const course = await Course.create({
      title,
      description,
      category,
      price,
      thumbnail,
      level,
      instructor: req.user._id,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private (Instructor  own course, Admin)
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Only instructor who owns it or admin can update
    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    await course.deleteOne();
    await Enrollment.deleteMany({ course: req.params.id });

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a lesson to course
// @route   POST /api/courses/:id/lessons
// @access  Private (Instructor -own course)
const addLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    course.lessons.push(req.body);
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get instructor's courses
// @route   GET /api/courses/my courses
// @access  Private (Instructor)
const getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id }).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all courses (admin)
// @route   GET /api/courses/all
// @access  Private (Admin)
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email').sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCourses, getCourseById, createCourse, updateCourse, deleteCourse, addLesson, getInstructorCourses, getAllCourses };
