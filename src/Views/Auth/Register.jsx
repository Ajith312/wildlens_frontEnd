import ButtonComponent from 'Components/Button/Button'
import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks'
import LinkComponent from 'Components/Router_components/LinkComponent'
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { handleRegister, handleRegisterCredentials } from 'Redux/Action/Common.Action'
import { updateRegisterResponse, updateToastMessage } from 'Redux/Slice/Common.Slice'

const Register = () => {
    const { commonState} = useCommonState()
    const dispatch = useDispatch()
    const navigate = useCustomNavigate()
    const location = useLocation()

      useEffect(()=>{
        dispatch(updateRegisterResponse())
      },[location.pathname])


    const handleRegisterSubmit = ()=>{
        const {user_name,email,password,confirm_password} = commonState?.login_data
        if(!user_name || !email || !password || !confirm_password || (password!==confirm_password)){
            dispatch(updateToastMessage({ message:'All fileds are required', type: "error" }))
            return
        }
         let payload = commonState?.login_data
        dispatch(handleRegister({payload,navigate}));
    }
    return (
        <div className="auth-container">
            <div className="container-fluid">
                <div className="row vh-100 d-flex justify-content-center align-items-center">
                    <div className="sign-up col-10 col-sm-8 col-md-6 col-lg-4 rounded-3">
                        <div className="text-center">
                            <h3 className="mt-4 fw-bold fs-2 text-white">WILDLENS TOUR</h3>
                            <p className="fw-bold fs-4 text-info">SIGN UP</p>
                        </div>
                        <div className="px-lg-5">
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        value={commonState?.login_data?.user_name}
                                        onChange={(e) => dispatch(handleRegisterCredentials({ user_name: e.target.value }))}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        value={commonState?.login_data?.email}
                                        onChange={(e) => dispatch(handleRegisterCredentials({ email: e.target.value }))}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={commonState?.login_data?.password}
                                        onChange={(e) => dispatch(handleRegisterCredentials({ password: e.target.value }))}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={commonState?.login_data?.confirm_password}
                                        onChange={(e) =>
                                            dispatch(handleRegisterCredentials({ confirm_password: e.target.value }))
                                        }
                                    />
                                </Form.Group>

                                <ButtonComponent 
                                    type='button'
                                    className="btn btn-success w-100"
                                    clickFunction={handleRegisterSubmit}
                                    buttonName='SIGN UP'
                                />
                            </Form>
                        </div>
                        <div className="mb-3">
                            <hr className="text-white" />
                            <div className="auth-nav-text text-center text-white">
                                <span className="me-2 fw-bold">Already have an account?</span>
                                <LinkComponent to="/" className="fs-5 fw-bold text-warning" title='Login' />
                            </div>
                            <div className="auth-nav-text text-center text-white">
                                <span className="me-2 fw-bold">Activate your account?</span>
                                <LinkComponent to="/account-activation" className="fs-5 fw-bold text-primary" title='Activate' />
                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register