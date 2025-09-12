import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Badge, Form, Button, Image as BootstrapImage } from 'react-bootstrap';
import { MdOutlineLocationOn, MdDelete, MdAddPhotoAlternate, MdEdit } from 'react-icons/md';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { FaSave, FaTimes } from 'react-icons/fa';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams } from 'react-router-dom';
import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import { update_selected_tour } from 'Redux/Slice/Tour.Slice';
import ButtonComponent from 'Components/Button/Button';
import { updateModalShow } from 'Redux/Slice/Common.Slice';
import { deleteTourImages, editTourDetails, getSelectedTourDetails, uploadTourImages } from 'Redux/Action/Admin.Action';
import Spinner from 'Components/Spinner/CustomSpinner';

const AdminTourDetails = () => {

const dispatch = useDispatch()
const navigate = useCustomNavigate()
const [isEditing,setIsEditing] = useState(false)
const { id } = useParams()
const [selectedImage, setSelectedImage] = useState(null)
const {tour_package_details,selected_tour } = useCommonState()?.tourState
const { loading} = useCommonState()?.adminState


useEffect(() => {
    dispatch(getSelectedTourDetails(id))
  }, [id, tour_package_details])

useEffect(() => {
  if (selected_tour && !selectedImage) {
    setSelectedImage(selected_tour?.image_gallery?.[0]?.url || null)
  }
}, [selected_tour, selectedImage])


  const handleImageUpload = (files) => {
    if (!files) return
    const formData = new FormData()
    Array.from(files).forEach((file) => {
      formData.append("images", file)
    })
    dispatch(uploadTourImages(id, formData))
  }



  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <div className='d-flex align-items-center justify-content-center'>
              <span className='align-items-center' onClick={()=>navigate('/admin/packages')}><IoMdArrowRoundBack size={32} /></span>
               <h2 className='mb-0 '>Tour Management</h2>
          </div>
       
        <div className="d-flex gap-2">
          {isEditing ? (
            <>
              <ButtonComponent className="btn-success" buttonName={<div className='d-flex align-items-center gap-2'><FaSave /> Save</div>} 
              clickFunction={() => {
                setIsEditing(false)
                dispatch(editTourDetails(id,selected_tour))
              }} />
              <ButtonComponent className="btn-outline-secondary" buttonName={<div className='d-flex align-items-center gap-2'><FaTimes /> Cancel</div>} clickFunction={() => setIsEditing(false)} />
            </>
          ) : (
            <ButtonComponent className="btn-primary" buttonName={<div className='d-flex align-items-center gap-2'><MdEdit /> Edit Tour</div>} clickFunction={() => setIsEditing(true)} />
          )}
          <ButtonComponent className="btn-danger" buttonName={<div className='d-flex align-items-center gap-2'><MdDelete /> Delete Tour</div>} 
          clickFunction={() => {
            setIsEditing(false)
            dispatch(updateModalShow({show:true,close_btn:true,size:"md",modal_from:"Tours",modal_type:"delete_tour"}))
          }} />
        </div>
      </div>

      <Row>
        <Col xs={12} lg={6} className="p-2">
          <Card className="h-100" style={{maxHeight:"550px"}}>
            {loading ? (<div className='h-100 w-100 d-flex justify-content-center align=-items-center'><Spinner /></div>) : (<>
              <Card.Img
                variant="top"
                src={selectedImage}
                className="img-fluid object-fit-cover h-auto"
                style={{ maxHeight: '400px' }}
              />
              <Card.Body>
                <div className="d-flex flex-wrap gap-2 justify-content-start">
                  {selected_tour?.image_gallery?.map((img, index) => (
                    <div key={img?._id} className="position-relative" onClick={() => setSelectedImage(img?.url)}>
                      <BootstrapImage
                        src={img?.url}
                        alt={`Tour ${index + 1}`}
                        thumbnail
                        className={`${img === selectedImage ? 'border border-primary border-2' : ''}`}
                        style={{ width: '70px', height: '70px', objectFit: 'cover', cursor: 'pointer' }}
                      />
                      {isEditing && (
                        <Button
                          variant="danger"
                          size="sm"
                          className="position-absolute top-50 end-0 translate-middle"
                          style={{ zIndex: 1 }}
                          onClick={() => dispatch(deleteTourImages(id, img?.public_id))}
                        >
                          <MdDelete />
                        </Button>

                      )}
                    </div>
                  ))}
                  {(isEditing || selected_tour?.image_gallery?.length === 0) && (
                    <div style={{ width: "70px", height: "70px", position: "relative" }}>
                      <input
                        type="file"
                        id="imageUpload"
                        multiple
                        accept="image/*"
                        className='d-none'
                        onChange={(e) => handleImageUpload([...e.target.files])}
                      />
                      <ButtonComponent
                        className="btn-outline-primary h-100 w-100"
                        buttonName={<MdAddPhotoAlternate size={24} />}
                        clickFunction={() => document.getElementById("imageUpload").click()}
                      />
                    </div>
                  )}

                </div>
              </Card.Body>
            </>)}
          </Card>
        </Col>

        {/* Tour details column */}
        <Col xs={12} lg={6} className="p-2">
          <Card className="h-100 border-0">
            <Card.Body>
              {isEditing ? (
                <Form.Group controlId="title" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={selected_tour?.title}
                    onChange={(e)=> dispatch(update_selected_tour({title:e.target.value}))}
                  />
                </Form.Group>
              ) : (
                <h1 className="mb-3">{selected_tour?.title}</h1>
              )}

              <div className="d-flex align-items-center flex-wrap mb-3 gap-2">
                {isEditing ? (
                  <>
                    <Form.Group controlId="days" className="me-3">
                      <Form.Label>Days</Form.Label>
                      <Form.Control
                        type="number"
                        value={selected_tour?.days}
                        onChange={(e) => dispatch(update_selected_tour({ days: e.target.value }))}
                      />
                    </Form.Group>
                    <Form.Group controlId="country">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        value={selected_tour?.country}
                        onChange={(e) => dispatch(update_selected_tour({ country: e.target.value }))}
                      />
                    </Form.Group>
                  </>
                ) : (
                  <>
                    <Badge bg="success">
                      {selected_tour?.days} Days / {selected_tour?.days - 1} Nights
                    </Badge>
                    <Badge bg="info">
                      <MdOutlineLocationOn className="me-1" />
                      {selected_tour?.country}
                    </Badge>
                  </>
                )}
              </div>

              <div className="mb-4">
                {isEditing ? (
                  <Form.Group controlId="budget">
                    <Form.Label>Price (INR)</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <RiMoneyRupeeCircleLine />
                      </span>
                      <Form.Control
                        type="number"
                        value={selected_tour?.budget}
                        onChange={(e) => dispatch(update_selected_tour({ budget: e.target.value }))}
                      />
                    </div>
                  </Form.Group>
                ) : (
                  <>
                    <h3 className="text-primary">
                      <RiMoneyRupeeCircleLine className="me-2" />
                      {selected_tour?.budget?.toLocaleString('en-IN')} INR
                    </h3>
                    <p className="text-muted">Per person</p>
                  </>
                )}
              </div>

              <div className="mb-4">
                <h5 className="mb-3">Quick Facts</h5>
                {isEditing ? (
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={selected_tour?.description}
                      onChange={(e) => dispatch(update_selected_tour({ description: e.target.value }))}
                    />
                  </Form.Group>
                ) : (
                  <p><strong>Description:</strong> {selected_tour?.description}</p>
                )}

                <h6 className="mt-4 mb-2">Places Covered</h6>
                {isEditing ? (
                  <>
                    {selected_tour?.places_covered?.map((place, index) => (
                      <div key={index} className="mb-3 p-2 border rounded">
                        <Form.Group controlId={`placeName-${index}`} className="mb-2">
                          <Form.Label>Place Name</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={place?.name}
                            value={selected_tour?.places_covered[index]?.name}
                            onChange={(e) => dispatch(update_selected_tour({
                              field: "places_covered",
                              index,
                              key: "name",
                              value: e.target.value,
                              actionType: "update"
                            }))}
                          />
                        </Form.Group>
                        <Form.Group controlId={`placeDesc-${index}`}>
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={selected_tour?.places_covered[index]?.description}
                            onChange={(e) => dispatch(update_selected_tour({
                              field: "places_covered",
                              index,
                              key: "description",
                              value: e.target.value,
                              actionType: "update"
                            }))}
                          />
                        </Form.Group>
                        <ButtonComponent className="btn-outline-danger mt-2" size="sm" buttonName="Remove"
                          clickFunction={() => dispatch(update_selected_tour({
                            field: "places_covered",
                            index,
                            actionType: "remove"
                          }))}
                        />
                      </div>
                    ))}
                     <ButtonComponent className="btn-outline-primary mt-2" size="sm" buttonName="Add Place"
                          clickFunction={() => dispatch(update_selected_tour({
                            field: "places_covered",
                            actionType: "add"
                          }))}
                        />
                  </>
                ) : (
                  <ul className="mb-1">
                    {selected_tour?.places_covered?.map((place, index) => (
                      <li key={index}>
                        <strong>{place?.name}</strong> – {place?.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Inclusions & Exclusions */}
      <Row className="mb-4">
        <Col md={6} className='p-2'>
          <Card className="h-100">
            <Card.Body className="p-4">
              <h2 className="h4 mb-3 text-primary">Inclusions</h2>
              {isEditing ? (
                <>
                  {selected_tour?.inclusions?.map((_, index) => (
                    <div key={index} className="mb-2 d-flex align-items-center">
                      <Form.Control
                        type="text"
                        className="me-2"
                        value={selected_tour?.inclusions?.[index]}
                            onChange={(e) => dispatch(update_selected_tour({
                              field: "inclusions",
                              index,
                              value: e.target.value,
                              actionType: "update"
                            }))}
                      />
                      <ButtonComponent className="btn-outline-danger" size="sm" buttonName={<MdDelete />} 
                        clickFunction={() => dispatch(update_selected_tour({
                          field: "inclusions",
                          index,
                          actionType: "remove"
                        }))}
                      /> 
                    </div>
                  ))}
                  <ButtonComponent className="btn-outline-primary mt-2" size="sm" buttonName="Add Inclusion"
                    clickFunction={() => dispatch(update_selected_tour({
                      field: "inclusions",
                      actionType: "add"
                    }))}
                  />
                </>
              ) : (
                <ul className="list-unstyled mb-0">
                  {selected_tour?.inclusions?.map((item, index) => (
                    <li key={index} className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-success">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className='p-2'>
          <Card className="h-100">
            <Card.Body className="p-4">
              <h2 className="h4 mb-3 text-primary">Exclusions</h2>
              {isEditing ? (
                <>
                  {selected_tour?.exclusions?.map((item, index) => (
                    <div key={index} className="mb-2 d-flex align-items-center">
                      <Form.Control
                        type="text"
                        defaultValue={item}
                        className="me-2"
                        value={selected_tour?.exclusions?.[index]}
                            onChange={(e) => dispatch(update_selected_tour({
                              field: "exclusions",
                              index,
                              value: e.target.value,
                              actionType: "update"
                            }))}
                      />
                      <ButtonComponent className="btn-outline-danger" size="sm" buttonName={<MdDelete />} 
                        clickFunction={() => dispatch(update_selected_tour({
                          field: "exclusions",
                          index,
                          actionType: "remove"
                        }))}
                      /> 
                    </div>
                  ))}
                   <ButtonComponent className="btn-outline-primary mt-2" size="sm" buttonName="Add Exclusion"
                    clickFunction={() => dispatch(update_selected_tour({
                      field: "exclusions",
                      actionType: "add"
                    }))}
                  />
                </>
              ) : (
                <ul className="list-unstyled mb-0">
                  {selected_tour?.exclusions?.map((item, index) => (
                    <li key={index} className="mb-2 d-flex align-items-start">
                      <span className="me-2 text-danger">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminTourDetails;