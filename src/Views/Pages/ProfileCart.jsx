import ButtonComponent from 'Components/Button/Button'
import React from 'react'
import { Button, Card } from 'react-bootstrap'

const ProfileCart = () => {
  return (
    <Card className="border-0 rounded-4">
    <Card.Body>
      <h4 className="mb-4">My Cart</h4>
      <div className="border rounded-3 p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5>Tokyo City Tour</h5>
            <p className="text-muted mb-1">$450 • 2 adults</p>
          </div>
          <div>
            <ButtonComponent className=" btn-outline-danger me-2" buttonName="Remove" />
            <ButtonComponent className=" btn-outline-success" buttonName="Checkout" />
          </div>
        </div>
      </div>
    </Card.Body>
  </Card>
  )
}

export default ProfileCart