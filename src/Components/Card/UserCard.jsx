import ButtonComponent from 'Components/Button/Button';
import { useCustomNavigate } from 'Components/CustomHooks';
import React from 'react';
import { Card, Badge, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FiMail, FiPhone, FiUser, FiCalendar } from 'react-icons/fi';


const UserCard = ({ user, onViewProfile }) => {
    const navigate = useCustomNavigate()
  const renderTooltip = (text) => (
    <Tooltip id="button-tooltip">{text}</Tooltip>
  );


  const totalBookings = (user?.bookings?.upcoming?.length || 0) + (user?.bookings?.history?.length || 0);

  return (
    <Card className="h-100 hover-shadow transition-all">
      <Card.Body className="text-center p-3 d-flex flex-column">
        {/* User Avatar */}
        <div className="mb-3 mx-auto position-relative">
          <Image
            src={user?.avatar}
            roundedCircle
            width={80}
            height={80}
            className="border object-fit-cover"
            alt={`${user?.name}'s profile`}
          />
          <Badge 
            bg={user?.status === 'active' ? 'success' : 'secondary'} 
            className="position-absolute bottom-0 end-0 translate-middle"
            pill
          >
            {user?.status === 'active' ? 'A' : 'I'}
          </Badge>
        </div>

        {/* User Info */}
        <div className="mb-2">
          <h5 className="mb-1 fw-semibold text-truncate">
            {user?.name}
          </h5>
          <p className="text-muted small mb-2">ID: {user?.id}</p>
        </div>

        {/* Contact Info */}
        <div className="text-start small mb-3 flex-grow-1">
          <OverlayTrigger
            placement="bottom"
            overlay={renderTooltip(user?.email)}
            delay={{ show: 250, hide: 400 }}
          >
            <div className="d-flex align-items-center mb-2 text-truncate">
              <FiMail className="me-2 flex-shrink-0" size={14} />
              <span className="text-truncate">{user?.email}</span>
            </div>
          </OverlayTrigger>
          
          <OverlayTrigger
            placement="bottom"
            overlay={renderTooltip(user?.phone)}
            delay={{ show: 250, hide: 400 }}
          >
            <div className="d-flex align-items-center text-truncate">
              <FiPhone className="me-2 flex-shrink-0" size={14} />
              <span className="text-truncate">{user?.phone}</span>
            </div>
          </OverlayTrigger>
        </div>

        {/* Stats */}
        <div className="d-flex justify-content-between small mb-3">
          <div className="d-flex align-items-center">
            <FiUser className="me-1" size={14} />
            <span>{totalBookings} {totalBookings === 1 ? 'booking' : 'bookings'}</span>
          </div>
          <div className="d-flex align-items-center">
            <FiCalendar className="me-1" size={14} />
            <span>{user?.joinDate}</span>
          </div>
        </div>

        {/* Action Button */}
        <ButtonComponent 
          className="btn-outline-success w-100 mt-auto"
          buttonName="View Profile"
          clickFunction={()=>navigate(`/admin/users/${user?.id}`)}
        />
      </Card.Body>
    </Card>
  );
};


export default UserCard;