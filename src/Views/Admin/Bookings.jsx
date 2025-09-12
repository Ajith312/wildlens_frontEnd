import ButtonComponent from 'Components/Button/Button'
import DashboardCard from 'Components/Card/DashboardCard'
import { useCommonState, useDispatch } from 'Components/CustomHooks'
import Spinner from 'Components/Spinner/CustomSpinner'
import TableComp from 'Components/Table/TableComp'
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import {getAllBookingDetails, getAllUserDetails, getDropDownTourDetails } from 'Redux/Action/Admin.Action'
import { update_booking_filter_inputs,} from 'Redux/Slice/Admin.Slice'
import { updateModalShow} from 'Redux/Slice/Common.Slice'
import JsonData from 'Utils/JsonData'

const Bookings = () => {
  const dispatch = useDispatch()
  const { tableHeadings, tableKeys, bookingCards } = JsonData()?.jsonOnly
  const { booking_details, booking_filter_inputs,user_details,dropdown_tour_details, } = useCommonState()?.adminState


  useEffect(() => {
    dispatch(getAllBookingDetails({status: booking_filter_inputs?.status || "all",search: booking_filter_inputs?.search || ""}))
  }, [booking_filter_inputs])

  useEffect(() => {
    if (!user_details || user_details.length === 0) {
      dispatch(getAllUserDetails())
    }
    if (!dropdown_tour_details || dropdown_tour_details.length === 0) {
      dispatch(getDropDownTourDetails())
    }
  }, [])


  const handleTabChange = (status) => {
    dispatch(update_booking_filter_inputs({ status }))
  }


  const handleSearchChange = (e) => {
    dispatch(update_booking_filter_inputs({ search: e.target.value }))
  }

  return (
    <>
    <Container fluid className="py-3 admin-bookings overflow-auto">

      <Row className="align-items-center mb-4">
        <Col xs={12} md={4}>
          <h4 className='mb-0'>Booking List</h4>
        </Col>
        <Col xs={12} md={8} className="booking-actions d-flex gap-2 justify-content-md-end mt-2 mt-md-0">
          <ButtonComponent className='btn-success' buttonName="Add Booking"  clickFunction={()=>dispatch(updateModalShow({show:true,close_btn:true,size:"lg",modal_from:"Bookings",modal_type:"add_booking"}))}/>
          <ButtonComponent className='btn-success' buttonName="More Action" />
        </Col>
      </Row>


      <Row className="mb-4 w-100">
        {bookingCards?.map((item, i) => (
          <Col key={i} xs={12} sm={6} lg={3} className="mb-3 mb-lg-0 p-2 d-flex">
            <DashboardCard item={item} className="flex-fill" is_loading={booking_details?.is_loading} />
          </Col>
        ))}
      </Row>

      <Card className="booking-cards-container w-100" >
        <Card.Body>
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center mb-3">
            <div className='col-12 col-lg-5 bg-success-subtle d-flex justify-content-between align-items-center p-2  rounded-2 cursor-pointer mb-3 mb-lg-0'>
              {["all", "completed", "pending","confirmed", "cancelled"].map((status) => (
                <div
                  key={status}
                  className={booking_filter_inputs?.status === status ? "filterTabBtnActive" : "filterTabBtn"}
                  onClick={() => handleTabChange(status)}
                >
                  <p className='filterTabBtnText mb-0'>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </p>
                </div>
              ))}
            </div>


            <div className='col-12 col-lg-6'>
              <InputGroup className="w-100">
                <InputGroup.Text><BsSearch /></InputGroup.Text>
                <Form.Control
                  placeholder="Search"
                  value={booking_filter_inputs?.search || ""}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </div>
          </div>

          <section className='overflow-auto booking-table' style={{minHeight:"35vh"}}>
              {booking_details?.is_loading ? <div className='my-4'>
                <Spinner />
              </div> :
                <TableComp
                  tableHeadings={tableHeadings}
                  tableData={booking_details?.data?.details}
                  tableKeys={tableKeys}
                  showIndex={true}
                  showAction={true}
                />}
          </section>
        </Card.Body>
      </Card>
    </Container>
      </>
  )
}

export default Bookings
