import LinkComponent from 'Components/Router_components/LinkComponent';
import React from 'react';
import { Container, Row, Col, Card, Image, Nav, Badge } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import Icons from 'Utils/Icons';

const Profile = () => {
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop()
  const menuItems = [
    { id: 'personal-info', label: 'Personal Information', icon:Icons.profileIcon, link: '' },
    { id: 'bookings', label: 'My Bookings', icon:Icons.bookingIcon,link: 'bookings' },
    { id: 'history', label: 'Booking History', icon:Icons.historyIcon, link: 'history' },
    { id: 'cart', label: 'My Cart', icon:Icons.cartIcon,link: 'cart' },
    { id: 'notifications', label: 'Notifications', icon: Icons.notificationIcon,link: 'notifications' },
    { id: 'settings', label: 'Settings', icon:Icons.settingsIcon, link: 'settings' },
  ]

  return (
    <Container fluid className='py-4 px-lg-5'>
      <Row className='h-100'>
        <Col lg={3} className='px-3 mb-3 mb-lg-0'>
          <Card className="border-0 rounded-4">
            <Card.Body className='p-3'>
              <div className="text-center mb-4">
                <Image
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  roundedCircle
                  width={120}
                  height={120}
                  className="border border-3 border-primary object-fit-cover mb-2"
                />
                <h5 className="fw-bold mb-1">Ajith Arumugam</h5>
                <p className="text-muted">ajith@gmail.com</p>
              </div>
              <div className="d-flex flex-column gap-2">
                {menuItems?.map((item) => {
                 const isActive = (item.link === '' && location.pathname.endsWith('/profile')) || currentPath === item.link;
                  return (
                    <div key={item.id}
                    className={`rounded-3 ${isActive ? 'profile-nav' : 'bg-white'}`}>
                    <LinkComponent
                        to={item.link}
                        title={
                          <div className='d-flex justify-content-start align-items-center gap-2 py-2 px-3'>
                            <span className="me-2"
                            style={{ color: isActive ? 'white' : 'black' }}
                            >{item.icon}</span>
                            <p className={`fw-3 mb-0 fw-bold ${isActive ? 'text-white' :'text-dark'}`}>{item.label}</p>
                          </div>
                        }
                      />
                    </div>
                  )
                })}
              </div>

            </Card.Body>
          </Card>
        </Col>
        <Col lg={9} className='px-3'>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;