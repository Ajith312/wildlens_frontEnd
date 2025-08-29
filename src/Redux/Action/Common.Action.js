import { clearUserDetails, update_login_data, updateCanvasShow, updateLoading, updateLoadingTwo, updateLoginResponse, updateProfileDetails, updateRefreshToken, updateRegisterResponse, updateToastMessage } from "Redux/Slice/Common.Slice";
import axiosInstance from "Services/axiosInstance";
import axios from "axios";
import Cookies from "js-cookie";
const BASE_URl = import.meta.env.VITE_APP_API_URL;

export const handleRegisterCredentials = (value) => (dispatch) => {
    dispatch(update_login_data(value));
  };
export const handleUpdateCanvasShow = (dispatch) => {
    dispatch(updateCanvasShow())
}


export const handleLogin = ({payload,navigate}) => async (dispatch) => {
    try {
      dispatch(updateLoading(true))
      const {data} = await axios.post(`${BASE_URl}/user/login`, payload)
      if (data?.success) {
        const {role,token} = data?.data
        dispatch(updateLoginResponse(data?.data))
        Cookies.set('user_role',role)
        Cookies.set('token',token)
        dispatch(updateToastMessage({ message:data?.message, type: "success" }))
        dispatch(updateLoading(false))
        if(role === 'user'){
          navigate('user/home')
        }else if(role === 'admin'){
          navigate('admin/home')
        }
      }else{
        dispatch(updateLoading(false))
        dispatch(updateToastMessage({ message:data?.message, type: "error" }))
        console.log('error')
      }
    } catch (error) {
      console.log('handleLogin',error)
      dispatch(updateLoading(false))
      dispatch(updateToastMessage({ message:data?.message, type: "error" }))
    }
  };

export const handleRegister = ({payload,navigate})=>async(dispatch)=>{
    try {
       dispatch(updateLoading(true))
      const {data} = await axios.post(`${BASE_URl}/user/signup`, payload)
      if(data?.success){
        dispatch(updateRegisterResponse())
         dispatch(updateLoading(false))
        navigate('/account-activation')
        dispatch(updateToastMessage({ message:data?.message, type: "success" }))
      }else{
        dispatch(updateToastMessage({ message:data?.message, type: "error" }))
        console.log('error')
      } 
    } catch (error) {
      console.log('Error in handleRegister ',error)
       dispatch(updateLoading(false))
      dispatch(updateToastMessage({ message:data?.message, type: "error" }))
      
    }
  }

export const handleAccountActivation = ({payload,navigate})=>async(dispatch)=>{
      try {
        dispatch(updateLoading(true))
        const { data} = await axios.post(`${BASE_URl}/user/accountactivation`, payload)
        if(data?.success){
          navigate('/')
          dispatch(updateLoading(false))
          dispatch(updateRegisterResponse())

        }else{
           dispatch(updateLoading(false))
          dispatch(updateToastMessage({ message:data?.message, type: "error" }))
        }
       
      } catch(error) {
        console.log('Error in handleRegister ',error)
         dispatch(updateLoading(false))
        dispatch(updateToastMessage({ message:data?.message, type: "error" }))
      }
  }

export const handleResendOtp = ({payload,navigate})=>async(dispatch)=>{
    try {
      dispatch(updateLoadingTwo(true))
      const { data} = await axios.post(`${BASE_URl}/user/resend-otp`, payload)
      if(data?.success){
        navigate('/account-activation')
        dispatch(updateLoadingTwo(false))
        dispatch(updateRegisterResponse())
        dispatch(updateToastMessage({ message:data?.message, type: "success" }))

      }else{
        dispatch(updateRegisterResponse())
         dispatch(updateLoadingTwo(false))
        dispatch(updateToastMessage({ message:data?.message, type: "error" }))
        console.log('error')
      }
      
    } catch (error) {
      console.log('Error in handleResendOtp ',error)
       dispatch(updateLoadingTwo(false))
      dispatch(updateToastMessage({ message:data?.message, type: "error" }))
    }
  }

export const handleForgotPassword = ({payload,navigate})=> async(dispatch)=>{
    try {
      dispatch(updateLoading(true))
      const {data} = await axios.post(`${BASE_URl}/user/forgot-password`,payload)
      if(data?.success){
        navigate('/change-password')
        dispatch(updateLoading(false))
        dispatch(updateRegisterResponse())
        dispatch(updateToastMessage({ message:data?.message, type: "success" }))

      }else{
        dispatch(updateRegisterResponse())
         dispatch(updateLoading(false))
        dispatch(updateToastMessage({ message:data?.message, type: "error" }))
        console.log('error')
      }
      
    } catch (error) {
      console.log('Error in handleForgotPassword ',error)
       dispatch(updateLoading(false))
      dispatch(updateToastMessage({ message:data?.message, type: "error" }))
      
    }
  }


export const handleChangePassword = ({payload,navigate})=> async(dispatch)=>{
    try {
      dispatch(updateLoading(true))
      const {data} = await axios.post(`${BASE_URl}/user/change-password`,payload)
      if(data?.success){
        navigate('/')
        dispatch(updateLoading(false))
        dispatch(updateRegisterResponse())
        dispatch(updateToastMessage({ message:data?.message, type: "success" }))

      }else{
        dispatch(updateRegisterResponse())
         dispatch(updateLoading(false))
        dispatch(updateToastMessage({ message:data?.message, type: "error" }))
        console.log('error')
      }
      
    } catch (error) {
      console.log('Error in handleChangePassword ',error)
       dispatch(updateLoading(false))
      dispatch(updateToastMessage({ message:data?.message, type: "error" }))
      
    }

  }

export const handlerefreshToken =()=> async(dispatch)=>{
     try {
        const { data } = await axiosInstance.get(`${BASE_URl}/user/get-referesh-token`);
        if (data.error_code === 200) {
          let token = data?.data?.token
            dispatch(updateRefreshToken(token))
           Cookies.set("token",token)
        } else {
          console.log('refresh token failed')
        }
    } catch (error) {
       console.log(error)

    }
}

export const getProfileDetails = ()=>async(dispatch)=>{
  try {
    const {data} = await axiosInstance('user/get-profile-details')
    if(data?.error_code === 200){
      dispatch(updateProfileDetails(data?.data))
    }else{
      
    }
  } catch (error) {
     console.log('Error in getProfileDetails ',error)
      dispatch(updateToastMessage({ message:data?.message, type: "error" }))
  }
}

export const handleLogout = (navigate)=>async(dispatch)=>{
  try {
    Cookies.remove('user_role')
    Cookies.remove('token')
    dispatch(clearUserDetails())
    navigate('/')
  } catch (error) {
    console.log("handleLogout",error)
    dispatch(updateToastMessage({ message:"Logout failed", type: "error" }))
  }
}