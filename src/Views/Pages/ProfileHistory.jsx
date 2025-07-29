import ButtonComponent from 'Components/Button/Button'
import React from 'react'
import { Button, Card } from 'react-bootstrap'

const ProfileHistory = () => {
  return (
    <Card className="border-0 rounded-4">
    <Card.Body>
      <h4 className="mb-4">Booking History</h4>
      <div className="border rounded-3 p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5>Bali Adventure</h5>
            <p className="text-muted mb-1">Completed • May 1-8, 2022</p>
            <div className="text-warning">★★★★☆</div>
          </div>
          <ButtonComponent className="btn-outline-success" buttonName="Book Again" />
        </div>
      </div>
      <div className="border rounded-3 p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5>Bali Adventure</h5>
            <p className="text-muted mb-1">Completed • May 1-8, 2022</p>
            <div className="text-warning">★★★★☆</div>
          </div>
          <ButtonComponent className="btn-outline-success" buttonName="Book Again" />
        </div>
      </div>
      <div className="border rounded-3 p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5>Bali Adventure</h5>
            <p className="text-muted mb-1">Completed • May 1-8, 2022</p>
            <div className="text-warning">★★★★☆</div>
          </div>
          <ButtonComponent className="btn-outline-success" buttonName="Book Again" />
        </div>
      </div>
    </Card.Body>
  </Card>
  )
}

export default ProfileHistory