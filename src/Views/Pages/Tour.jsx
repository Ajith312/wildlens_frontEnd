import React, { useEffect } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import TourCard from 'Components/Card/TourCard';
import Image from 'Utils/Image';
import ButtonComponent from 'Components/Button/Button';
import { useCommonState, useDispatch } from 'Components/CustomHooks';
import { getAllTours,getCountryLists, handleFilterTours } from 'Redux/Action/Tour.Action';
import { clearFilterInputs, update_filter_inputs } from 'Redux/Slice/Tour.Slice';
import Spinner from 'Components/Spinner/CustomSpinner';

const Tour = () => {
  const dispatch = useDispatch()
  const { tour_package_details, country_details, filter_inputs, loading } = useCommonState()?.tourState

  useEffect(() => {
    dispatch(getAllTours())
    dispatch(getCountryLists())
  }, [])

  const filterTours = () => {
    dispatch(handleFilterTours(filter_inputs))
  }

  const resetFilters = () => {
    dispatch(getAllTours())
    dispatch(clearFilterInputs())
  }
  return (
    <div className="container-fluid d-flex flex-column p-0 h-100">
      <div className="coverImageContainer d-flex justify-content-center align-items-center position-relative">
        <img src={Image.heroSection} alt="cover-image" className="coverImage w-100 h-100" />
        <p className="coverText position-absolute text-white fw-bold">Explore Tours</p>
      </div>

      <Row className='my-4 px-3'>
        <Col xs={12} md={12} lg={3} className="mb-4">
          <Card className="p-3  sticky-top" style={{ top: '150px' }} >
            <h5 className="mb-3">Filter Tours</h5>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Select value={filter_inputs.country} onChange={(e) => dispatch(update_filter_inputs({ country: e.target.value }))}>
                <option value="all">All Countries</option>
                {country_details && country_details?.length > 0 ? country_details?.map((country, i) => {
                  return <option key={i} value={country}>{country}</option>
                }) : <option key="all" value="all">All</option>
                }
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price Range: {filter_inputs?.min_price} -{filter_inputs?.max_price} </Form.Label>
              <Form.Range min={0} max={30000} value={filter_inputs.min_price} onChange={(e) => dispatch(update_filter_inputs({ min_price: e.target.value }))} />
              <Form.Range min={50000} max={700000} value={filter_inputs.max_price} onChange={(e) => dispatch(update_filter_inputs({ max_price: e.target.value }))} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (days)</Form.Label>
              <Form.Select value={filter_inputs.duration} onChange={(e) => dispatch(update_filter_inputs({ duration: e.target.value }))}>
                <option value="all">Any</option>
                <option value="3">3 Days</option>
                <option value="5">5 Days</option>
                <option value="7">7 Days</option>
              </Form.Select>
            </Form.Group>
            <ButtonComponent className="btn-success w-100 mb-3" buttonName="Apply Filters" clickFunction={filterTours} />
            <ButtonComponent className="btn-outline-danger w-100" buttonName="Reset Filters" clickFunction={resetFilters} />
          </Card>
        </Col>

        {loading ? <Col xs={12} md={12} lg={9} className="d-flex justify-content-center align-items-center" style={{ minHeight: "45vh" }}>
          <Spinner />
        </Col> : <Col xs={12} md={12} lg={9} className="px-3">
          <Row className="h-100">
            {tour_package_details && tour_package_details?.length > 0 ?
              tour_package_details?.map((tour) => (
                <Col key={tour._id} xs={12} sm={6} lg={6} xl={4} xxl={3} className='p-2 tour-card-box'>
                  <TourCard tour={tour} />
                </Col>
              )) : <Col className='d-flex justify-content-center align-items-center' style={{ minHeight: "45vh" }}><p className='text-muted fs-3'>No Tours Available</p></Col>
            }

          </Row>
        </Col>}

      </Row>
    </div>
  );
};

export default Tour;
