import ButtonComponent from 'Components/Button/Button';
import { useCommonState, useDispatch } from 'Components/CustomHooks';
import PasswordInput from 'Components/Input/PasswordInput';
import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { RiEdit2Fill } from "react-icons/ri";
import { editProfileInfo, editProfilePicture, getProfileDetails, handleUpdatePassword } from 'Redux/Action/Common.Action';
import { updateToastMessage, updatePasswordInputs, updateProfileDetails, updateProfileEditing } from 'Redux/Slice/Common.Slice';
import Images from "Utils/Image"


const Settings = () => {
  const dispatch = useDispatch()
  const { profile_details, passwordInputs, profile_editing } = useCommonState()?.commonState
  const fileInputRef = useRef(null)


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

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) {
      return
    }

    const formdata = new FormData()
    formdata.append("image", file)
    dispatch(editProfilePicture(formdata))
  }

  const handleEditClick = () => {
    fileInputRef.current.click()
  }


  return (
    <Container fluid className="">

      <h5 className="fw-semibold">About section</h5>

      <Row className="align-items-stretch">
        <Col lg={4} className="p-2 d-flex flex-column">
          <Card className="mb-3 text-center flex-fill">
            <Card.Body>
              <img
                src={profile_details?.profile_picture || Images.default_profile_pic}
                alt="profile"
                className="rounded-circle mb-3"
                width="130"
                height="130"
              />
              <Card.Title>{`${profile_details?.user_name} ${profile_details?.last_name || ""}`}</Card.Title>
              <Card.Text className="text-muted mb-1">{profile_details?.email}</Card.Text>
              <Card.Text className="text-muted mb-2">{profile_details?.phone_number}</Card.Text>
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
                    onChange={(e) => dispatch(updatePasswordInputs({ current_password: e.target.value }))}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <PasswordInput
                    placeholder="New Password"
                    name="new password"
                    value={passwordInputs?.password}
                    onChange={(e) => dispatch(updatePasswordInputs({ password: e.target.value }))}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <PasswordInput
                    placeholder="Confirm Password"
                    name="confirm password"
                    value={passwordInputs?.confirm_password}
                    onChange={(e) => dispatch(updatePasswordInputs({ confirm_password: e.target.value }))}
                  />
                </Form.Group>
                <ButtonComponent type="button" className="btn-success w-100" buttonName="Change Password" clickFunction={changeUserPassword} />
              </Form>
            </Card.Body>
          </Card>
        </Col>


        <Col lg={8} className='p-2 d-flex flex-column'>
          <Card className="border-0 rounded-4 flex-fill">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <Image
                    src={profile_details?.profile_picture || Images.default_profile_pic}
                    roundedCircle
                    width={120}
                    height={120}
                    className="border border-3 border-success object-fit-cover"
                  />

                  <Button
                    variant="light"
                    size="sm"
                    className="position-absolute bottom-0 end-0 rounded-circle shadow-sm d-flex justify-content-center align-items-center p-0"
                    style={{ width: "36px", height: "36px" }}
                    onClick={handleEditClick}
                  >
                    <RiEdit2Fill size={20} className="text-primary" />
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="d-none"
                    onChange={handleImageChange}
                  />
                </div>

                <h3 className="mt-3 fw-bold">{`${profile_details?.user_name} ${profile_details?.last_name || ""}`}</h3>
              </div>

              <Form>
                <Row className="g-1">
                  <Col md={6} className='px-2'>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">First Name</Form.Label>
                      <Form.Control
                        type="text"
                        className="py-2 rounded-3"
                        value={profile_details?.user_name}
                        placeholder='First Name'
                        readOnly={!profile_editing}
                        onChange={(e) => dispatch(updateProfileDetails({ user_name: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className='px-2'>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        className="py-2 rounded-3"
                        value={profile_details?.last_name}
                        placeholder='Last Name'
                        readOnly={!profile_editing}
                        onChange={(e) => dispatch(updateProfileDetails({ last_name: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className='px-2'>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Email</Form.Label>
                      <Form.Control
                        type="email"
                        className="py-2 rounded-3"
                        value={profile_details?.email}
                        placeholder='Email'
                        readOnly={!profile_editing}
                        onChange={(e) => dispatch(updateProfileDetails({ email: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className='px-2'>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        className="py-2 rounded-3"
                        value={profile_details?.phone_number}
                        placeholder='Phone Number'
                        readOnly={!profile_editing}
                        onChange={(e) => dispatch(updateProfileDetails({ phone_number: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12} className='px-2'>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={profile_details?.address}
                        placeholder='Address'
                        readOnly={!profile_editing}
                        onChange={(e) => dispatch(updateProfileDetails({ address: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-3 mt-4">
                  <ButtonComponent className="btn btn-outline-secondary px-4 rounded-3" buttonName="Cancel" clickFunction={() => {
                    dispatch(updateProfileEditing(false))
                  }} />
                  <ButtonComponent
                    className="btn btn-success px-4 rounded-3"
                    buttonName={profile_editing ? "Save Changes" : "Edit Profile"}
                    clickFunction={profile_editing ? () => dispatch(editProfileInfo(profile_details)) : () => dispatch(updateProfileEditing(true))}
                  />

                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
