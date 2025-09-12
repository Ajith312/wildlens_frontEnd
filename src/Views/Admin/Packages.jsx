import ButtonComponent from 'Components/Button/Button'
import TourCard from 'Components/Card/TourCard'
import { useCommonState, useDispatch } from 'Components/CustomHooks'
import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getAllTours } from 'Redux/Action/Tour.Action'

const Packages = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {tour_package_details } = useCommonState()?.tourState

  useEffect(()=>{
    dispatch(getAllTours())
  },[])


  return (
    <Container fluid className='h-100 w-100'>
      <Row className="bookingHeaderBox d-flex justify-content-between">
        <Col xs={12} sm={6} lg={4} xl={3}>
        <h4 className='d-flex align-items-center mb-0'>Tour packages</h4>
        </Col>
        <Col xs={12} sm={6} lg={4} className="bookingHeaderBtn d-flex gap-2 justify-content-md-end ">
          <ButtonComponent className='btn-success' buttonName="Add Tour" clickFunction={()=>navigate('/admin/addtour')} />
          <ButtonComponent className='btn-success' buttonName="More Action" />
        </Col>
      </Row>
      <Row className="mt-3">
        {tour_package_details&& tour_package_details?.length > 0 ? tour_package_details?.map((tour) => (
          <Col key={tour._id} xs={12} sm={6} lg={4} xl={3} className='p-2 tour-card-box'>
            <TourCard tour={tour} admin = "true" />
          </Col> 
        )): 
          <Col className='w-100 d-flex justify-content-center align-items-center' style={{minHeight:"70vh"}}>
            <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
              <p className='mb-0 fs-2'>No Tours Available !!!</p>
               <ButtonComponent className='btn-success px-5 w-75' buttonName="Add Tour" clickFunction={()=>navigate('/admin/addtour')} />
            </div>
          </Col>
        }
      </Row>
    </Container>
  )
}

export default Packages