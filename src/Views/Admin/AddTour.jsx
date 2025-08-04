import React, { useState } from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap'

const AddTourForm = ({ onSubmit }) => {
  const [tourDetails, setTourDetails] = useState({
    title: '',
    country: '',
    description: '',
    image: ''
  })

  const [plan, setPlan] = useState({
    days: '',
    budget: '',
    title: '',
    description: '',
    inclusions: '',
    exclusions: '',
    imageGallery: '',
    placesCovered: [
      { name: '', description: '', image: '' }
    ]
  })

  const handleTourChange = (e) => {
    setTourDetails({ ...tourDetails, [e.target.name]: e.target.value })
  }

  const handlePlanChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value })
  }

  const handlePlaceChange = (index, field, value) => {
    const updated = [...plan.placesCovered]
    updated[index][field] = value
    setPlan({ ...plan, placesCovered: updated })
  }

  const addPlace = () => {
    setPlan({ ...plan, placesCovered: [...plan.placesCovered, { name: '', description: '', image: '' }] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      tour_details: tourDetails,
      plan_details: [{
        ...plan,
        days: Number(plan.days),
        budget: Number(plan.budget),
        inclusions: plan.inclusions.split(',').map(item => item.trim()),
        exclusions: plan.exclusions.split(',').map(item => item.trim()),
        imageGallery: plan.imageGallery.split(',').map(url => url.trim())
      }]
    }
    if (onSubmit) onSubmit(payload)
    else console.log('Form Submitted:', payload)
  }

  return (
    <Form onSubmit={handleSubmit} className='p-4 border rounded bg-white'>
      <h4 className='text-success mb-4'>Add Tour</h4>

      <Row className='mb-3'>
        <Col md={6} className='p-2'>
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={tourDetails.title} onChange={handleTourChange} placeholder="Tour Title" />
        </Col>
        <Col md={6} className='p-2'>
          <Form.Label>Country</Form.Label>
          <Form.Control name="country" value={tourDetails.country} onChange={handleTourChange} placeholder="Country" />
        </Col>
      </Row>

      <Form.Group className='mb-3 p-2'>
        <Form.Label>Description</Form.Label>
        <Form.Control name="description" as="textarea" rows={2} value={tourDetails.description} onChange={handleTourChange} />
      </Form.Group>

      <Form.Group className='mb-4 p-2'>
        <Form.Label>Image URL</Form.Label>
        <Form.Control name="image" value={tourDetails.image} onChange={handleTourChange} placeholder="https://example.com/image.jpg" />
      </Form.Group>

      <h5 className='text-primary mb-3'>Plan Details</h5>

      <Row className='mb-3'>
        <Col md={4} className='p-2'>
          <Form.Label>Days</Form.Label>
          <Form.Select name="days" value={plan.days} onChange={handlePlanChange}>
            <option value="">Select Days</option>
            <option value="3">3 Days</option>
            <option value="5">5 Days</option>
            <option value="7">7 Days</option>
          </Form.Select>
        </Col>
        <Col md={4} className='p-2'>
          <Form.Label>Budget</Form.Label>
          <Form.Control name="budget" type="number" value={plan.budget} onChange={handlePlanChange} />
        </Col>
        <Col md={4} className='p-2'>
          <Form.Label>Plan Title</Form.Label>
          <Form.Control name="title" value={plan.title} onChange={handlePlanChange} />
        </Col>
      </Row>

      <Form.Group className='mb-3 p-2'>
        <Form.Label>Plan Description</Form.Label>
        <Form.Control as="textarea" name="description" rows={2} value={plan.description} onChange={handlePlanChange} />
      </Form.Group>

      <Form.Group className='mb-3 p-2'>
        <Form.Label>Inclusions (comma-separated)</Form.Label>
        <Form.Control name="inclusions" value={plan.inclusions} onChange={handlePlanChange} />
      </Form.Group>

      <Form.Group className='mb-3 p-2'>
        <Form.Label>Exclusions (comma-separated)</Form.Label>
        <Form.Control name="exclusions" value={plan.exclusions} onChange={handlePlanChange} />
      </Form.Group>

      <Form.Group className='mb-3 p-2'>
        <Form.Label>Image Gallery URLs (comma-separated)</Form.Label>
        <Form.Control name="imageGallery" value={plan.imageGallery} onChange={handlePlanChange} />
      </Form.Group>

      <h6 className='mt-4 mb-2'>Places Covered</h6>
      {plan.placesCovered.map((place, index) => (
        <div key={index} className='border rounded p-3 mb-3'>
          <Row className='mb-2'>
            <Col md={4} className='p-2'>
              <Form.Label>Place Name</Form.Label>
              <Form.Control
                value={place.name}
                onChange={(e) => handlePlaceChange(index, 'name', e.target.value)}
              />
            </Col>
            <Col md={4} className='p-2'>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                value={place.image}
                onChange={(e) => handlePlaceChange(index, 'image', e.target.value)}
              />
            </Col>
          </Row>
          <Form.Group className='p-2'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={place.description}
            onChange={(e) => handlePlaceChange(index, 'description', e.target.value)}
          />
          </Form.Group>
        </div>
      ))}
      <Button variant="outline-secondary" onClick={addPlace} className="mb-4">+ Add Another Place</Button>

      <div className='d-flex gap-3'>
        <Button variant='success' type='submit'>Submit Tour</Button>
        <Button variant='secondary' type='reset'>Cancel</Button>
      </div>
    </Form>
  )
}

export default AddTourForm
