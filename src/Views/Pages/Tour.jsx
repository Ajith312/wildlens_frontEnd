import React from 'react';
import {Row, Col, Card, Form, Button } from 'react-bootstrap';
import TourCard from 'Components/Card/TourCard';
import Image from 'Utils/Image';
import { IoMdStar } from 'react-icons/io';
import ButtonComponent from 'Components/Button/Button';
import JsonData from 'Utils/JsonData';

const Tour = () => {
  const {jsonOnly} = JsonData()
  const tourDetails = []
  return (
    <div className="container-fluid d-flex flex-column p-0">
      <div className="coverImageContainer d-flex justify-content-center align-items-center position-relative">
        <img src={Image.heroSection} alt="cover-image" className="coverImage w-100 h-100"/>
        <p className="coverText position-absolute text-white fw-bold">Explore Tours</p>
      </div>

      <Row className='my-4'>
        <Col xs={12} md={4} lg={3} className="mb-4">
          <Card className="p-3  sticky-top" style={{ top: '100px' }}>
            <h5 className="mb-3">Filter Tours</h5>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Select>
                <option value="">All Countries</option>
                <option value="France">France</option>
                <option value="Italy">Italy</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price Range: $1,00,000 - $7,00,000</Form.Label>
              <Form.Range min={0} max={300000}/>
              <Form.Range min={500000} max={700000}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (days)</Form.Label>
              <Form.Select>
                <option value="">Any</option>
                <option value="3">3 Days</option>
                <option value="5">5 Days</option>
                <option value="7">7 Days</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Minimum Rating</Form.Label>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="link"
                    className={`p-0 me-1 text-muted`}
                  >
                    <span><IoMdStar className='text-muted' size={25} /></span>
                  </Button>
                ))}
              </div>
            </Form.Group>
            <ButtonComponent className="btn-outline-danger w-100" buttonName="Reset Filters" />
          </Card>
        </Col>

        <Col xs={12} md={8} lg={9} className="px-3">
          <Row className="">
            {
              jsonOnly?.tourDetails?.map((tour)=>(
                <Col key={tour._id} xs={12} sm={6} lg={4} className='p-2 tour-card-box'>
                <TourCard tour={tour} />
              </Col>
              ))
            }
            
          </Row>
        </Col>

      </Row>
    </div>
  );
};

export default Tour;
