import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Card, Badge, Form } from 'react-bootstrap'
import { MdOutlineLocationOn } from 'react-icons/md'
import { RiMoneyRupeeCircleLine } from 'react-icons/ri'
import ButtonComponent from 'Components/Button/Button'
import ModalComponent from 'Components/Modal/Modal'
import { useCommonState, useDispatch } from 'Components/CustomHooks'
import { addToCart, getAllTours, getCartDetails, handleBookingTourInputs, handleBookTour, removeFormCart } from 'Redux/Action/Tour.Action'

const TourDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { tour_package_details, booking_details, loading, cart_details } = useCommonState()?.tourState
  const [showModal, setShowModal] = useState(false)
  const [tour, setTour] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const tourDetail = tour_package_details?.find(t => t._id === id);
    if (!tourDetail) {
      dispatch(getAllTours())
    } else {
      setTour(tourDetail)
    }
  }, [tour_package_details, id]);

  useEffect(() => {
    if (tour && !selectedImage) {
      setSelectedImage(tour?.imageGallery?.[0] || null)
    }
  }, [tour, selectedImage])

  useEffect(() => {
    dispatch(getCartDetails())
  }, [])

  if (!tour) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '35vh' }}>
        <p className='fs-2 text-secondary'>Loading tour details...</p>
      </div>
    )
  }

  if (!selectedImage && tour?.imageGallery?.length > 0) {
    setSelectedImage(tour.imageGallery[0])
  }

  const isInCart = (id) => {
    return cart_details?.some(item => item.tour_id === id)
  }

  const handleSubmit = () => {
    dispatch(handleBookTour({
      payload: booking_details,
      tourId: id
    }))
    setShowModal(false)
  }

  const handleRemoveFormCart = (id) => {
    const cart = cart_details.find(cart => cart.tour_id === id)
    if (cart) {
      dispatch(removeFormCart(cart._id))
    }
  }

  function modalBody() {
    return (
      <Form >
        <Row className="mb-2">
          <Col md={6} className='p-2'>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={booking_details?.first_name || ''}
                onChange={(e) => dispatch(handleBookingTourInputs({ first_name: e.target.value }))}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} className='p-2'>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={booking_details?.last_name || ''}
                onChange={(e) => dispatch(handleBookingTourInputs({ last_name: e.target.value }))}
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
            value={booking_details?.address || ''}
            onChange={(e) => dispatch(handleBookingTourInputs({ address: e.target.value }))}
            required
          />
        </Form.Group>

        <Row className="mb-2">
          <Col md={6} className='p-2'>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="booking_date"
                value={booking_details?.booking_date || ''}
                onChange={(e) => dispatch(handleBookingTourInputs({ booking_date: e.target.value }))}
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
                name="number_of_persons"
                min="1"
                max="20"
                value={booking_details?.number_of_persons || ''}
                onChange={(e) => dispatch(handleBookingTourInputs({ number_of_persons: e.target.value }))}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-2 p-2" controlId="requiresGuide">
          <Form.Check
            type="checkbox"
            label="Require a tour guide?"
            name="guide_required"
            checked={booking_details?.guide_required || false}
            onChange={(e) =>
              dispatch(handleBookingTourInputs({ guide_required: e.target.checked }))
            }
          />

        </Form.Group>

        <Form.Group className="mb-2 p-2" controlId="comments">
          <Form.Label>Special Requests/Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="comments"
            value={booking_details?.comments || ''}
            onChange={(e) => dispatch(handleBookingTourInputs({ comments: e.target.value }))}
          />
        </Form.Group>

        <div className="d-flex gap-4 w-100 p-2">
          <ButtonComponent
            type="button"
            className="btn-success w-50"
            buttonName="Confirm Booking"
            clickFunction={handleSubmit}
          />
          <ButtonComponent
            type="button"
            className="btn-outline-danger w-50"
            buttonName="Cancel"
            clickFunction={() => setShowModal(false)}
          />
        </div>
      </Form>
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
                <h1 className="mb-3">{tour?.title}</h1>
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
                    {tour?.budget.toLocaleString('en-IN')} INR
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
                  <ButtonComponent size="lg" className="w-100 w-md-auto btn-success" buttonName="Book Now" clickFunction={() => setShowModal(true)} />
                  <ButtonComponent size="lg"
                    className={isInCart(id) ? "w-100 w-md-auto btn-danger" : "w-100 w-md-auto btn-warning"}
                    buttonName={isInCart(id) ? "Remove from Cart" : "Add to Cart"}
                    clickFunction={() => isInCart(id) ? handleRemoveFormCart(id) : dispatch(addToCart(id))} loading={loading} />
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
                    {tour?.inclusions?.map((item, index) => (
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
                    {tour?.exclusions?.map((item, index) => (
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
