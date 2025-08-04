import React from 'react';
import { Form, InputGroup, Dropdown, Badge } from 'react-bootstrap';
import { FiSearch, FiBell, FiUser, FiMenu, FiSettings, FiLogOut } from 'react-icons/fi';
import ButtonComponent from 'Components/Button/Button';
import Icons from 'Utils/Icons';
import { useCommonState } from 'Components/CustomHooks';
import HeaderCard from 'Components/Card/HeaderCard';

const Header = ({ offcanvasOn, offcanvasOnButton }) => {
  const { commonState } = useCommonState();
  const user = {
    name: "Admin User",
    role: "Administrator",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };
  
  // Sample notifications data
  const notifications = [
    { id: 1, text: 'New booking received', time: '2 min ago', read: false },
    { id: 2, text: 'Payment processed', time: '1 hour ago', read: true },
    { id: 3, text: 'New message from customer', time: '3 hours ago', read: false }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <HeaderCard
      cardClassName='w-100 border-0 header-card shadow-sm'
      cardTitleClassName="mb-0"
      cardBodyClassName='py-2 px-3 header-body'
      cardContent={
        <div className="d-flex align-items-center justify-content-between">
          {/* Left side - Menu and Page Title */}
          <div className="d-flex align-items-center">
            {offcanvasOn && (
              <ButtonComponent
                type="button"
                className="btn-transparent me-3"
                clickFunction={offcanvasOnButton}
                buttonName={<FiMenu size={20} />}
              />
            )}
            <h5 className="mb-0 fw-semibold">{commonState?.currentMenuName || 'Dashboard'}</h5>
          </div>

          {/* Right side - Search and User Area */}
          <div className="d-flex align-items-center">
            {/* Search Bar */}
            <div className="me-3 d-none d-md-block" style={{ width: '250px' }}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <FiSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search..."
                  className="border-start-0"
                />
              </InputGroup>
            </div>

            {/* Notifications Dropdown */}
            <Dropdown className="me-3" align="end">
              <Dropdown.Toggle 
                variant="transparent" 
                className="position-relative p-0 border-0 bg-transparent"
                id="notifications-dropdown"
              >
                <FiBell size={20} className="text-muted" />
                {unreadCount > 0 && (
                  <Badge 
                    pill 
                    bg="danger" 
                    className="position-absolute top-0 start-100 translate-middle" 
                    style={{ fontSize: '0.6rem' }}
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow" style={{ width: '300px' }}>
                <Dropdown.Header className="d-flex justify-content-between align-items-center">
                  <span>Notifications</span>
                  <small className="text-primary cursor-pointer">Mark all as read</small>
                </Dropdown.Header>
                {notifications?.map(notification => (
                  <Dropdown.Item 
                    key={notification.id} 
                    className={`py-2 ${!notification.read ? 'bg-light' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="d-flex">
                      <div className={`me-2 ${!notification.read ? 'text-primary' : 'text-muted'}`}>
                        •
                      </div>
                      <div>
                        <div>{notification.text}</div>
                        <small className="text-muted">{notification.time}</small>
                      </div>
                    </div>
                  </Dropdown.Item>
                ))}
                <Dropdown.Divider />
                <Dropdown.Item className="text-center text-primary">
                  View all notifications
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* User Profile Dropdown */}
            <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            split
            id="dropdown-split-basic"
            className="d-flex align-items-center p-0 bg-transparent border-0"
          >
            <div className="d-flex align-items-center">
              <div className="me-2 d-none d-sm-block text-end">
                <div className="small fw-semibold">{user.name}</div>
                <div className="small text-muted">{user.role}</div>
              </div>
              <div className="position-relative">
                <img
                  src={user.avatar}
                  alt="Profile"
                  width="36"
                  height="36"
                  className="rounded-circle border"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow mt-2">
            <Dropdown.Item href="#/profile" className="d-flex align-items-center">
              <FiUser className="me-2" />
              My Profile
            </Dropdown.Item>
            <Dropdown.Item href="#/settings" className="d-flex align-items-center">
              <FiSettings className="me-2" />
              Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/logout" className="d-flex align-items-center text-danger">
              <FiLogOut className="me-2" />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
          </div>
        </div>
      }
    />
  );
};

export default Header;