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
      {user_details?.map(user => (
        <Col key={user.id} xs={12} sm={6} lg={4} xl={3} className="p-2">
          <UserCard user={user} />
        </Col>
      ))}
    </Row>
  );
};

export default Users