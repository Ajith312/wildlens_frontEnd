import ButtonComponent from 'Components/Button/Button'
import { useCommonState, useDispatch } from 'Components/CustomHooks'
import PasswordInput from 'Components/Input/PasswordInput'
import React from 'react'
import { Card, Col, Form } from 'react-bootstrap'
import { handleUpdatePassword } from 'Redux/Action/Common.Action'
import { updatePasswordInputs, updateToastMessage } from 'Redux/Slice/Common.Slice'

const ProfileSettings = () => {
  const dispatch = useDispatch()
  const { passwordInputs,profile_details } = useCommonState()?.commonState

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
    <Card className='flex-fill'>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title className="mb-0 fs-3 text-primary">Change Password</Card.Title>
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
          <Col xs={12} md={6} lg={3}>
            <ButtonComponent
              type="button"
              className="btn-success w-100"
              buttonName="Change Password"
              clickFunction={changeUserPassword}
            />
          </Col>

        </Form>
      </Card.Body>
    </Card>
  )
}

export default ProfileSettings