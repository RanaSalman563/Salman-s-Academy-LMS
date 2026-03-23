import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Form, Button, Alert, ListGroup, Badge } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { courseService } from '../../services/courseService';

const CATEGORIES = ['Web Development', 'Mobile Development', 'Data Science', 'Design', 'Business', 'Other'];

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({});
  const [lessonData, setLessonData] = useState({ title: '', content: '', videoUrl: '', duration: 0 });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    courseService.getCourseById(id).then(res => {
      setCourse(res.data);
      setFormData({
        title: res.data.title, description: res.data.description,
        category: res.data.category, price: res.data.price,
        level: res.data.level, thumbnail: res.data.thumbnail,
        isPublished: res.data.isPublished,
      });
    }).catch(() => navigate('/instructor/courses'));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const { data } = await courseService.updateCourse(id, formData);
      setCourse(data);
      setMessage('Course updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      const { data } = await courseService.addLesson(id, lessonData);
      setCourse(data);
      setLessonData({ title: '', content: '', videoUrl: '', duration: 0 });
      setMessage('Lesson added!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add lesson');
    }
  };

  if (!course) return <div className="text-center py-5">Loading...</div>;

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
          <div className="d-flex justify-content-between mb-4">
            <h3 className="fw-bold">Edit Course</h3>
            <Button as={Link} to="/instructor/courses" variant="outline-secondary" size="sm">← Back</Button>
          </div>
          {message && <Alert variant="success" dismissible onClose={() => setMessage('')}>{message}</Alert>}
          {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

          <Row>
            <Col md={7}>
              <Card className="border-0 shadow-sm p-4 mb-4">
                <h5 className="fw-bold mb-3">Course Details</h5>
                <Form onSubmit={handleUpdate}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Title</Form.Label>
                    <Form.Control value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})}>
                          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Level</Form.Label>
                        <Form.Select value={formData.level || ''} onChange={e => setFormData({...formData, level: e.target.value})}>
                          {['Beginner', 'Intermediate', 'Advanced'].map(l => <option key={l}>{l}</option>)}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Price ($)</Form.Label>
                        <Form.Control type="number" min="0" value={formData.price ?? 0} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                      </Form.Group>
                    </Col>
                    <Col className="d-flex align-items-end pb-3">
                      <Form.Check type="switch" label="Published" checked={formData.isPublished || false} onChange={e => setFormData({...formData, isPublished: e.target.checked})} />
                    </Col>
                  </Row>
                  <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
                </Form>
              </Card>

              {/* Add Lesson */}
              <Card className="border-0 shadow-sm p-4">
                <h5 className="fw-bold mb-3">Add Lesson</h5>
                <Form onSubmit={handleAddLesson}>
                  <Form.Group className="mb-3">
                    <Form.Label>Lesson Title *</Form.Label>
                    <Form.Control value={lessonData.title} onChange={e => setLessonData({...lessonData, title: e.target.value})} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Content *</Form.Label>
                    <Form.Control as="textarea" rows={3} value={lessonData.content} onChange={e => setLessonData({...lessonData, content: e.target.value})} required />
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Video URL</Form.Label>
                        <Form.Control placeholder="https://youtube.com/..." value={lessonData.videoUrl} onChange={e => setLessonData({...lessonData, videoUrl: e.target.value})} />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Duration (min)</Form.Label>
                        <Form.Control type="number" min="0" value={lessonData.duration} onChange={e => setLessonData({...lessonData, duration: Number(e.target.value)})} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button type="submit" variant="success">+ Add Lesson</Button>
                </Form>
              </Card>
            </Col>

            {/* Lessons List */}
            <Col md={5}>
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white fw-bold">
                  📚 Lessons ({course.lessons?.length || 0})
                </Card.Header>
                <ListGroup variant="flush">
                  {course.lessons?.length === 0 ? (
                    <ListGroup.Item className="text-muted text-center py-4">No lessons yet</ListGroup.Item>
                  ) : course.lessons?.map((l, i) => (
                    <ListGroup.Item key={l._id || i}>
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">{i + 1}. {l.title}</span>
                        {l.duration > 0 && <Badge bg="light" text="dark">{l.duration}m</Badge>}
                      </div>
                      <small className="text-muted">{l.content?.slice(0, 60)}...</small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default EditCourse;
