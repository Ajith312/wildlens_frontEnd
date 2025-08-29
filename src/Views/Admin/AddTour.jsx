import React from 'react'
import { Formik, Form as FormikForm, FieldArray } from 'formik'
import * as Yup from 'yup'
import { Button, Col, Row, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { handleAddTour, handleAddTourInputs } from 'Redux/Action/Tour.Action'
import { useCustomNavigate } from 'Components/CustomHooks'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  country: Yup.string().required('Country is required'),
  description: Yup.string().required('Description is required'),
  days: Yup.string().required('Days are required'),
  budget: Yup.number().required('Budget is required').positive(),
  plan_title: Yup.string().required('Plan title is required'),
  plan_description: Yup.string().required('Plan description is required'),
  inclusions: Yup.string()
  .required('Inclusions are required')
  .test('is-not-empty', 'Please enter at least one item', value => value && value.trim().length > 0),
  exclusions: Yup.string()
  .required('Exclusions are required')
  .test('is-not-empty', 'Please enter at least one item', value => value && value.trim().length > 0),

  places_covered: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Place name is required'),
      description: Yup.string().required('Description is required'),
    })
  ),
})

const AddTourForm = ({ onSubmit }) => {
  const dispatch = useDispatch()
  const navigate = useCustomNavigate()

  return (
    <Formik
      initialValues={{
        title: '',
        country: '',
        description: '',
        days: '',
        budget: '',
        plan_title: '',
        plan_description: '',
        inclusions: '',
        exclusions: '',
        places_covered: [{ name: '', description: '' }],
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        const payload = {
          ...values,
          inclusions: values?.inclusions?.split(',').map(item => item.trim()).filter(Boolean),
          exclusions: values?.exclusions?.split(',').map(item => item.trim()).filter(Boolean),
        };

        try {
          dispatch(handleAddTourInputs(payload))
          await dispatch(handleAddTour({payload,navigate}))
          resetForm();
        } catch (err) {
            console.log(err)
        }
      }}

    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <FormikForm className='p-4 border rounded bg-white' onSubmit={handleSubmit}>
          <h4 className='text-success mb-4'>Add Tour</h4>

          <Row className='mb-3'>
            <Col md={6} className='p-2'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.title && !!errors.title}
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Col>
            <Col md={6} className='p-2'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                name="country"
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.country && !!errors.country}
              />
              <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
            </Col>
          </Row>

          <Form.Group className='mb-3 p-2'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.description && !!errors.description}
            />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>

          <h5 className='text-primary mb-3'>Plan Details</h5>

          <Row className='mb-3'>
            <Col md={4} className='p-2'>
              <Form.Label>Days</Form.Label>
              <Form.Select
                name="days"
                value={values.days}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.days && !!errors.days}
              >
                <option value="">Select Days</option>
                <option value="3">3 Days</option>
                <option value="5">5 Days</option>
                <option value="7">7 Days</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.days}</Form.Control.Feedback>
            </Col>
            <Col md={4} className='p-2'>
              <Form.Label>Budget</Form.Label>
              <Form.Control
                type="number"
                name="budget"
                value={values.budget}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.budget && !!errors.budget}
              />
              <Form.Control.Feedback type="invalid">{errors.budget}</Form.Control.Feedback>
            </Col>
            <Col md={4} className='p-2'>
              <Form.Label>Plan Title</Form.Label>
              <Form.Select
                name="plan_title"
                value={values.plan_title}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.plan_title && !!errors.plan_title}
              >
                <option value="">Select Plan</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.plan_title}</Form.Control.Feedback>
            </Col>
          </Row>

          <Form.Group className='mb-3 p-2'>
            <Form.Label>Plan Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="plan_description"
              value={values.plan_description}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.plan_description && !!errors.plan_description}
            />
            <Form.Control.Feedback type="invalid">{errors.plan_description}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3 p-2'>
            <Form.Label>Inclusions (comma-separated)</Form.Label>
            <Form.Control
              name="inclusions"
              value={values.inclusions}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.inclusions && !!errors.inclusions}
            />
            <Form.Control.Feedback type="invalid">{errors.inclusions}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3 p-2'>
            <Form.Label>Exclusions (comma-separated)</Form.Label>
            <Form.Control
              name="exclusions"
              value={values.exclusions}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.exclusions && !!errors.exclusions}
            />
            <Form.Control.Feedback type="invalid">{errors.exclusions}</Form.Control.Feedback>
          </Form.Group> 
          <h6 className='mt-4 mb-2'>Places Covered</h6>

          <FieldArray name="places_covered">
            {({ push, remove }) => (
              <>
                {values.places_covered.map((place, index) => (
                  <div key={index} className='border rounded p-3 mb-3'>
                    <Row className='mb-2'>
                      <Col className='p-2'>
                        <Form.Label>Place Name</Form.Label>
                        <Form.Control
                          name={`places_covered[${index}].name`}
                          value={place.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={
                            touched.places_covered?.[index]?.name &&
                            !!errors.places_covered?.[index]?.name
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.places_covered?.[index]?.name}
                        </Form.Control.Feedback>
                      </Col>
                    </Row>
                    <Form.Group className='p-2'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name={`places_covered[${index}].description`}
                        value={place.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.places_covered?.[index]?.description &&
                          !!errors.places_covered?.[index]?.description
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.places_covered?.[index]?.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                ))}
                <Button
                  variant="outline-secondary"
                  onClick={() => push({ name: '', description: '' })}
                  className="mb-4"
                >
                  + Add Another Place
                </Button>
              </>
            )}
          </FieldArray>

          <div className='d-flex gap-3'>
            <Button variant='success' type='submit'>Submit Tour</Button>
            <Button variant='secondary' type='reset'>Cancel</Button>
          </div>
        </FormikForm>
      )}
    </Formik>
  )
}

export default AddTourForm
