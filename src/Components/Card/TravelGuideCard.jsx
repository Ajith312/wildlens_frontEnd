import React from 'react'
import { Card } from 'react-bootstrap'

const TravelGuideCard = ({ className, src, guidename, desigination }) => {
  return (
    <Card className={className}>
      <Card.Img variant="top" src={src} className="h-75 object-fit-cover bg-success-subtle" />
      <Card.Body className="h-25 d-flex flex-column justify-content-center align-items-center">
        <Card.Title>{guidename}</Card.Title>
        <Card.Subtitle className="text-secondary">{desigination}</Card.Subtitle>
      </Card.Body>
    </Card>
  )
}

export default TravelGuideCard
