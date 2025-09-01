import ButtonComponent from 'Components/Button/Button'
import { useCommonState, useDispatch } from 'Components/CustomHooks'
import Spinner from 'Components/Spinner/CustomSpinner'
import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { getCartDetails, removeFormCart } from 'Redux/Action/Tour.Action'

const ProfileCart = () => {
  const dispatch = useDispatch()
  const { cart_details, loading } = useCommonState()?.tourState

  useEffect(() => {
    dispatch(getCartDetails())
  }, [])

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : cart_details && cart_details.length > 0 ? (
        <Card className="border-0 rounded-4">
          <Card.Body>
            <h4 className="mb-4">My Cart</h4>
            {cart_details.map((tour, index) => (
              <div key={index} className="border rounded-3 p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{tour.title}</h5>
                    <h6>{tour.country}</h6>
                    <p className="text-muted mb-1"> ${tour.budget}</p>
                    <p className="text-muted mb-1">• {tour.days} days</p>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <ButtonComponent
                      className="btn-outline-danger"
                      buttonName="Remove"
                      clickFunction={() => dispatch(removeFormCart(tour._id))}
                    />
                    <ButtonComponent
                      className="btn-outline-success"
                      buttonName="Checkout"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      ) : (
        <div 
          className="d-flex flex-column justify-content-center align-items-center text-center" 
          style={{ minHeight: "50vh" }}
        >
          <p className="fw-bold text-muted fs-4">🛒 Your cart is empty</p>
          <ButtonComponent
            className="btn brand-color mt-3"
            buttonName="Explore Tours"
          />
        </div>
      )}
    </div>
  )
}

export default ProfileCart
