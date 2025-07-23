import ButtonComponent from 'Components/Button/Button'
import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks'
import LinkComponent from 'Components/Router_components/LinkComponent'
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { handleChangePassword, handleRegisterCredentials } from 'Redux/Action/Common.Action'
import { updateRegisterResponse, updateToastMessage } from 'Redux/Slice/Common.Slice'

const ChangePassword = () => {
   const {commonState} = useCommonState()
      const dispatch = useDispatch()
      const navigate = useCustomNavigate()
      const {otp,password,confirm_password}=commonState?.login_data
      const location = useLocation()

      useEffect(()=>{
        dispatch(updateRegisterResponse())
      },[location.pathname])

  const handleSubmitChangePassword = ()=>{
    if(!otp || !password || !confirm_password || (password!==confirm_password)){
      dispatch(updateToastMessage({ message:'All fileds are required', type: "error" }))
      return
    }
    const user_email = sessionStorage.getItem('user_email')
    console.log(user_email,'27')
    const payload = {
      pwd_verify_string:Number(otp),
      password:password,
      email:user_email
    }
    dispatch(handleChangePassword({payload,navigate}))
  }


  return (
    <div className="auth-container">
      <div className="container-fluid ">
        <div className="row vh-100 d-flex justify-content-center align-items-center">
          <div className="login col-10 col-sm-8 col-md-6 col-lg-4 rounded-3 py-4">
            <div className="text-center">
              <h3 className="mt-4 fw-bold fs-2 text-white">WILDLENS TOUR</h3>
              <p className="fw-bold fs-4 text-info">Change Password</p>
            </div>
            <div className="px-lg-5 ">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => { dispatch(handleRegisterCredentials({ otp: e.target.value })) }} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control type="password" placeholder="Password"
                    value={password}
                    onChange={(e) => { dispatch(handleRegisterCredentials({ password: e.target.value })) }} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirm_password}
                    onChange={(e) => { dispatch(handleRegisterCredentials({ confirm_password: e.target.value })) }}
                  />
                </Form.Group>
                <ButtonComponent type='button' className='btn btn-success w-100' clickFunction={handleSubmitChangePassword} buttonName='SUBMIT' />
              </Form>
            </div>
            <div className="mb-3">
              <hr className="text-white" />
              <div className="auth-nav-text text-center text-white">
                <span className="me-2">Don't have an account?</span>
                <LinkComponent to="/signup" className="fs-5 fw-bold text-warning" title='Sign up' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword