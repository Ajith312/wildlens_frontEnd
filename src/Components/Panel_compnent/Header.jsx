import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Dropdown, Badge } from 'react-bootstrap';
import { FiSearch, FiBell, FiUser, FiMenu, FiSettings, FiLogOut } from 'react-icons/fi';
import ButtonComponent from 'Components/Button/Button';
import {useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import HeaderCard from 'Components/Card/HeaderCard';
import { handleLogout } from 'Redux/Action/Common.Action';
import Images from "Utils/Image"
import { useLocation } from 'react-router-dom';
import JsonData from 'Utils/JsonData';

const Header = ({ offcanvasOn, offcanvasOnButton }) => {
  const { commonState } = useCommonState();
  const navigate = useCustomNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const{sidebarMenus} = JsonData()?.jsonOnly

  const[menuName,setMenuName]=useState()
  const notifications = []
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const headerName = () => {
      const path = location.pathname
      const name = sidebarMenus?.find(menu => path.includes(menu.route))
      setMenuName(name?.name)
    }
    headerName()
  }, [location.pathname])






  return (
    <HeaderCard
      cardClassName='w-100 border-0 header-card shadow-sm'
      cardTitleClassName="mb-0"
      cardBodyClassName='py-2 px-3 header-body'
      cardContent={
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {commonState?.innerWidth <= 1199 && (
              <ButtonComponent
                type="button"
                className="btn-transparent me-3"
                clickFunction={offcanvasOnButton}
                buttonName={<FiMenu size={20} />}
              />
            )}
            <h5 className="mb-0 fw-bold  text-success">{menuName}</h5>
          </div>


          <div className="d-flex align-items-center">

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


            <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            split
            id="dropdown-split-basic"
            className="d-flex align-items-center p-0 bg-transparent border-0"
          >
            <div className="d-flex align-items-center">
              <div className="me-2 d-none d-sm-block text-center">
                <div className="small fw-semibold">{commonState?.profile_details?.user_name}</div>
                <div className="small text-muted">Administrator</div>
              </div>
              <div className="position-relative">
                <img
                  src={commonState?.profile_details?.profile_picture || Images?.default_profile_pic}
                  alt="Profile"
                  width="40"
                  height="40"
                  className="rounded-circle border"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow mt-2">
            <Dropdown.Item className="d-flex align-items-center" onClick={()=>navigate('settings')}>
              <FiUser className="me-2" />
              My Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="d-flex align-items-center" onClick={()=>navigate('settings')}>
              <FiSettings className="me-2" />
              Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item  className="d-flex align-items-center text-danger" onClick={()=>dispatch(handleLogout(navigate))}>
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