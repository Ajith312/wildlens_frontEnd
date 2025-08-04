import UserCard from "Components/Card/UserCard";
import { useCustomNavigate } from "Components/CustomHooks";
import React from "react";
import { Row,Col } from "react-bootstrap";
import JsonData from "Utils/JsonData";
const Users = () => {
  const {userDetails} = JsonData()?.jsonOnly
  console.log(userDetails,'userDetails');
  const handleViewProfile = (userId) => {
    
  };

  return (
    <Row className="row">
      {userDetails?.map(user => (
        <Col key={user.id} xs={12} sm={6} lg={4} xl={3} className="p-2">
          <UserCard user={user} onViewProfile={handleViewProfile(user?.id)} />
        </Col>
      ))}
    </Row>
  );
};

export default Users