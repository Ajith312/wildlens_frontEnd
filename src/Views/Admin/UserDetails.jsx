import React, { useEffect } from 'react';
import { Card, Badge, Button, Image, Tab, Tabs } from 'react-bootstrap';
import { FiMail, FiPhone, FiUser, FiCalendar, FiMapPin } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useCommonState, useDispatch } from 'Components/CustomHooks';
import { getSingleUserDetails } from 'Redux/Action/Admin.Action';
import { format } from 'date-fns';

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const { selected_userdetails } = useCommonState()?.adminState

  useEffect(() => {
    if (!id) return
    dispatch(getSingleUserDetails(id))
  }, [id])

  const userStats = [
    {
      name: "Total Bookings",
      value: selected_userdetails?.total_bookings,
      bg: "primary",
      icon: <FiCalendar size={24} className="text-primary" />
    }, {
      name: "Total Spent",
      value: selected_userdetails?.total_amount,
      bg: "success",
      icon: <FiUser size={24} className="text-success" />
    }, {
      name: "Favorite Destination",
      value: selected_userdetails?.fav_destination,
      bg: "info",
      icon: <FiMapPin size={24} className="text-info" />
    },
  ]


  if (!selected_userdetails) {
    return <div className="container-fluid py-5 text-center">User not found</div>;
  }

  const upcoming_details = selected_userdetails?.booking_details?.filter(tour => tour.tour_status == "pending")
  const completed_details = selected_userdetails?.booking_details?.filter(tour => tour.tour_status == "completed")

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <Badge bg="primary" className='mb-0 p-2'>Confirmed</Badge>;
      case 'pending':
        return <Badge bg="warning" className='mb-0 p-2'>Pending</Badge>;
      case 'completed':
        return <Badge bg="success" className='mb-0 p-2'>Completed</Badge>;
      case 'cancelled':
        return <Badge bg="danger" className='mb-0 p-2'>Cancelled</Badge>;
      default:
        return <Badge bg="secondary" className='mb-0 p-2'>Unknown</Badge>;
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
                src={selected_userdetails?.profile_picture}
                roundedCircle
                width={120}
                height={120}
                className="mb-3 border"
                alt={`${selected_userdetails?.name}'s avatar`}
              />
              <h3>{selected_userdetails.user_name}</h3>
              <p className="text-muted">User ID: {selected_userdetails?._id}</p>
              <div className="text-start mb-4">
                <div className="d-flex align-items-center mb-2">
                  <FiMail className="me-2" />
                  <span>{selected_userdetails?.email}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <FiPhone className="me-2" />
                  <span>{selected_userdetails?.phone_number || "9876543210"}</span>
                </div>
                <div className="d-flex align-items-center">
                  <FiCalendar className="me-2" />
                  <span>User since {selected_userdetails?.join_date
                    ? format(new Date(selected_userdetails.join_date), "dd/MM/yyyy")
                    : "N/A"}</span>
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
                  title={<div className="d-flex align-items-center">
                    <span>Upcoming</span>
                    {upcoming_details?.length > 0 && (
                      <Badge pill bg="success" className="ms-2">
                        {upcoming_details?.length}
                      </Badge>
                    )}
                  </div>
                  }
                >
                  <div className="row">
                    {upcoming_details?.length > 0 ? (
                      upcoming_details?.map((booking, index) => (
                        <div className="col-md-6 p-2" key={index}>
                          <Card className="">
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <h5 className="mb-1">{booking?.title}</h5>
                                  <p className="mb-1 text-muted">Date: {format(new Date(booking?.booking_date), "dd/MM/yyyy")}</p>
                                  <p className="mb-1 text-muted">Guests: {booking?.persons}</p>
                                  <p className="mb-2 text-muted">Amount: {booking?.budget}</p>
                                  <p className="mb-2 text-muted">Payment Status: {getStatusBadge(booking?.payment_status)}</p>
                                  <p className="mb-2 text-muted">Booking Status: {getStatusBadge(booking?.booking_status)}</p>
                                </div>
                                <Button variant="light" size="sm">
                                  <BsThreeDotsVertical />
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-muted py-4">No upcoming bookings</div>
                    )}
                  </div>

                </Tab>
                <Tab eventKey="history"
                  title={<div className="d-flex align-items-center">
                    <span>History</span>
                    {completed_details?.length > 0 && (
                      <Badge pill bg="success" className="ms-2">
                        {completed_details?.length}
                      </Badge>
                    )}
                  </div>
                  }
                >
                  <div className="row">
                    {completed_details?.length > 0 ? (
                      completed_details?.map((booking, index) => (
                        <div className="col-md-6 p-2" key={index}>
                          <Card className="">
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <h5 className="mb-1">{booking?.title}</h5>
                                  <p className="mb-1 text-muted">Date: {format(new Date(booking?.booking_date), "dd/MM/yyyy")}</p>
                                  <p className="mb-1 text-muted">Guests: {booking?.persons}</p>
                                  <p className="mb-2 text-muted">Amount: {booking?.budget}</p>
                                  <p className="mb-2 text-muted">Payment Status: {getStatusBadge(booking?.payment_status)}</p>
                                  <p className="mb-2 text-muted">Booking Status: {getStatusBadge(booking?.booking_status)}</p>
                                </div>
                                <Button variant="light" size="sm">
                                  <BsThreeDotsVertical />
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-muted py-4">No booking history</div>
                    )}
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </div>
      </div>


      <div className="row mt-4">
        {userStats?.map((stats, ind) => (
          <div className="col-md-4 mb-2 p-2" key={ind}>
            <Card className="h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">{stats?.name}</h6>
                    <h3 className="mb-0">{stats?.value}</h3>
                  </div>
                  <div className={`bg-${stats?.bg} bg-opacity-10 p-3 rounded`}>
                    {stats?.icon}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))
        }
      </div>
    </div>
  );
};

export default UserDetails;