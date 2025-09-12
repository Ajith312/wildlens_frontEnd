import EnquiryCard from 'Components/Card/EnquiryCard'
import { useCommonState, useDispatch } from 'Components/CustomHooks'
import Spinner from 'Components/Spinner/CustomSpinner'
import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { getAllEnquies } from 'Redux/Action/Admin.Action'

const Enquiry = () => {
  const dispatch = useDispatch()
  const { enquiry_details } = useCommonState()?.adminState

  useEffect(() => {
    dispatch(getAllEnquies())
  }, [])

  return (
    <Container fluid className="py-3">
      {enquiry_details?.is_loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
          <Spinner />
        </div>
      ) : (
        <Row>
          {enquiry_details?.data && enquiry_details?.data.length > 0 ? (
            enquiry_details.data.map((enquiry) => (
              <Col
                key={enquiry._id}
                xs={12}
                sm={6}
                lg={4}
                xl={3}
                className="mb-3 p-2"
              >
                <EnquiryCard enquiry={enquiry} />
              </Col>
            ))
          ) : (
            <Col className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
              <div className="text-center">
                <p className="mb-0 fs-4 fw-semibold text-muted">No Enquiries Found</p>
              </div>
            </Col>
          )}
        </Row>
      )}
    </Container>
  )
}

export default Enquiry
