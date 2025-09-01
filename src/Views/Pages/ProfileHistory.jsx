import ButtonComponent from 'Components/Button/Button'
import { useCommonState, useDispatch } from 'Components/CustomHooks'
import React, { useEffect } from 'react'
import { format, addDays } from "date-fns"
import { Card } from 'react-bootstrap'
import { getBookingHistory } from 'Redux/Action/Tour.Action'

const ProfileHistory = () => {
  const dispatch = useDispatch()
  const { booking_history } = useCommonState()?.tourState

  useEffect(() => {
    dispatch(getBookingHistory())
  }, [])

  return (
    <Card className="border-0 rounded-4">
      <Card.Body>
        <h4 className="mb-4 text-primary">Booking History</h4>
        {booking_history?.length > 0 ? booking_history.map((booking) => {
            const startDate = booking?.booking_date ? new Date(booking.booking_date) : null
            const endDate = startDate ? addDays(startDate, booking?.days || 0) : null

            return (
              <div className="border rounded-3 p-3 mb-3" key={booking?._id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{booking.title}</h5>
                    <p className="text-muted mb-1">Completed</p>
                    {startDate && endDate ? (
                        <span className="text-muted">
                          📅 {format(startDate, "dd/MM/yyyy")} → {format(endDate, "dd/MM/yyyy")}
                        </span>
                      ) : (
                        <span className="text-muted">📅 Date not available</span>
                      )
                    }
                    <div className="text-warning">★★★★☆</div>
                  </div>
                  <ButtonComponent className="btn-outline-success" buttonName="Book Again" />
                </div>
              </div>
            )
        }) : (
          <div
            className="d-flex flex-column justify-content-center align-items-center text-center"
            style={{ minHeight: "50vh" }}
          >
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

export default ProfileHistory
