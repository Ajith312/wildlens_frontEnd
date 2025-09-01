import ButtonComponent from 'Components/Button/Button';
import { useCommonState, useDispatch } from 'Components/CustomHooks';
import React from 'react'
import { Col, Form, Row, Card } from "react-bootstrap";
import { FiPhoneCall } from "react-icons/fi";
import { MdAddLocationAlt, MdAttachEmail } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { handleSendEnquiry } from 'Redux/Action/Tour.Action';
import { updateToastMessage } from 'Redux/Slice/Common.Slice';
import { update_enquiry_details } from 'Redux/Slice/Tour.Slice';
import Image from 'Utils/Image';

const Contact = () => {
  const {enquiry_details,loading } = useCommonState()?.tourState
  const dispatch = useDispatch()

  const sendEnquiry = ()=>{
    if(!enquiry_details?.name || !enquiry_details?.email || !enquiry_details?.phone_number || !enquiry_details?.comments){
      return dispatch(updateToastMessage({message:"All the fields are required",type: "error"}))
    }
    dispatch(handleSendEnquiry(enquiry_details))
  }
  return (
    <div className="contact-container">
      <div className="position-relative text-center">
        <img 
          src={Image.heroSection} 
          alt="cover" 
          className="w-100 cover-image"
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <h1 className="position-absolute top-50 start-50 translate-middle text-white fw-bold">
          Contact
        </h1>
      </div>

      <div className="container py-5">
        <Row className="g-4 justify-content-center">
          <Col lg={5} className="pe-lg-4 mb-4 mb-lg-0">
            <Card className="h-100 bg-info-subtle">
              <Card.Body className="p-4">
                <div className="d-flex mb-4 p-3 bg-white rounded">
                  <div className="me-3 text-success d-flex align-items-center">
                    <FiPhoneCall size={24} />
                  </div>
                  <div>
                    <p className="mb-1">+91 9876543210</p>
                    <p className="mb-0">+91 8545765424</p>
                  </div>
                </div>
                <div className="d-flex mb-4 p-3 bg-white rounded">
                  <div className="me-3 text-success d-flex align-items-center">
                    <MdAttachEmail size={24} />
                  </div>
                  <div>
                    <p className="mb-1">info@wildtour.com</p>
                    <p className="mb-0">marketing@wildtour.com</p>
                  </div>
                </div>

                <div className="d-flex mb-4 p-3 bg-white rounded">
                  <div className="me-3 text-success d-flex align-items-center">
                    <MdAddLocationAlt size={24} />
                  </div>
                  <div>
                    <p className="mb-1">No 169, Saravanampatti</p>
                    <p className="mb-0">Coimbatore, Tamilnadu, 641035</p>
                  </div>
                </div>

                <div className="d-flex p-3 bg-white rounded">
                  <div className="me-3 text-success d-flex align-items-center">
                    <SlCalender size={24} />
                  </div>
                  <div>
                    <p className="mb-1">9.00 A.M to 5.00 P.M</p>
                    <p className="mb-0">Monday - Saturday</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7}>
            <Card className="h-100 bg-success-subtle">
              <Card.Body className="p-4">
                <h3 className="mb-4 fw-bold">Reach Us Anytime</h3>
                <Form>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={enquiry_details?.name} onChange={(e)=>dispatch(update_enquiry_details({name:e.target.value}))} />
                  </Form.Group>

                  <Row className="mb-3 g-2">
                    <Col md={6} className="mb-3 mb-md-0 pe-md-1">
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={enquiry_details?.email} onChange={(e)=>dispatch(update_enquiry_details({email:e.target.value}))} />
                      </Form.Group>
                    </Col>
                    <Col md={6} className='ps-md-1'>
                      <Form.Group controlId="formPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="number" placeholder="Phone" value={enquiry_details?.phone_number} onChange={(e)=>dispatch(update_enquiry_details({phone_number:e.target.value}))} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={4} 
                      placeholder="Write Your Message"
                      value={enquiry_details?.comments} 
                      onChange={(e)=>dispatch(update_enquiry_details({comments:e.target.value}))}
                    />
                  </Form.Group>

                  <ButtonComponent className="w-100 btn-success" buttonName="Submit Enquiry" clickFunction={sendEnquiry} loading={loading} />
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Contact