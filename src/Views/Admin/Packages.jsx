import ButtonComponent from 'Components/Button/Button'
import TourCard from 'Components/Card/TourCard'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import JsonData from 'Utils/JsonData'

const Packages = () => {
  const { tourDetails } = JsonData()?.jsonOnly
  const navigate = useNavigate()


  return (
    <Container className='h-100 w-100'>
      <Row className="bookingHeaderBox d-flex justify-content-between">
        <Col xs={12} sm={6} lg={4}>
        <h4 className='d-flex align-items-center mb-0'>Tour packages</h4>
        </Col>
        <Col xs={12} sm={6} lg={4} className="bookingHeaderBtn d-flex gap-2 justify-content-md-end ">
          <ButtonComponent className='btn-success' buttonName="Add Tour" clickFunction={()=>navigate('/admin/addtour')} />
          <ButtonComponent className='btn-success' buttonName="More Action" />
        </Col>
      </Row>
      <Row className="mt-3">
        {tourDetails?.map((tour) => (
          <Col key={tour._id} xs={12} sm={6} lg={4} className='p-2 tour-card-box'>
            <TourCard tour={tour} admin = "true" />
          </Col>
        ))
        }
      </Row>
    </Container>
  )
}

export default Packages