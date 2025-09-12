import React from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import { format } from "date-fns"
import ButtonComponent from "Components/Button/Button";
import { useDispatch } from "Components/CustomHooks";
import { deleteEnquiry } from "Redux/Action/Admin.Action";

const EnquiryCard = ({ enquiry,}) => {
const dispatch = useDispatch()
  return (
    <Card className="p-1">
      <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
        <h6 className="fw-bold mb-0">{enquiry.name}</h6>
        <Badge bg="primary" pill>
          {format(new Date(enquiry?.createdAt),"dd/MM/yyyy")}
        </Badge>
      </Card.Header>

      <Card.Body>
        <Row>
          <Col className="mb-2">
            <p className="mb-1 d-flex gap-2 small text-muted">
              <i class="bi bi-envelope-at"></i>
              {enquiry.email}
            </p>
            <p className="mb-1 d-flex gap-2 small text-muted">
              <i class="bi bi-telephone"></i>
              {enquiry.phone_number}
            </p>
            <p className="mb-1 d-flex gap-2 small text-muted">
              <i class="bi bi-calendar-date"></i>
                {format(new Date(enquiry?.createdAt),"dd/MM/yyyy")}
            </p>
             <p className="mb-1 small text-muted">ID: {enquiry._id}</p>
          </Col>
        </Row>

        <Card className="bg-light border-0 p-2 mt-2">
          <small className="text-dark d-flex gap-2 align-items-center">
            <i class="bi bi-chat-dots"></i>
            {enquiry.comments}
          </small>
        </Card>
      </Card.Body>

      <Card.Footer className="bg-white border-0 d-flex justify-content-end">
        <Col className="">
        <ButtonComponent className="btn-outline-danger w-100" 
        buttonName="Delete"
        clickFunction={()=>dispatch(deleteEnquiry(enquiry._id))}
         />
        </Col>  
      </Card.Footer>
    </Card>
  );
};

export default EnquiryCard;
