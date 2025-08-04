import { update_login_data, updateCanvasShow, updateLoginResponse, updateRegisterResponse, updateToastMessage } from "Redux/Slice/Common.Slice";
import axios from "axios";
import Cookies from "js-cookie";
const BASE_URl = import.meta.env.VITE_APP_API_URl;

export const handleRegisterCredentials = (value) => (dispatch) => {
    dispatch(update_login_data(value));
  };
  export const handleUpdateCanvasShow = (dispatch) => {
    dispatch(updateCanvasShow())
}


export const handleLogin = ({payload,navigate}) => async (dispatch) => {
    try {
      const {data} = await axios.post(`${BASE_URl}/user/login`, payload)
      if (data?.success) {
        const {role,token} = data?.data
        dispatch(updateLoginResponse(data?.data))
        Cookies.set('user_role',role)
        Cookies.set('token',token)
        dispatch(updateToastMessage({ message:data?.message, type: "success" }))
        if(role === 'user'){
          navigate('user/home')
        }else if(role === 'admin'){
          navigate('admin_home')
        }
      }else{
        dispatch(updateToastMessage({ message:data?.message, type: "error" }))
        console.log('error')
      }
    } catch (error) {
      console.log('handleLogin',error)
      dispatch(updateToastMessage({ message:data?.message, type: "error" }))
    }
  };

export const handleRegister = ({payload,navigate})=>async(dispatch)=>{
    try {
      const {data} = await axios.post(`${BASE_URl}/user/signup`, payload)
      if(data?.success){
        dispatch(updateRegisterResponse())
        navigate('/account-activation')
        dispatch(updateToastMessage({ message:data?.message, type: "success" }))
      }else{
        dispatch(updateToastMessage({ message:data?.message, type: "error" }))
        console.log('error')
      } 
    } catch (error) {
      console.log('Error in handleRegister ',error)
      dispatch(updateToastMessage({ message:data?.message, type: "error" }))
      
    }
  }

  export const handleAccountActivation = ({payload,navigate})=>async(dispatch)=>{
      try {
        const { data} = await axios.post(`${BASE_URl}/user/accountactivation`, payload)
        if(data?.success){
          navigate('/')
          dispatch(updateRegisterResponse())

        }else{
          dispatch(updateToastMessage({ message:data?.message, type: "error" }))
          console.log('error')
        }
       
      } catch(error) {
        console.log('Error in handleRegister ',error)
        dispatch(updateToastMessage({ message:data?.message, type: "error" }))
      }
  }

  export const handleResendOtp = ({payload,navigate})=>async(dispatch)=>{
    try {
      const { data} = await axios.post(`${BASE_URl}/user/resend-otp`, payload)
      if(data?.success){
        navigate('/account-activation')
        dispatch(updateRegisterResponse())
        dispatch(updateToastMessage({ message:data?.message, type: "success" }))

      }else{
        dispatch(updateRegisterResponse())
        dispatch(updateToastMessage({ message:data?.message, type: "error" }))
        console.log('error')
      }
      
    } catch (error) {
      console.log('Error in handleResendOtp ',error)
      dispatch(updateToastMessage({ message:data?.message, type: "error" }))
    }
  }

  export const handleForgotPassword = ({payload,navigate})=> async(dispatch)=>{
    try {
      const {data} = await axios.post(`${BASE_URl}/user/forgot-password`,payload)
      if(data?.success){
        navigate('/change-password')
        dispatch(updateRegisterResponse())
        dispatch(updateToastMessage({ message:data?.message, type: "success" }))

      }else{
        dispatch(updateRegisterResponse())
        dispatch(updateToastMessage({ message:data?.message, type: "error" }))
        console.log('error')
      }
      
    } catch (error) {
      console.log('Error in handleForgotPassword ',error)
      dispatch(updateToastMessage({ message:data?.message, type: "error" }))
      
    }
  }


  export const handleChangePassword = ({payload,navigate})=> async(dispatch)=>{
    try {
      const {data} = await axios.post(`${BASE_URl}/user/change-password`,payload)
      if(data?.success){
        navigate('/')
        dispatch(updateRegisterResponse())
        dispatch(updateToastMessage({ message:data?.message, type: "success" }))

      }else{
        dispatch(updateRegisterResponse())
        dispatch(updateToastMessage({ message:data?.message, type: "error" }))
        console.log('error')
      }
      
    } catch (error) {
      console.log('Error in handleChangePassword ',error)
      dispatch(updateToastMessage({ message:data?.message, type: "error" }))
      
    }

  }