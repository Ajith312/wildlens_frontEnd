import ButtonComponent from 'Components/Button/Button'
import React from 'react'
import { Badge, Card } from 'react-bootstrap'

const statusVariant = {
  completed: 'success',
  pending: 'warning',
  cancelled: 'danger',
  confirmed: 'info',
}

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return '#198754'
    case 'pending':
      return '#ffc107'
    case 'cancelled':
      return '#dc3545'
    case 'confirmed':
      return '#0dcaf0'
    default:
      return '#6c757d'
  }
}

const BookingHistoryCard = ({ booking }) => {
  return (
    <Card className="booking-history-card mb-3" style={{ '--status-color': getStatusColor(booking?.booking_status) }}>
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="mb-1 text-dark">{booking?.title}</h5>
              <p className="mb-1"><strong>Country:</strong> {booking?.country}</p>
            <small className="text-muted">Booking ID: {booking?._id}</small>
          </div>
          <Badge bg={statusVariant[booking?.booking_status] || 'secondary'} className="text-capitalize">
            {booking?.booking_status}
          </Badge>
        </div>

        <hr className="my-3" />

        <div className="mb-3">
          <h6 className="text-secondary mb-2">Customer Information</h6>
          <div className="ps-2">
            <p className="mb-1"><strong>Booking Person Name:</strong> {booking?.first_name} {booking?.last_name}</p>
            <p className="mb-1"><strong>Address: </strong>{booking?.address}</p>
          </div>
        </div>

        <div className="mb-3">
          <h6 className="text-secondary mb-2">Booking Details</h6>
          <div className="ps-2">
            <p className="mb-1"><strong>Tour Date:</strong>{' '}{new Date(booking?.booking_date).toLocaleDateString()}</p>
            <p className="mb-1"><strong>Address:</strong>{booking?.address}</p>
            <p className="mb-1"><strong>Number Of Persons: </strong>{booking?.number_of_persons}</p>
            <p className="mb-1"><strong>Guide Required: </strong>{booking.guide_required ? "Yes" : "No"}</p>
            <p className="mb-1"><strong>Budget:</strong> ₹{booking?.budget?.toLocaleString()}</p>
          </div>
        </div>

        <div>
          <h6 className="text-secondary mb-2">Payment</h6>
          <div className="ps-2">
            <p className="mb-0">
              <strong>Payment Status:</strong>{' '}
              <Badge bg={statusVariant[booking?.payment_status] || 'secondary'}>{booking?.payment_status}</Badge>
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default BookingHistoryCard