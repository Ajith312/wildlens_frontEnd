import ButtonComponent from 'Components/Button/Button'
import BookingHistoryCard from 'Components/Card/BookingHistoryCard'
import DashboardCard from 'Components/Card/DashboardCard'
import OrdersTable from 'Components/Table/OrderTable'
import React, { useState } from 'react'
import { Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'

const Bookings = () => {

  const [tab,setTab] = useState('all')
  const bookingCards = [{
    title: "Total Bookings",
    value: 288,
    changePercentage: '24.6'
  },
  {
    title: "New Bookings",
    value: 45,
    changePercentage: '10.6'
  },
  {
    title: "Completed Bookings",
    value: 145,
    changePercentage: '21.6'
  },
  {
    title: "Cancelled Bookings",
    value: 8,
    changePercentage: '5.6'
  },
  ]
  const orders = [
    { id: '#ORD0001', product: 'wild tour adventure male', date: '01-01-2025', price: 49.99, paid: true, status: 'completed' },
    { id: '#ORD0001', product: "wild tour Travel humb", date: '01-01-2025', price: 14.99, paid: false, status: 'pending', },
    { id: '#ORD0001', product: "wild tour", date: '01-01-2025', price: 49.99, paid: true, status: 'cancelled', },
    { id: '#ORD0001', product: 'wild tour', date: '01-01-2025', price: 49.99, paid: true, status: 'completed' },
    { id: '#ORD0001', product: "wild tour", date: '01-01-2025', price: 14.99, paid: false, status: 'pending', },
    { id: '#ORD0001', product: "wild tour", date: '01-01-2025', price: 49.99, paid: true, status: 'cancelled', },
    { id: '#ORD0001', product: 'wild tour', date: '01-01-2025', price: 49.99, paid: true, status: 'completed' },
    { id: '#ORD0001', product: "wild tour", date: '01-01-2025', price: 14.99, paid: false, status: 'pending', },
    { id: '#ORD0001', product: "wild tour", date: '01-01-2025', price: 49.99, paid: true, status: 'cancelled', },
  ];

  return (
    <Container fluid className="py-3">
      <Row className="align-items-center mb-4">
        <Col xs={12} md={4}>
          <h4 className='mb-0'>Booking List</h4>
        </Col>
        <Col xs={12} md={8} className="booking-actions d-flex gap-2 justify-content-md-end mt-2 mt-md-0">
          <ButtonComponent className='btn-success' buttonName="Add Booking" />
          <ButtonComponent className='btn-success' buttonName="More Action" />
        </Col>
      </Row>

      <Row className="mb-4">
        {bookingCards.map((item, i) => (
          <Col key={i} xs={12} sm={6} lg={3} className="mb-3 mb-lg-0 p-2 d-flex">
            <DashboardCard item={item} className="flex-fill" />
          </Col>
        ))}
      </Row>

      <Card className="booking-cards-container">
        <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className='col-5 bg-success-subtle d-flex justify-content-between align-items-center p-2 rounded-2 cursor-pointer'>
            <div className={tab === "all" ? "filterTabBtn" : "" } onClick={()=>setTab('all')}>All Order</div>
            <div className={tab === "completed" ? "filterTabBtn" : "" } onClick={()=>setTab('completed')}>Completed</div>
            <div className={tab === "pending" ? "filterTabBtn" : "" } onClick={()=>setTab('pending')}>Pending</div>
            <div className={tab === "cancelled" ? "filterTabBtn" : "" } onClick={()=>setTab('cancelled')}>Cancelled</div>
          </div>
          <InputGroup className="w-50">
            <InputGroup.Text><BsSearch /></InputGroup.Text>
            <Form.Control placeholder="Search" />
          </InputGroup>
        </div>

        <div className="booking-cards-list">
          {orders?.map((booking, index) => (
            <BookingHistoryCard key={index} booking={booking} index={index} />
          ))}
        </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Bookings