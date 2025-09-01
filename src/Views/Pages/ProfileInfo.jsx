import ButtonComponent from 'Components/Button/Button'
import { useCommonState, useDispatch } from 'Components/CustomHooks'
import React, { useEffect, useRef, useState } from 'react'
import { Card, Image, Button, Form, Row, Col } from 'react-bootstrap'
import { editProfilePicture, getProfileDetails } from 'Redux/Action/Common.Action'
import { RiEdit2Fill } from "react-icons/ri";

const ProfileInfo = () => {
  const dispatch = useDispatch()
  const { profile_details } = useCommonState()?.commonState
  const [profileImage, setProfileImage] = useState(profile_details?.profile_picture)
  const fileInputRef = useRef(null)


  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageURL = URL.createObjectURL(file)
      setProfileImage(imageURL)
    }

    const formdata = new FormData()
    formdata.append("image",file)
    dispatch(editProfilePicture(formdata))
  }

  const handleEditClick = () => {
    fileInputRef.current.click()
  }

  return (
    <Card className="border-0 rounded-4">
      <Card.Body className="p-4">
        <div className="text-center mb-4">
          <div className="position-relative d-inline-block">
            <Image
              src={profile_details?.profile_picture}
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

          <h3 className="mt-3 fw-bold">{profile_details?.user_name}</h3>
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-3 mt-4">
            <ButtonComponent className="btn btn-outline-secondary px-4 rounded-3" buttonName="Cancel" />
            <ButtonComponent className="btn btn-success px-4 rounded-3" buttonName="Edit Profile" />
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ProfileInfo
