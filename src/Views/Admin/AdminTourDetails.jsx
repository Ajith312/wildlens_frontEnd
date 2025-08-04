import React, { useState } from 'react';
import { Row, Col, Card, Badge, Form, Button, Image as BootstrapImage } from 'react-bootstrap';
import { MdOutlineLocationOn, MdDelete, MdAddPhotoAlternate, MdEdit } from 'react-icons/md';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { FaSave, FaTimes } from 'react-icons/fa';

const AdminTourDetails = () => {

const [isEditing,setIsEditing] = useState(false)
  const tour = {
    title: "Bali Adventure Tour",
    description: "Explore the beautiful island of Bali with our guided adventure tour package.",
    days: 7,
    country: "Indonesia",
    budget: 35000,
    imageGallery: [
        "https://img.etb2bimg.com/files/cp/upload-16321079503320-safari.jpg",
        "https://www.tourmyindia.com/blog//wp-content/uploads/2018/06/Willdife-Holidays-in-India.jpg",
        "https://i.assetzen.net/i/9Sf9fjP1eYpd/w:1200/h:808/q:70.jpg",
        "https://www.fondationsegre.org/wp-content/uploads/2019/11/RAP-Tiger-and-cubs-Bandipur_Augustine-Prince_WTI-1-750x400.jpg"
      ],
    placesCovered: [
      { name: "Ubud", description: "Cultural heart of Bali with art markets and temples" },
      { name: "Uluwatu", description: "Famous for its cliffside temple and surf spots" },
      { name: "Seminyak", description: "Luxury beach resorts and vibrant nightlife" }
    ],
    inclusions: [
      "6 nights accommodation",
      "Daily breakfast",
      "Airport transfers",
      "Guided tours"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Visa fees"
    ]
  };

  const selectedImage = tour.imageGallery[0];

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Tour Management</h1>
        <div className="d-flex gap-2">
          {isEditing ? (
            <>
              <Button variant="success" className="d-flex align-items-center gap-2" onClick={()=>setIsEditing(false)}>
                <FaSave /> Save
              </Button>
              <Button variant="outline-secondary" className="d-flex align-items-center gap-2" onClick={()=>setIsEditing(false)}>
                <FaTimes /> Cancel
              </Button>
            </>
          ) : (
            <Button variant="primary" className="d-flex align-items-center gap-2" onClick={()=>setIsEditing(true)}>
              <MdEdit /> Edit Tour
            </Button>
          )}
          <Button variant="danger" className="d-flex align-items-center gap-2" onClick={()=>setIsEditing(false)}>
            <MdDelete /> Delete Tour
          </Button>
        </div>
      </div>

      {/* Main content */}
      <Row>
        {/* Image gallery column */}
        <Col xs={12} lg={6} className="p-2">
          <Card className="h-100">
            <Card.Img
              variant="top"
              src={selectedImage}
              className="img-fluid"
              style={{ height: 'auto', maxHeight: '400px', objectFit: 'cover' }}
            />
            <Card.Body>
              <div className="d-flex flex-wrap gap-2 justify-content-start">
                {tour.imageGallery.map((img, index) => (
                  <div key={index} className="position-relative">
                    <BootstrapImage
                      src={img}
                      alt={`Tour ${index + 1}`}
                      thumbnail
                      className={`${img === selectedImage ? 'border border-primary border-2' : ''}`}
                      style={{ width: '70px', height: '70px', objectFit: 'cover', cursor: 'pointer' }}
                    />
                    {isEditing && (
                      <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-50 end-0 translate-middle"
                        style={{ zIndex: 1 }}
                      >
                        <MdDelete />
                      </Button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <Button
                    variant="outline-primary"
                    style={{ width: '70px', height: '70px' }}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <MdAddPhotoAlternate size={24} />
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Tour details column */}
        <Col xs={12} lg={6} className="p-2">
          <Card className="h-100 border-0">
            <Card.Body>
              {isEditing ? (
                <Form.Group controlId="title" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={tour.title}
                  />
                </Form.Group>
              ) : (
                <h1 className="mb-3">{tour.title}</h1>
              )}

              <div className="d-flex align-items-center flex-wrap mb-3 gap-2">
                {isEditing ? (
                  <>
                    <Form.Group controlId="days" className="me-3">
                      <Form.Label>Days</Form.Label>
                      <Form.Control
                        type="number"
                        defaultValue={tour.days}
                      />
                    </Form.Group>
                    <Form.Group controlId="country">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={tour.country}
                      />
                    </Form.Group>
                  </>
                ) : (
                  <>
                    <Badge bg="success">
                      {tour.days} Days / {tour.days - 1} Nights
                    </Badge>
                    <Badge bg="info">
                      <MdOutlineLocationOn className="me-1" />
                      {tour.country}
                    </Badge>
                  </>
                )}
              </div>

              <div className="mb-4">
                {isEditing ? (
                  <Form.Group controlId="budget">
                    <Form.Label>Price (INR)</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <RiMoneyRupeeCircleLine />
                      </span>
                      <Form.Control
                        type="number"
                        defaultValue={tour.budget}
                      />
                    </div>
                  </Form.Group>
                ) : (
                  <>
                    <h3 className="text-primary">
                      <RiMoneyRupeeCircleLine className="me-2" />
                      {tour.budget.toLocaleString('en-IN')} INR
                    </h3>
                    <p className="text-muted">Per person</p>
                  </>
                )}
              </div>

              <div className="mb-4">
                <h5 className="mb-3">Quick Facts</h5>
                {isEditing ? (
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      defaultValue={tour.description}
                    />
                  </Form.Group>
                ) : (
                  <p><strong>Description:</strong> {tour.description}</p>
                )}

                <h6 className="mt-4 mb-2">Places Covered</h6>
                {isEditing ? (
                  <>
                    {tour.placesCovered.map((place, index) => (
                      <div key={index} className="mb-3 p-2 border rounded">
                        <Form.Group controlId={`placeName-${index}`} className="mb-2">
                          <Form.Label>Place Name</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={place.name}
                          />
                        </Form.Group>
                        <Form.Group controlId={`placeDesc-${index}`}>
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            defaultValue={place.description}
                          />
                        </Form.Group>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="mt-2"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="mt-2"
                    >
                      Add Place
                    </Button>
                  </>
                ) : (
                  <ul className="mb-1">
                    {tour.placesCovered.map((place, index) => (
                      <li key={index}>
                        <strong>{place.name}</strong> – {place.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Inclusions & Exclusions */}
      <Row className="mb-4">
        <Col md={6} className='p-2'>
          <Card className="h-100">
            <Card.Body className="p-4">
              <h2 className="h4 mb-3 text-primary">Inclusions</h2>
              {isEditing ? (
                <>
                  {tour.inclusions.map((item, index) => (
                    <div key={index} className="mb-2 d-flex align-items-center">
                      <Form.Control
                        type="text"
                        defaultValue={item}
                        className="me-2"
                      />
                      <Button
                        variant="outline-danger"
                        size="sm"
                      >
                        <MdDelete />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline-primary"
                    size="sm"
                  >
                    Add Inclusion
                  </Button>
                </>
              ) : (
                <ul className="list-unstyled mb-0">
                  {tour.inclusions.map((item, index) => (
                    <li key={index} className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-success">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className='p-2'>
          <Card className="h-100">
            <Card.Body className="p-4">
              <h2 className="h4 mb-3 text-primary">Exclusions</h2>
              {isEditing ? (
                <>
                  {tour.exclusions.map((item, index) => (
                    <div key={index} className="mb-2 d-flex align-items-center">
                      <Form.Control
                        type="text"
                        defaultValue={item}
                        className="me-2"
                      />
                      <Button
                        variant="outline-danger"
                        size="sm"
                      >
                        <MdDelete />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline-primary"
                    size="sm"
                  >
                    Add Exclusion
                  </Button>
                </>
              ) : (
                <ul className="list-unstyled mb-0">
                  {tour.exclusions.map((item, index) => (
                    <li key={index} className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-danger">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminTourDetails;