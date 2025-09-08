import ButtonComponent from 'Components/Button/Button';
import { useCustomNavigate } from 'Components/CustomHooks';
import React from 'react';
import { Card, Badge, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FiMail, FiPhone, FiUser, FiCalendar } from 'react-icons/fi';
import {format} from "date-fns"
import Images from 'Utils/Image';
const UserCard = ({ user }) => {
    const navigate = useCustomNavigate()
  const renderTooltip = (text) => (
    <Tooltip id="button-tooltip">{text}</Tooltip>
  );

  return (
    <Card className="h-100 hover-shadow transition-all">
      <Card.Body className="text-center p-3 d-flex flex-column">
        <div className="mb-3 mx-auto position-relative">
          <Image
            src={user?.profile_picture || Images.default_profile_pic}
            roundedCircle
            width={100}
            height={100}
            className="border object-fit-cover"
            alt={`${user?.name}'s profile`}
          />
        </div>
        <div className="mb-2">
          <h5 className="mb-1 fw-semibold text-truncate">
            {user?.user_name}
          </h5>
          <p className="text-muted small mb-2">ID: {user?._id}</p>
        </div>
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
              <span className="text-truncate">{user?.phone || "9876543210"}</span>
            </div>
          </OverlayTrigger>
        </div>


        <div className="d-flex justify-content-between small mb-3">
          <div className="d-flex align-items-center">
            <FiUser className="me-1" size={14} />
            <span>{user?.totalBookings} {user?.totalBookings === 1 ? 'booking' : 'bookings'}</span>
          </div>
          <div className="d-flex align-items-center">
            <FiCalendar className="me-1" size={14} />
            <span>{format(new Date(user?.createdAt),"dd/MM/yyyy")}</span>
          </div>
        </div>


        <ButtonComponent 
          className="btn-outline-success w-100 mt-auto"
          buttonName="View Profile"
          clickFunction={()=>navigate(`/admin/users/${user?._id}`)}
        />
      </Card.Body>
    </Card>
  );
};


export default UserCard;