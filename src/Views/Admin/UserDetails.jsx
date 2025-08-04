import React from 'react';
import { Card, Table, Badge, Button, Image, ProgressBar, Tab, Tabs } from 'react-bootstrap';
import { FiMail, FiPhone, FiUser, FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import JsonData from 'Utils/JsonData';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const { userDetails } = JsonData()?.jsonOnly || {};

  const user = userDetails?.find(user => user.id === id);
  
  if (!user) {
    return <div className="container-fluid py-5 text-center">User not found</div>;
  }

  const totalBookings = (user?.bookings?.upcoming?.length || 0) +(user?.bookings?.history?.length || 0);
  const upcomingCount = user?.bookings?.upcoming?.length || 0;
  const historyCount = user?.bookings?.history?.length || 0;
 
  const totalSpent = user?.bookings?.history?.reduce((sum, booking) => {
    const amount = parseFloat(booking.amount.replace(/[^0-9.-]+/g, ''));
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0) || 0;

  const favoriteDestination = user?.bookings?.history?.reduce((acc, booking) => {
    acc[booking.tour] = (acc[booking.tour] || 0) + 1;
    return acc;
  }, {});

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed':
        return <Badge bg="success">Confirmed</Badge>;
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'completed':
        return <Badge bg="primary">Completed</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Details</h2>
        <Button variant="outline-secondary">
          <BsThreeDotsVertical />
        </Button>
      </div>

      <div className="row">
        <div className="col-lg-4 p-2">
          <Card className="h-100">
            <Card.Body className="text-center">
              <Image 
                src={user.avatar} 
                roundedCircle 
                width={120} 
                height={120} 
                className="mb-3 border"
                alt={`${user.name}'s avatar`}
              />
              <h3>{user.name}</h3>
              <p className="text-muted">User ID: {user.id}</p>
              
              <div className="d-flex justify-content-center mb-3">
                <Badge bg={user.status === 'active' ? 'success' : 'secondary'}>
                  {user.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="text-start mb-4">
                <div className="d-flex align-items-center mb-2">
                  <FiMail className="me-2" />
                  <span>{user.email}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <FiPhone className="me-2" />
                  <span>{user.phone}</span>
                </div>
                <div className="d-flex align-items-center">
                  <FiCalendar className="me-2" />
                  <span>Member since {user.joinDate}</span>
                </div>
              </div>
              <Button variant="success" className="me-2">Edit Profile</Button>
              <Button variant="outline-secondary">Message</Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-8 p-2">
        <Card className="h-100 border-0">
          <Card.Body className="p-0">
            <Tabs 
              defaultActiveKey="upcoming"
              className="custom-tabs mb-3 px-3 pt-2"
            >
              <Tab 
                eventKey="upcoming" 
                title={
                  <div className="d-flex align-items-center">
                    <span>Upcoming</span>
                    {upcomingCount > 0 && (
                      <Badge pill bg="success" className="ms-2">
                        {upcomingCount}
                      </Badge>
                    )}
                  </div>
                }
              >
                <div className="table-responsive">
                <Table hover className="mb-0">
                      <thead>
                        <tr>
                          <th>Tour</th>
                          <th>Date</th>
                          <th>Guests</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.bookings?.upcoming?.map((booking, index) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                {/* <Image 
                                  src={booking?.image} 
                                  width={40} 
                                  height={40} 
                                  className="me-2 rounded"
                                  alt={`${booking.tour} thumbnail`}
                                /> */}
                                {booking.tour}
                              </div>
                            </td>
                            <td>{booking.date}</td>
                            <td>{booking.guests}</td>
                            <td>{booking.amount}</td>
                            <td>{getStatusBadge(booking.status)}</td>
                            <td>
                              <Button variant="light" size="sm">
                                <BsThreeDotsVertical />
                              </Button>
                            </td>
                          </tr>
                        )) || (
                          <tr>
                            <td colSpan="6" className="text-center text-muted py-4">
                              No upcoming bookings
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                </div>
              </Tab>
              <Tab 
                eventKey="history" 
                title={
                  <div className="d-flex align-items-center">
                    <span>History</span>
                    {historyCount > 0 && (
                      <Badge pill bg="success" className="ms-2">
                        {historyCount}
                      </Badge>
                    )}
                  </div>
                }
              >
                <div className="table-responsive">
                <Table hover className="mb-0">
                      <thead>
                        <tr>
                          <th>Tour</th>
                          <th>Date</th>
                          <th>Guests</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.bookings?.history?.map((booking, index) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                {/* <Image 
                                  src={booking.image} 
                                  width={40} 
                                  height={40} 
                                  className="me-2 rounded"
                                  alt={`${booking.tour} thumbnail`}
                                /> */}
                                {booking.tour}
                              </div>
                            </td>
                            <td>{booking.date}</td>
                            <td>{booking.guests}</td>
                            <td>{booking.amount}</td>
                            <td>{getStatusBadge(booking.status)}</td>
                            <td>
                              <Button variant="light" size="sm">
                                <BsThreeDotsVertical />
                              </Button>
                            </td>
                          </tr>
                        )) || (
                          <tr>
                            <td colSpan="6" className="text-center text-muted py-4">
                              No booking history
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                </div>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>
      </div>

      {/* User Stats */}
      <div className="row mt-4">
        <div className="col-md-4 mb-4 p-2">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Bookings</h6>
                  <h3 className="mb-0">{totalBookings}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <FiCalendar size={24} className="text-primary" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-4 p-2">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Spent</h6>
                  <h3 className="mb-0">${totalSpent.toLocaleString()}</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <FiUser size={24} className="text-success" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-4 p-2">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Favorite Destination</h6>
                  <h3 className="mb-0">
                    {favoriteDestination ? 
                      Object.entries(favoriteDestination).sort((a,b) => b[1]-a[1])[0]?.[0] || 'N/A' : 
                      'N/A'}
                  </h3>
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <FiMapPin size={24} className="text-info" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;