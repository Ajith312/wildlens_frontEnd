import ButtonComponent from 'Components/Button/Button'
import React from 'react'
import { Badge } from 'react-bootstrap'

const BookingCard = () => {
  return (
    <div className="border rounded-4 p-3 mb-3 bg-light bg-opacity-10">
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
      <div className="mb-2 mb-md-0">
        <div className="d-flex align-items-center gap-2">
          <h5 className="mb-0 fw-semibold">Paris Weekend Getaway</h5>
          <Badge bg="success" className="fs-6">Confirmed</Badge>
        </div>
        <div className="d-flex flex-wrap gap-3 mt-2">
          <span className="text-muted">⏳ June 15-18, 2023</span>
          <span className="text-muted">📍 2 Adults, 1 Room</span>
        </div>
      </div>
      <div className="d-flex gap-2">
        <ButtonComponent className="btn btn-outline-secondary rounded-3" size="sm" buttonName="View Details" />
        <ButtonComponent className="btn btn-outline-danger rounded-3" size="sm" buttonName="Cancel" />
      </div>
    </div>
  </div>
  )
}

export default BookingCard