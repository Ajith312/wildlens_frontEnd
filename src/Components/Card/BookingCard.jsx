import ButtonComponent from 'Components/Button/Button'
import React from 'react'
import { Badge } from 'react-bootstrap'
import { format, addDays } from "date-fns"
import { useCustomNavigate } from 'Components/CustomHooks'

const BookingCard = ({ booking }) => {
  const navigate = useCustomNavigate()
  const startDate = new Date(booking?.booking_date)
  const endDate = addDays(startDate, booking?.days || 0)

  const getStatusBadge = (status) => {
      switch (status) {
        case 'confirmed':
          return <Badge bg="success" className='mb-0 p-2'>Confirmed</Badge>;
        case 'pending':
          return <Badge bg="warning" className='mb-0 p-2'>Pending</Badge>;
        default:
          return <Badge bg="secondary" className='mb-0 p-2'>Unknown</Badge>;
      }
    };

  return (
    <div className="border rounded-4 p-3 mb-3 bg-light bg-opacity-10 shadow-sm">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">

        <div className="mb-2 mb-md-0">
          <div className="d-flex align-items-center gap-2">
            <h5 className="mb-0 fw-semibold">{booking?.title}</h5>
            <p className="text-muted mb-0 fs-5">{getStatusBadge(booking?.booking_status)}</p>
          </div>
          <div className="d-flex flex-wrap gap-3 mt-2">
            <span className="text-muted">
              📅 {format(startDate, "dd/MM/yyyy")} → {format(endDate, "dd/MM/yyyy")}
            </span>
            <span className="text-muted">👥 {booking?.number_of_persons} persons</span>
            <span className="text-muted">💳 Payment: {booking?.payment_status}</span>
          </div>
        </div>


        <div className="d-flex gap-2">
          <ButtonComponent className="btn btn-outline-secondary rounded-3" size="sm"
           buttonName="View Details"
            clickFunction={()=>navigate(`/user/tour/${booking?.tour_id}`)} />
          <ButtonComponent className="btn btn-outline-danger rounded-3" size="sm" buttonName="Cancel" />
        </div>
      </div>
    </div>
  )
}

export default BookingCard
