import ButtonComponent from 'Components/Button/Button';
import { useCommonState, useDispatch } from 'Components/CustomHooks';
import PasswordInput from 'Components/Input/PasswordInput';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { FaEyeSlash, FaEdit, FaTrash, FaUpload,FaEye } from 'react-icons/fa';
import { FiEdit3 } from 'react-icons/fi';
import { handleUpdatePassword } from 'Redux/Action/Admin.Action';
import { getProfileDetails } from 'Redux/Action/Common.Action';
import { updatePasswordInputs } from 'Redux/Slice/Admin.Slice';
import { updateToastMessage } from 'Redux/Slice/Common.Slice';


const Settings = () => {
  const dispatch = useDispatch()
  const { profile_details } = useCommonState()?.commonState
  const {passwordInputs} = useCommonState()?.adminState

  useEffect(() => {
    if (Object.keys(profile_details)?.length === 0) {
      dispatch(getProfileDetails())
    }
  }, [profile_details])

  const changeUserPassword = () => {
    const { current_password, password, confirm_password } = passwordInputs || {}
    if (!current_password || !password || !confirm_password) {
      return dispatch(updateToastMessage({ message: "All fields are required", type: "error" }))
    }
    if (password !== confirm_password) {
      return dispatch(updateToastMessage({ message: "New password and confirm password do not match", type: "error" }))
    }

    const payload = {
      email: profile_details?.email,
      current_password,
      password,
    }
    dispatch(handleUpdatePassword(payload))
  }


  return (
    <Container fluid className="">
      <h5 className="fw-semibold">About section</h5>

      <Row className="align-items-stretch">

        <Col lg={4} className="p-2 d-flex flex-column">

          <Card className="mb-3 text-center flex-fill">
            <Card.Body>
              <img
                src={profile_details?.profile_picture}
                alt="profile"
                className="rounded-circle mb-3"
                width="130"
                height="130"
              />
              <Card.Title>{profile_details?.user_name}</Card.Title>
              <Card.Text className="text-muted mb-1">{profile_details?.email}</Card.Text>
              <Card.Text className="text-muted mb-2">{profile_details?.phone_number}</Card.Text>
              <ButtonComponent type="button" className="btn-warning px-4" buttonName="Edit Profile"  />
            </Card.Body>
          </Card>

          <Card className='flex-fill'>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="mb-0 fs-6">Change Password</Card.Title>
                <a href="#" className="text-decoration-none text-muted fs-7">Need help?</a>
              </div>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <PasswordInput
                    placeholder="Password"
                    name="password"
                    value={passwordInputs?.current_password}
                    onChange={(e)=>dispatch(updatePasswordInputs({current_password:e.target.value}))}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <PasswordInput
                    placeholder="New Password"
                    name="new password"
                    value={passwordInputs?.password}
                     onChange={(e)=>dispatch(updatePasswordInputs({password:e.target.value}))}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <PasswordInput
                    placeholder="Confirm Password"
                    name="confirm password"
                    value={passwordInputs?.confirm_password}
                    onChange={(e)=>dispatch(updatePasswordInputs({confirm_password:e.target.value}))}
                  />
                </Form.Group>
                <ButtonComponent type="button" className="btn-success w-100" buttonName="Change Password" clickFunction={changeUserPassword} />
              </Form>
            </Card.Body>
          </Card>
        </Col>


        <Col lg={8} className='p-2 d-flex flex-column'>
          <Card className='flex-fill'>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Profile Update</span>
              <Button variant="outline-secondary" size="sm">
                <FaEdit /> Edit
              </Button>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col sm={3}>
                  <img
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    alt="profile"
                    className="rounded-circle"
                    width="80"
                    height="80"
                  />
                </Col>
                <Col sm={9} className="d-flex align-items-center gap-2">
                  <Button variant="success" size="sm"><FaUpload /> Upload New</Button>
                  <Button variant="outline-danger" size="sm"><FaTrash /> Delete</Button>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6} className='p-1'>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control defaultValue="Wade" />
                  </Form.Group>
                </Col>
                <Col md={6} className='p-1'>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control defaultValue="Warren" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6} className='p-1'>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control type="password" defaultValue="password" />
                      <InputGroup.Text><FaEyeSlash /></InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6} className='p-1'>
                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <InputGroup>
                      <Form.Control defaultValue="(406) 555-0120" />
                      <InputGroup.Text><img src="https://flagcdn.com/us.svg" alt="US" width="20" /></InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6} className='p-1'>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control defaultValue="wade.warren@example.com" />
                  </Form.Group>
                </Col>
                <Col md={6} className='p-1'>
                  <Form.Group>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" defaultValue="1999-01-12" />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control defaultValue="2972 Westheimer Rd. Santa Ana, Illinois 85486" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Biography</Form.Label>
                <InputGroup>
                  <Form.Control as="textarea" placeholder="Enter a biography about you" />
                  <InputGroup.Text><FiEdit3 /></InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
