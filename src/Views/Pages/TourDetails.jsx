import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Card, Badge,Form } from 'react-bootstrap'
import { MdOutlineLocationOn } from 'react-icons/md'
import { RiMoneyRupeeCircleLine } from 'react-icons/ri'
import JsonData from 'Utils/JsonData'
import Image from 'Utils/Image'
import ButtonComponent from 'Components/Button/Button'
import ModalComponent from 'Components/Modal/Modal'

const TourDetails = () => {
  const { id } = useParams()
  const { jsonOnly } = JsonData()
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    startDate: '',
    requiresGuide: false,
    numberOfPersons: 1,
    comments: ''
  });

  const tour = jsonOnly?.tourDetails?.find(t => t._id === id)
  const [selectedImage, setSelectedImage] = useState(
    tour?.imageGallery?.[0] || Image.cardImg
  )

  if (!tour) {
    return (
      <div className="container py-5 text-center">
        Loading tour details...
      </div>
    )
  }

  if (!selectedImage && tour?.imageGallery?.length > 0) {
    setSelectedImage(tour.imageGallery[0])
  }
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setShowModal(false)
  }

  function modalBody() {
    return (
      <Form onSubmit={handleSubmit}>
        <Row className="mb-2">
          <Col md={6} className='p-2'>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} className='p-2'>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-2 p-2" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Row className="mb-2">
          <Col md={6} className='p-2'>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </Form.Group>
          </Col>
          <Col md={6} className='p-2'>
            <Form.Group controlId="numberOfPersons">
              <Form.Label>Number of Persons</Form.Label>
              <Form.Control
                type="number"
                name="numberOfPersons"
                min="1"
                max="20"
                value={formData.numberOfPersons}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-2 p-2" controlId="requiresGuide">
          <Form.Check
            type="checkbox"
            label="Require a tour guide?"
            name="requiresGuide"
            checked={formData.requiresGuide}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-2 p-2" controlId="comments">
          <Form.Label>Special Requests/Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
          />
        </Form.Group>

        <div className="d-flex gap-4 w-100 p-2">
          <ButtonComponent 
            type="submit"
            className="btn-success w-50" 
            buttonName="Confirm Booking" 
          />
          <ButtonComponent 
            type="button"
            className="btn-outline-danger w-50" 
            buttonName="Cancel"
            clickFunction={() => setShowModal(false)}
          />
        </div>
      </Form>
    );
  }

  function modalFooter (){
    return(
      <div className='d-flex gap-4 w-100 bg-info'>
        <ButtonComponent className='btn-success w-50' buttonName="Book a tour" />
        <ButtonComponent className='btn-outline-danger w-50' buttonName="Cancel" />
      </div>
    )
  }

  return (
    <>
    <div className="container py-5">
      <Row>
        <Col xs={12} lg={6} className="p-2">
          <Card className="h-100">
            <Card.Img
              variant="top"
              src={selectedImage}
              className="img-fluid"
              // objectFit="cover"
              style={{ height: 'auto', maxHeight: '400px' }}
            />
            <Card.Body>
              <div className="d-flex flex-wrap gap-2 justify-content-start">
                {tour?.imageGallery?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Tour ${index + 1}`}
                    className={`img-thumbnail ${img === selectedImage ? 'border border-primary border-2' : ''}`}
                    style={{ width: '70px', height: '70px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={6} className="p-2">
          <Card className="h-100 border-0">
            <Card.Body>
              <h1 className="mb-3">{tour.title}</h1>
              <div className="d-flex align-items-center flex-wrap mb-3 gap-2">
                <Badge bg="success">
                  {tour?.days} Days / {tour?.days - 1} Nights
                </Badge>
                <Badge bg="info">
                  <MdOutlineLocationOn className="me-1" />
                  {tour?.country}
                </Badge>
              </div>

              <div className="mb-4">
                <h3 className="text-primary">
                  <RiMoneyRupeeCircleLine className="me-2" />
                  {tour.budget.toLocaleString('en-IN')} INR
                </h3>
                <p className="text-muted">Per person</p>
              </div>

              <div className="mb-4">
                <h5 className="mb-3">Quick Facts</h5>
                <p><strong>Description:</strong> {tour?.description}</p>
                {tour?.placesCovered?.length > 0 && (
                  <div className="mb-2">
                    <strong>Places Covered:</strong>
                    <ul className="mb-1">
                      {tour.placesCovered.map((place, index) => (
                        <li key={index}>
                          <strong>{place.name}</strong> – {place.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="d-grid gap-2 d-md-flex mb-3">
                <ButtonComponent size="lg" className="w-100 w-md-auto btn-success" buttonName="Book Now" clickFunction={()=>setShowModal(true)} />
                <ButtonComponent size="lg" className="w-100 w-md-auto btn-warning" buttonName="Add to cart" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6} className='p-2'>
          <Card className="h-100">
            <Card.Body className="p-4">
              <h2 className="h4 mb-3 text-primary">Inclusions</h2>
              {tour?.inclusions?.length > 0 ? (
                <ul className="list-unstyled mb-0">
                  {tour.inclusions.map((item, index) => (
                    <li key={index} className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-success">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No inclusions specified</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className='p-2'>
          <Card className="h-100">
            <Card.Body className="p-4">
              <h2 className="h4 mb-3 text-primary">Exclusions</h2>
              {tour?.exclusions?.length > 0 ? (
                <ul className="list-unstyled mb-0">
                  {tour.exclusions.map((item, index) => (
                    <li key={index} className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-danger">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No exclusions specified</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    <ModalComponent
        modalSize="lg"
        modalShow={showModal}
        modalCentered={true}
        showModalHeader={true}
        modalCloseButton={true}
        modalHeader={`Book Tour: ${tour.title}`}
        modalHeaderClassname="text-primary"
        modalBody={modalBody()}
        showModalFooter={false}
        onHide={() => setShowModal(false)}
      />
    </>
  )
}

export default TourDetails
