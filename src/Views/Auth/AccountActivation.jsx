import ButtonComponent from 'Components/Button/Button';
import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import LinkComponent from 'Components/Router_components/LinkComponent';
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { handleAccountActivation, handleRegisterCredentials, handleResendOtp } from 'Redux/Action/Common.Action';
import { updateRegisterResponse, updateToastMessage } from 'Redux/Slice/Common.Slice';

const AccountActivation = () => {
    const {commonState} = useCommonState()
    const dispatch = useDispatch()
    const navigate = useCustomNavigate()
    const {email,otp}=commonState?.login_data
    const location = useLocation()

    useEffect(()=>{
      dispatch(updateRegisterResponse())
    },[location.pathname])


    const handleActivateAccount = ()=>{
        if(!email || !otp){
            dispatch(updateToastMessage({ message:'All fileds are required', type: "error" }))
            return
        }
        const payload = commonState?.login_data
        dispatch(handleAccountActivation({payload,navigate}))

    }

    const handleSumbitResendOtp =  ()=>{
        if(!email){
            dispatch(updateToastMessage({ message:'Email is required', type: "error" }))
            return
        }
        const payload = {email:commonState?.login_data?.email}
        dispatch(handleResendOtp({payload,navigate}))

    }
  return (
    <div className="auth-container">
    <div className="container-fluid ">
      <div className="row vh-100 d-flex justify-content-center align-items-center">
        <div className="login col-10 col-sm-8 col-md-6 col-lg-4 rounded-3 py-4">
          <div className="text-center">
            <h3 className="mt-4 fw-bold fs-2 text-white">WILDLENS TOUR</h3>
            <p className="fw-bold fs-4 text-info">Activate Your Account</p>
          </div>
          <div className="px-lg-4 ">
            <Form className="login-form">
              <Form.Group className="mb-3" controlId="">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={commonState?.login_data?.email}
                  onChange={(e) => {dispatch(handleRegisterCredentials({ email: e.target.value }))}}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Control
                  type="text"
                  placeholder="OTP"
                  value={commonState?.login_data?.otp}
                  onChange={(e) => {dispatch(handleRegisterCredentials({ otp: e.target.value }))}}
                />
              </Form.Group>
              <ButtonComponent type='button' className='btn btn-success w-100 mb-3' clickFunction={handleActivateAccount} buttonName='Activate' />
              <ButtonComponent type='button' className='btn btn-primary w-100' clickFunction={handleSumbitResendOtp} buttonName='Resend OTP' />
            </Form>
          </div>

          <div className="mb-3">
            <hr className="text-white" />
            <div className="auth-nav-text text-center text-white">
              <span className="me-2 fw-bold">Already Activated your account?</span>
              <LinkComponent to="/" className="fs-5 fw-bold text-warning" title='Sign In' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AccountActivation