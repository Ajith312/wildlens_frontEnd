import React from 'react'
import { Card,Button } from 'react-bootstrap'

const ProfileNotification = () => {
  return (
    <Card className="border-0 rounded-4">
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Notifications</h4>
        <Button variant="link" className="text-decoration-none">Mark all as read</Button>
      </div>
      <div className="border rounded-3 p-3 mb-3 bg-light">
        <div className="d-flex">
          <div className="me-3 text-primary">🔔</div>
          <div>
            <h6>Special discount available!</h6>
            <p className="text-muted mb-0">Get 20% off your next booking</p>
            <small className="text-muted">2 hours ago</small>
          </div>
        </div>
      </div>
    </Card.Body>
  </Card>
  )
}

export default ProfileNotification