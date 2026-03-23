import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/courseService';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({ name: user?.name || '', bio: user?.bio || '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setMessage('');
    if (formData.password && formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    setLoading(true);
    try {
      const payload = { name: formData.name, bio: formData.bio };
      if (formData.password) payload.password = formData.password;
      const { data } = await userService.updateProfile(payload);
      updateUser(data);
      setMessage('Profile updated successfully!');
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="dashboard-sidebar d-none d-md-block">
          <Nav className="flex-column mt-3">
            <Nav.Link as={Link} to="/student">📊 Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/student/my-courses">📚 My Courses</Nav.Link>
            <Nav.Link as={Link} to="/student/profile" className="active">👤 Profile</Nav.Link>
            <Nav.Link as={Link} to="/courses">🔍 Browse</Nav.Link>
          </Nav>
        </Col>
        <Col md={10} className="p-4">
          <h3 className="fw-bold mb-4">My Profile</h3>
          <Row>
            <Col md={4}>
              <Card className="border-0 shadow-sm text-center p-4 mb-4">
                <div style={{ fontSize: '5rem' }}>👤</div>
                <h5 className="fw-bold mt-2">{user?.name}</h5>
                <p className="text-muted">{user?.email}</p>
                <span className="badge bg-primary">{user?.role}</span>
              </Card>
            </Col>
            <Col md={8}>
              <Card className="border-0 shadow-sm p-4">
                <h5 className="fw-bold mb-4">Edit Profile</h5>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Full Name</Form.Label>
                    <Form.Control value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control value={user?.email} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Bio</Form.Label>
                    <Form.Control as="textarea" rows={3} value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} />
                  </Form.Group>
                  <hr />
                  <h6 className="fw-bold text-muted">Change Password (optional)</h6>
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} />
                  </Form.Group>
                  <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
