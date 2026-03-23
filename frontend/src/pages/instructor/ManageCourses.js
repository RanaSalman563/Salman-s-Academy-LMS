import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Table, Button, Badge, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { courseService } from '../../services/courseService';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = () => {
    courseService.getInstructorCourses()
      .then(res => setCourses(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course? This cannot be undone.')) return;
    try {
      await courseService.deleteCourse(id);
      setCourses(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="dashboard-sidebar d-none d-md-block">
          <Nav className="flex-column mt-3">
            <Nav.Link as={Link} to="/instructor">📊 Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/instructor/create-course">➕ Create Course</Nav.Link>
            <Nav.Link as={Link} to="/instructor/courses" className="active">📚 My Courses</Nav.Link>
          </Nav>
        </Col>
        <Col md={10} className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold">My Courses</h3>
            <Button as={Link} to="/instructor/create-course" variant="primary">+ New Course</Button>
          </div>
          {loading ? (
            <div className="text-center py-5"><Spinner animation="border" /></div>
          ) : courses.length === 0 ? (
            <Card className="border-0 bg-light text-center p-5">
              <p className="text-muted">No courses yet.</p>
              <Link to="/instructor/create-course" className="btn btn-primary">Create Course</Link>
            </Card>
          ) : (
            <Card className="border-0 shadow-sm">
              <Table responsive hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Level</th>
                    <th>Students</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(course => (
                    <tr key={course._id}>
                      <td className="fw-semibold">{course.title}</td>
                      <td><Badge bg="secondary">{course.category}</Badge></td>
                      <td>{course.level}</td>
                      <td>👥 {course.enrollmentCount}</td>
                      <td>{course.price === 0 ? 'Free' : `$${course.price}`}</td>
                      <td>
                        <Badge bg={course.isPublished ? 'success' : 'warning'}>
                          {course.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </td>
                      <td>
                        <Button as={Link} to={`/instructor/courses/${course._id}/edit`} size="sm" variant="outline-primary" className="me-2">Edit</Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDelete(course._id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ManageCourses;
