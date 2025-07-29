import ButtonComponent from 'Components/Button/Button'
import React from 'react'
import { Card,Image,Button,Badge, Form, Row, Col } from 'react-bootstrap'

const ProfileInfo = () => {
  return (
    <Card className="border-0 rounded-4">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <Image 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    roundedCircle 
                    width={120}
                    height={120}
                    className="border border-3 border-primary object-fit-cover"
                  />
                  <Button 
                    variant="light" 
                    size="sm" 
                    className="position-absolute bottom-0 end-0 rounded-circle shadow-sm"
                    style={{ width: '32px', height: '32px' }}
                  >
                    ✏️
                  </Button>
                </div>
                <h3 className="mt-3 fw-bold">Ajith Arumugam</h3>
                <p className="text-muted mb-0">Premium Member</p>
                <Badge bg="success" className="mt-2">Gold Tier</Badge>
              </div>
              
              <Form>
                <Row className="g-1">
                  <Col md={6} className='px-2'>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">First Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        className="py-2 rounded-3"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className='px-2'>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Last Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        className="py-2 rounded-3"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className='px-2'>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Email</Form.Label>
                      <Form.Control 
                        type="email" 
                        className="py-2 rounded-3"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className='px-2'>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Phone</Form.Label>
                      <Form.Control 
                        type="tel" 
                        className="py-2 rounded-3"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12} className='px-2'>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Address</Form.Label>
                      <Form.Control as="textarea" rows={2}  />
                    </Form.Group>
                  </Col>
                </Row>
                
                <div className="d-flex justify-content-end gap-3 mt-4">  
                <ButtonComponent className="btn btn-outline-secondary px-4 rounded-3" buttonName="Cancel" />
                <ButtonComponent className="btn btn-success px-4 rounded-3" buttonName="Save Changes" />
                </div>
              </Form>
            </Card.Body>
          </Card>
  )
}

export default ProfileInfo