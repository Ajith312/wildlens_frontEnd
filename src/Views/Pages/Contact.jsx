import React from 'react'
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FiPhoneCall } from "react-icons/fi";
import { MdAddLocationAlt, MdAttachEmail } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import Image from 'Utils/Image';


const Contact = () => {
  return (
    <div className="container-fluid d-flex flex-column p-0">
    <div className="coverImageContainer d-flex justify-content-center align-items-center position-relative">
        <img src={Image.heroSection} alt="cover-image" className="coverImage w-100 h-100"/>
        <p className="coverText position-absolute text-white fw-bold">Contact</p>
      </div>

    <div className="contactDeatailsContainer  d-flex justify-content-center align-items-center">
    <div className="contacyDeatailsBox col-10 my-5 d-flex flex-column flex-lg-row justify-content-lg-around align-items-center gap-5">
        <div className="contactBox col-10 col-lg-5 p-3 rounded-3 bg-info-subtle">
          <div className="phoneNumBox d-flex justify-content-center mb-4 py-3 border border-dark-subtle rounded-3">
            <div className="col-1 d-flex justify-content-end align-items-center me-3"><FiPhoneCall size={30} color="green"/></div>
            <div className="col-9">
              <p className="text-start mb-0">+91 9876543210</p>
              <p className="text-start mb-0">+91 8545765424</p>
            </div>
          </div>
          <div className="emailBox d-flex  justify-content-center  mb-4 py-3 border border-dark-subtle rounded-3">
            <div className="col-1 d-flex justify-content-end align-items-center me-3"><MdAttachEmail size={30} color="green" /></div>
            <div className="col-9">
              <p className="text-start mb-0">info@wildtour.com</p>
              <p className="text-start mb-0">marketting@wildtour.com</p>
            </div>
          </div>
          <div className="addressBox d-flex justify-content-center mb-4 py-3 border border-dark-subtle rounded-3">
            <div className="col-1 d-flex justify-content-end align-items-center me-3"><MdAddLocationAlt size={30} color="green" /></div>
            <div className="col-9">
              <p className="text-start mb-0">No 169,Saravanampatti,</p>
              <p className="text-start mb-0">coimbatore,Tamilnadu,641035</p>
            </div>
          </div>

          <div className="addressBox d-flex justify-content-center mb-4 py-3 border border-dark-subtle rounded-3">
            <div className="col-1 d-flex justify-content-end align-items-center me-3"><SlCalender size={30} color="green" /></div>
            <div className="col-9">
              <p className="text-start mb-0">9.00 A.M to 5.00P.M</p>
              <p className="text-start mb-0">Monday - Saturday</p>
            </div>
          </div>
        </div>
        <div className="reachUsBox col-10 col-lg-5  h-100 bg-success-subtle rounded-3">
          <div className="reachContent p-5 h-100">
            <h3 className="text-start fw-bold">Reach Us Anytime</h3>
            <Form>
              
              <Form.Group className="mb-3" controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" />
              </Form.Group>
              <Row className="mb-3 gap-2">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" placeholder="Phone" />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridMessege">
                <Form.Label>Comments</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Write Your Messege"/>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
      
    </div>
  
  </div>
  )
}

export default Contact