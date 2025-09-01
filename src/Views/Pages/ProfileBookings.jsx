import ButtonComponent from 'Components/Button/Button'
import BookingCard from 'Components/Card/BookingCard'
import { useCommonState, useDispatch } from 'Components/CustomHooks'
import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { getUpcomingBookings } from 'Redux/Action/Tour.Action'

const ProfileBookings = () => {
  const dispatch = useDispatch()
  const { upcoming_bookings } = useCommonState()?.tourState

  useEffect(() => {
    dispatch(getUpcomingBookings())
  }, [])
  return (
    <Card className="border-0 rounded-4">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">Upcoming Bookings</h4>
          <ButtonComponent className='btn btn-outline-primary rounded-3' size='sm' buttonName="+ New Booking" />
        </div>
        {upcoming_bookings?.length > 0 ? upcoming_bookings?.map((booking, index) => {
            return <BookingCard key={index} booking={booking} />
          }) : (
            <div
              className="d-flex flex-column justify-content-center align-items-center text-center"
              style={{ minHeight: "50vh" }}>
              <p className="fw-bold text-muted fs-4">No Bookings Available</p>
              <ButtonComponent
                className="btn brand-color"
                buttonName="Book A Tour"
              />
            </div>
          )
        }
      </Card.Body>
    </Card>
  )
}

export default ProfileBookings