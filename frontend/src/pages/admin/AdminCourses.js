import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Table, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { courseService } from '../../services/courseService';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    courseService.getAllCourses()
      .then(res => setCourses(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete course "${title}"?`)) return;
    try {
      await courseService.deleteCourse(id);
      setCourses(prev => prev.filter(c => c._id !== id));
      setMessage(`Course "${title}" deleted.`);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="dashboard-sidebar d-none d-md-block">
          <Nav className="flex-column mt-3">
            <Nav.Link as={Link} to="/admin">📊 Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/users">👥 Users</Nav.Link>
            <Nav.Link as={Link} to="/admin/courses" className="active">📚 Courses</Nav.Link>
          </Nav>
        </Col>
        <Col md={10} className="p-4">
          <h3 className="fw-bold mb-4">All Courses</h3>
          {message && <Alert variant="info" dismissible onClose={() => setMessage('')}>{message}</Alert>}
          {loading ? (
            <div className="text-center py-5"><Spinner animation="border" /></div>
          ) : (
            <Card className="border-0 shadow-sm">
              <Table responsive hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Title</th>
                    <th>Instructor</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Students</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(course => (
                    <tr key={course._id}>
                      <td className="fw-semibold">{course.title}</td>
                      <td className="text-muted">{course.instructor?.name}</td>
                      <td><Badge bg="secondary">{course.category}</Badge></td>
                      <td>{course.price === 0 ? 'Free' : `$${course.price}`}</td>
                      <td>👥 {course.enrollmentCount}</td>
                      <td>
                        <Badge bg={course.isPublished ? 'success' : 'warning'}>
                          {course.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </td>
                      <td>
                        <Button as={Link} to={`/courses/${course._id}`} size="sm" variant="outline-primary" className="me-1">View</Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDelete(course._id, course.title)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Card.Footer className="text-muted bg-white">Total: {courses.length} courses</Card.Footer>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCourses;
