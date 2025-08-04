import React from 'react'
import { Badge, Card, Row, Col } from 'react-bootstrap'
import { BsThreeDotsVertical } from 'react-icons/bs'

const statusVariant = {
  completed: 'success',
  pending: 'warning',
  cancelled: 'danger',
}

const BookingHistoryCard = ({ booking, index }) => {
  return (
    <Card className='mb-2'>
      <Card.Body>
        <Row className='align-items-center'>
            <Col md={1}><span className="fw-bold text-secondary text-start">#{booking?.number || index + 1}</span></Col>
            <Col xs={12} md={5} className="d-flex justify-content-between justify-content-md-evenly align-items-center mb-2 mb-md-0" >
                <h6 className="mb-0">{booking?.product}</h6>
                <small className="text-muted">ID: {booking?.id}</small>
            </Col>
          <Col xs={12} md={6} className='d-flex flex-wrap justify-content-between justify-content-md-evenly align-items-center gap-3'>
            <div className="fw-bold text-dark">${booking?.price?.toFixed(2)}</div>
            <small className="text-muted">{booking?.date}</small>
            <Badge bg={statusVariant[booking?.status] || 'secondary'}className="px-3 py-1 text-capitalize">
              {booking?.status}
            </Badge>
            <BsThreeDotsVertical className="text-muted cursor-pointer" />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default BookingHistoryCard
