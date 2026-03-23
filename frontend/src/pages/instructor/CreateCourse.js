import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { courseService } from '../../services/courseService';

const CATEGORIES = ['Web Development', 'Mobile Development', 'Data Science', 'Design', 'Business', 'Other'];

const CreateCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'Web Development',
    price: 0, level: 'Beginner', thumbnail: '', isPublished: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field, val) => setFormData({ ...formData, [field]: val });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const { data } = await courseService.createCourse(formData);
      navigate(`/instructor/courses/${data._id}/edit`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="dashboard-sidebar d-none d-md-block">
          <Nav className="flex-column mt-3">
            <Nav.Link as={Link} to="/instructor">📊 Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/instructor/create-course" className="active">➕ Create Course</Nav.Link>
            <Nav.Link as={Link} to="/instructor/courses">📚 My Courses</Nav.Link>
          </Nav>
        </Col>
        <Col md={10} className="p-4">
          <h3 className="fw-bold mb-4">Create New Course</h3>
          <Card className="border-0 shadow-sm p-4" style={{ maxWidth: 700 }}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Course Title *</Form.Label>
                <Form.Control placeholder="e.g. Complete React Developer 2024" value={formData.title} onChange={e => update('title', e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Description *</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="What will students learn?" value={formData.description} onChange={e => update('description', e.target.value)} required />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Category</Form.Label>
                    <Form.Select value={formData.category} onChange={e => update('category', e.target.value)}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Level</Form.Label>
                    <Form.Select value={formData.level} onChange={e => update('level', e.target.value)}>
                      {['Beginner', 'Intermediate', 'Advanced'].map(l => <option key={l}>{l}</option>)}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Price ($)</Form.Label>
                    <Form.Control type="number" min="0" value={formData.price} onChange={e => update('price', Number(e.target.value))} />
                    <Form.Text className="text-muted">Set 0 for free course</Form.Text>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Thumbnail URL</Form.Label>
                    <Form.Control placeholder="https://..." value={formData.thumbnail} onChange={e => update('thumbnail', e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Check
                className="mb-4"
                type="switch"
                label="Publish immediately"
                checked={formData.isPublished}
                onChange={e => update('isPublished', e.target.checked)}
              />
              <div className="d-flex gap-2">
                <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Creating...' : 'Create Course'}</Button>
                <Button as={Link} to="/instructor/courses" variant="outline-secondary">Cancel</Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCourse;
