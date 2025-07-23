import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LinkComponent from "Components/Router_components/LinkComponent";
import { handleLogin, handleRegisterCredentials } from "Redux/Action/Common.Action";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
import { updateRegisterResponse, updateToastMessage } from "Redux/Slice/Common.Slice";
import ButtonComponent from "Components/Button/Button";
import { useLocation } from "react-router-dom";


const Login = () => {
  const {commonState} = useCommonState()
  const dispatch = useDispatch();
  const navigate=useCustomNavigate()
  const location = useLocation()

  useEffect(()=>{
    dispatch(updateRegisterResponse())
  },[location.pathname])

  const handleLoginSubmit = () => {
    const {email,password}=commonState?.login_data
    if (!email || !password) {
        dispatch(updateToastMessage({ message:'All fileds are required', type: "error" }))
      return;
    }
    let payload = commonState?.login_data
    dispatch(handleLogin({payload,navigate}));
  };

  return (
    <>
      <div className="auth-container">
        <div className="container-fluid ">
          <div className="row vh-100 d-flex justify-content-center align-items-center">
            <div className="login col-10 col-sm-8 col-md-6 col-lg-4 rounded-3 py-4">
              <div className="text-center">
                <h3 className="mt-4 fw-bold fs-2 text-white">WILDLENS TOUR</h3>
                <p className="fw-bold fs-4 text-info">LOGIN</p>
              </div>
              <div className="px-lg-5 ">
                <Form className="login-form">
                  <Form.Group className="mb-3" controlId="">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={commonState?.login_data?.email}
                      onChange={(e) =>dispatch(handleRegisterCredentials({ email: e.target.value }))}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={commonState?.login_data?.password}
                      onChange={(e) =>dispatch( handleRegisterCredentials({password: e.target.value}))}
                    />
                  </Form.Group>
                  <ButtonComponent type='button' className='btn btn-success w-100' clickFunction={handleLoginSubmit} buttonName='LOGIN' />
                </Form>
              </div>
              <div className="mb-3">
                <hr className="text-white" />
                <div className="auth-nav-text text-center text-white">
                  <span className="me-2 fw-bold">Don't have an account?</span>
                  <LinkComponent to={"/signup"} className="fs-5 fw-bold text-warning" title='Sign Up' />
                </div>
              </div>
              <div className="auth-nav-text text-center text-white">
                <span className="me-2 fw-bold">Forget Password?</span>
                <LinkComponent
                  to="/forgot-password"
                  className="fs-5 fw-bold text-primary"
                  title="Change password"
                />
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
