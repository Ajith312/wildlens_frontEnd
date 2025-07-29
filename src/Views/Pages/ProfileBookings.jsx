import ButtonComponent from 'Components/Button/Button'
import BookingCard from 'Components/Card/BookingCard'
import React from 'react'
import { Card} from 'react-bootstrap'

const ProfileBookings = () => {
  return (
    <Card className="border-0 rounded-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Upcoming Bookings</h4>
                <ButtonComponent className='btn btn-outline-primary rounded-3' size='sm' buttonName="+ New Booking" /> 
              </div>
              <BookingCard />
              <BookingCard />
              <BookingCard />
              <BookingCard />
            </Card.Body>
          </Card>
  )
}

export default ProfileBookings