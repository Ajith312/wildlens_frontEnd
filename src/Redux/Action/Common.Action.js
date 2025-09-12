import { saveAccountToCookie } from "Functions/AuthFunction";
import { clearPasswordInputs, clearUserDetails, update_login_data, updateCanvasShow, updateLoading, updateLoadingTwo, updateLoginResponse, updatePasswordInputs, updateProfileDetails, updateProfileEditing, updateRefreshToken, updateRegisterResponse, updateToastMessage } from "Redux/Slice/Common.Slice";
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
        saveAccountToCookie(role,token)
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
    dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))
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
      dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))
      
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
        dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))
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
      dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))
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
      }
      
    } catch (error) {
      console.log('Error in handleForgotPassword ',error)
       dispatch(updateLoading(false))
      dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))
      
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
      }
      
    } catch (error) {
      console.log('Error in handleChangePassword ',error)
       dispatch(updateLoading(false))
     dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))
      
    }

  }

export const handlerefreshToken =()=> async(dispatch)=>{
     try {
        const { data } = await axiosInstance.get(`${BASE_URl}/user/get-referesh-token`);
        if (data.error_code === 200) {
          let {token,role} = data?.data
          dispatch(updateRefreshToken(token))
          saveAccountToCookie(role, token)
        } else {
         dispatch(handleLogout())
        }
    } catch (error) {
       console.log(error)
       dispatch(handleLogout());
      dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))
    }
}

export const getProfileDetails = ()=>async(dispatch)=>{
  try {
    const {data} = await axiosInstance('user/get-profile-details')
    if(data?.error_code === 200){
      dispatch(updateProfileDetails(data?.data))
    }else{
      dispatch(updateToastMessage({ message:data?.message, type: "error" }))
    }
  } catch (error) {
     console.log('Error in getProfileDetails ',error)
     dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))
  }
}

export const handleLogout = (navigate)=>async(dispatch)=>{
  try {
    Cookies.remove('user_role')
    Cookies.remove('token')
    dispatch(clearUserDetails())
    navigate('/')
  } catch (error) {
    console.log("handleLogout", error)
    dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
  }
}

export const editUserProfile = ()=> async (dispatch)=>{
  try {
    
  } catch (error) {
    console.log("handleLogout", error)
    dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
  }
}

export const editProfilePicture = (formdata)=> async (dispatch)=>{
  try {
    dispatch(updateLoading(true))
    const {data} = await axiosInstance.post('user/upload-profileimage',formdata)
    if(data?.error_code === 200){
      dispatch(getProfileDetails())
      dispatch(updateLoading(false))
      dispatch(updateToastMessage({message:data?.message || "profile picture upload succesfully",type: "success"}))
    }else{
      dispatch(updateLoading(false))
      dispatch(updateToastMessage({message:data?.message || "Failed to change profile picture",type: "error"}))
    }
    
  } catch (error) {
    console.log("handleLogout", error)
    dispatch(updateLoading(false))
    dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
  }
}

export const editProfileInfo = (payload)=> async(dispatch)=>{
      try {
        const {data} = await axiosInstance.patch('user/edit-user-profile',payload)
        if(data?.error_code === 200){
          dispatch(getProfileDetails())
          dispatch(updateProfileEditing(false))
        }else{
           dispatch(updateToastMessage({message:data?.message || "Failed to change profile information",type: "error"}))
        }
        
      } catch (error) {
        console.log("handleLogout", error)
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
      }
}

export const handleUpdatePassword = (payload)=>async(dispatch)=>{
    try {
        dispatch(updatePasswordInputs({ is_loading: true }))
        const {data} = await axiosInstance.post("user/change-password",payload)
        if(data?.error_code === 200){
            dispatch(updateToastMessage({ message: data?.message || "Something went wrong", type: "success" }))
            dispatch(updatePasswordInputs({ is_loading: false }))
            dispatch(clearPasswordInputs())
        }else{
            dispatch(updateToastMessage({ message: data?.message || "Something went wrong", type: "error" }))
            dispatch(updatePasswordInputs({ is_loading: false }))
        }
        
    } catch (error) {
         console.log('handleUpdatePassword', error)
         dispatch(updatePasswordInputs({ is_loading: false }))
        dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))
    }
}