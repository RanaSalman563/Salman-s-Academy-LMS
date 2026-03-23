import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Table, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userService } from '../../services/courseService';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    userService.getUsers()
      .then(res => setUsers(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    try {
      await userService.deleteUser(id);
      setUsers(prev => prev.filter(u => u._id !== id));
      setMessage(`User "${name}" deleted.`);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Delete failed');
    }
  };

  const roleBadge = (role) => {
    const colors = { admin: 'danger', instructor: 'success', student: 'primary' };
    return <Badge bg={colors[role] || 'secondary'}>{role}</Badge>;
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="dashboard-sidebar d-none d-md-block">
          <Nav className="flex-column mt-3">
            <Nav.Link as={Link} to="/admin">📊 Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/users" className="active">👥 Users</Nav.Link>
            <Nav.Link as={Link} to="/admin/courses">📚 Courses</Nav.Link>
          </Nav>
        </Col>
        <Col md={10} className="p-4">
          <h3 className="fw-bold mb-4">Manage Users</h3>
          {message && <Alert variant="info" dismissible onClose={() => setMessage('')}>{message}</Alert>}
          {loading ? (
            <div className="text-center py-5"><Spinner animation="border" /></div>
          ) : (
            <Card className="border-0 shadow-sm">
              <Table responsive hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user._id}>
                      <td className="text-muted">{i + 1}</td>
                      <td className="fw-semibold">{user.name}</td>
                      <td className="text-muted">{user.email}</td>
                      <td>{roleBadge(user.role)}</td>
                      <td className="text-muted small">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        {user.role !== 'admin' ? (
                          <Button size="sm" variant="outline-danger" onClick={() => handleDelete(user._id, user.name)}>Delete</Button>
                        ) : (
                          <span className="text-muted small">Protected</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Card.Footer className="text-muted bg-white">Total: {users.length} users</Card.Footer>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ManageUsers;
