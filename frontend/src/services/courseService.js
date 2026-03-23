import api from './api';

export const courseService = {
  getCourses: (params) => api.get('/courses', { params }),
  getCourseById: (id) => api.get(`/courses/${id}`),
  createCourse: (data) => api.post('/courses', data),
  updateCourse: (id, data) => api.put(`/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
  addLesson: (courseId, data) => api.post(`/courses/${courseId}/lessons`, data),
  getInstructorCourses: () => api.get('/courses/instructor/my-courses'),
  getAllCourses: () => api.get('/courses/admin/all'),
};

export const enrollmentService = {
  enroll: (courseId) => api.post('/enrollments/enroll', { courseId }),
  getMyCourses: () => api.get('/enrollments/my-courses'),
  checkEnrollment: (courseId) => api.get(`/enrollments/check/${courseId}`),
  updateProgress: (courseId, lessonId) => api.put(`/enrollments/${courseId}/progress`, { lessonId }),
};

export const userService = {
  getUsers: () => api.get('/users'),
  deleteUser: (id) => api.delete(`/users/${id}`),
  getAnalytics: () => api.get('/users/analytics'),
  updateProfile: (data) => api.put('/auth/profile', data),
};
