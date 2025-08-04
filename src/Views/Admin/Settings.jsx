import React from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { FaFacebook, FaGoogle, FaLinkedin, FaEye, FaEyeSlash, FaEdit, FaTrash, FaUpload } from 'react-icons/fa';
import { MdCreditCard } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';

const Settings = () => {
  return (
    <Container fluid className="">
      <h5 className="fw-semibold">About section</h5>

      <Row className="align-items-stretch">

        <Col lg={4} className="p-2 d-flex flex-column">
    
          <Card className="mb-3 text-center flex-fill">
            <Card.Body>
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="profile"
                className="rounded-circle mb-3"
                width="90"
                height="90"
              />
              <Card.Title>Wade Warren</Card.Title>
              <Card.Text className="text-muted">wade.warren@example.com</Card.Text>
            </Card.Body>
          </Card>

          <Card className='flex-fill'>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="mb-0 fs-6">Change Password</Card.Title>
                <a href="#help" className="text-decoration-none text-muted fs-7">Need help?</a>
              </div>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <InputGroup>
                    <Form.Control type="password" placeholder="Enter password" />
                    <InputGroup.Text><FaEyeSlash /></InputGroup.Text>
                  </InputGroup>
                  <small><a href="#" className="text-decoration-none">Forgot Current Password? Click here</a></small>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <InputGroup>
                    <Form.Control type="password" placeholder="Enter password" />
                    <InputGroup.Text><FaEyeSlash /></InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Re-enter Password</Form.Label>
                  <InputGroup>
                    <Form.Control type="password" placeholder="Enter password" />
                    <InputGroup.Text><FaEyeSlash /></InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Button variant="success" className="w-100">Save Change</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>


        <Col lg={8} className='p-2 d-flex flex-column'>
          <Card className='flex-fill'>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Profile Update</span>
              <Button variant="outline-secondary" size="sm">
                <FaEdit /> Edit
              </Button>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col sm={3}>
                  <img
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    alt="profile"
                    className="rounded-circle"
                    width="80"
                    height="80"
                  />
                </Col>
                <Col sm={9} className="d-flex align-items-center gap-2">
                  <Button variant="success" size="sm"><FaUpload /> Upload New</Button>
                  <Button variant="outline-danger" size="sm"><FaTrash /> Delete</Button>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6} className='p-1'>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control defaultValue="Wade" />
                  </Form.Group>
                </Col>
                <Col md={6} className='p-1'>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control defaultValue="Warren" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6} className='p-1'>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control type="password" defaultValue="password" />
                      <InputGroup.Text><FaEyeSlash /></InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6} className='p-1'>
                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <InputGroup>
                      <Form.Control defaultValue="(406) 555-0120" />
                      <InputGroup.Text><img src="https://flagcdn.com/us.svg" alt="US" width="20" /></InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6} className='p-1'>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control defaultValue="wade.warren@example.com" />
                  </Form.Group>
                </Col>
                <Col md={6} className='p-1'>
                  <Form.Group>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" defaultValue="1999-01-12" />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control defaultValue="2972 Westheimer Rd. Santa Ana, Illinois 85486" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Biography</Form.Label>
                <InputGroup>
                  <Form.Control as="textarea"  placeholder="Enter a biography about you" />
                  <InputGroup.Text><FiEdit3 /></InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
