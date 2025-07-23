import ButtonComponent from 'Components/Button/Button'
import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks'
import LinkComponent from 'Components/Router_components/LinkComponent'
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { handleForgotPassword, handleRegisterCredentials } from 'Redux/Action/Common.Action'
import { updateRegisterResponse, updateToastMessage } from 'Redux/Slice/Common.Slice'

const ForgotPassword = () => {
    const {commonState} = useCommonState()
    const dispatch = useDispatch()
    const navigate = useCustomNavigate()
    const location = useLocation()

    useEffect(()=>{
      dispatch(updateRegisterResponse())
    },[location.pathname])

    const handleSubmitForgetPassword = ()=>{
        if(!commonState?.login_data?.email){
            dispatch(updateToastMessage({ message:'Email is required', type: "error" }))
            return
        }
        const payload = {email:commonState?.login_data?.email}
        sessionStorage.setItem('user_email',commonState?.login_data?.email)
        dispatch(handleForgotPassword({payload,navigate}))

    }
  return (
    <div className="auth-container">
    <div className="container-fluid ">
      <div className="row vh-100 d-flex justify-content-center align-items-center">
        <div className="login col-10 col-sm-8 col-md-6 col-lg-4 rounded-3 py-4">
          <div className="text-center">
            <h3 className="mt-4 fw-bold fs-2 text-white">WILDLENS TOUR</h3>
            <p className="fw-bold fs-4 text-info">Forget Password</p>
          </div>
          <div className="px-lg-5 ">
            <Form className="login-form">
              <Form.Group className="mb-3" controlId="">
                <Form.Control type="email" placeholder="Email" value={commonState?.login_data?.email} onChange={(e)=>{dispatch(handleRegisterCredentials({email:e.target.value}))}}/>
              </Form.Group>
              <ButtonComponent type='button' className='btn btn-success w-100' clickFunction={handleSubmitForgetPassword} buttonName='SUBMIT' />
            </Form>
          </div>
          <div className="mb-3">
            <hr className="text-white" />
            <div className="auth-nav-text text-center text-white"><span className="me-2">Don't have an account?</span>
            <LinkComponent to='/signup' className='fs-5 fw-bold text-warning' title='Sign Up' />
           </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ForgotPassword