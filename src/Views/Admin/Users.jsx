import UserCard from "Components/Card/UserCard";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import React, { useEffect } from "react";
import { Row,Col } from "react-bootstrap";
import { getAllUserDetails } from "Redux/Action/Admin.Action";
const Users = () => {
  const dispatch = useDispatch()
  const { user_details}= useCommonState()?.adminState


  useEffect(() => {
    dispatch(getAllUserDetails())
  }, [])

  return (
    <Row className="row">
      {user_details&& user_details?.length > 0 ? user_details?.map(user => (
        <Col key={user._id} xs={12} sm={6} lg={4} xl={3} className="p-2">
          <UserCard user={user} />
        </Col>
      )) :
        (
          <Col className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            <div className="text-center">
              <p className="mb-0 fs-4 fw-semibold text-muted">No Users Found</p>
            </div>
          </Col>
        )
      }
    </Row>
  );
};

export default Users