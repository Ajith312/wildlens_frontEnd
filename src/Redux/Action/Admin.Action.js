import { clear_new_booking_inputs, update_dropdown_tour_details, update_show_modal, updateBookingDetails, updateLoding, updateSelectedUserDetails, updateUserDetails } from "Redux/Slice/Admin.Slice"
import { updateModalShow, updateToastMessage } from "Redux/Slice/Common.Slice"
import axiosInstance from "Services/axiosInstance"



export const getAllUserDetails = () => async (dispatch) => {
    try {
        dispatch(updateLoding(true))
        const { data } = await axiosInstance.get('user/get-all-users')
        if (data?.error_code === 200) {
            dispatch(updateLoding(false))
            dispatch(updateUserDetails(data?.data))

        } else {
            dispatch(updateLoding(false))
            dispatch(updateToastMessage({ message: data?.message || "failed to fetch user details", type: "error" }))
        }

    } catch (error) {
        console.log('getAllUserDetails', error)
        dispatch(updateLoding(false))
        dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))

    }
}

export const getSingleUserDetails = (id)=>async(dispatch) =>{
    try {
         dispatch(updateLoding(true))
        const {data} = await axiosInstance(`user/get-user-details/${id}`)
        if(data?.error_code === 200){
            dispatch(updateSelectedUserDetails(data?.data))
            dispatch(updateLoding(false))
        }else{
            dispatch(updateLoding(false))
            dispatch(updateToastMessage({ message: data?.message || "failed to fetch user details", type: "error" }))
        }   
    } catch (error) {
        console.log('getAllUserDetails', error)
        dispatch(updateLoding(false))
        dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))
        
    }
}

export const getAllBookingDetails =({ page = 1, limit = 10, search = "", status = "" } = {}) =>async (dispatch) => {
    try {
      const { data } = await axiosInstance.get("tour/get-all-bookings", {params: { page, limit, search, status }})

      if (data?.error_code === 200) {
        dispatch(updateBookingDetails(data?.data));
      } else {
        dispatch(updateToastMessage({message: data?.message || "Failed to fetch booking details",type: "error"}))
      }
    } catch (error) {
      console.log("Error in getAllBookingDetails", error);
      dispatch(updateToastMessage({message:error?.response?.data?.message || "Something went wrong",type: "error"}))
    }
  };

  export const getDropDownTourDetails = ()=>async(dispatch)=>{
    try {
        
        const { data} = await axiosInstance.get('tour/get-alltours-admin')
        if(data?.error_code === 200){
            dispatch(update_dropdown_tour_details(data?.data))
        }else{ 
            dispatch(updateToastMessage({message: data?.message || "Failed to fetch tour details",type: "error"}))
        }
    } catch (error) {
         console.log("Error in getDropDownTourDetails", error);
      dispatch(updateToastMessage({message:error?.response?.data?.message || "Something went wrong",type: "error"}))
    }
  }

  export const bookTourByAdmin =(payload)=>async(dispatch,getState)=>{
    try {
        const { data} =  await axiosInstance.post('tour/book-tour-byadmin',payload)
        if(data?.error_code === 200){
            const {booking_filter_inputs} = getState()?.adminState || {}
            dispatch(updateModalShow({}))
            dispatch(getAllBookingDetails({status: booking_filter_inputs?.status || "all",search: booking_filter_inputs?.search || ""}))
            dispatch(clear_new_booking_inputs())

        }else{
            dispatch(updateToastMessage({message: data?.message || "Failed to book a tour",type: "error"}))
        }
        
    } catch (error) {
        console.log("Error in bookTourByAdmin", error);
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
    }
  }

  export const handleConfirmBooking = (id)=>async(dispatch,getState)=>{
    try {
        const {data} = await axiosInstance.patch(`tour/confirm-booking/${id}`)
        if(data?.error_code === 200){
             const {booking_filter_inputs} = getState()?.adminState || {}
            dispatch(updateModalShow({}))
            dispatch(getAllBookingDetails({status: booking_filter_inputs?.status || "all",search: booking_filter_inputs?.search || ""}))
        }
        
    } catch (error) {
         console.log("Error in bookTourByAdmin", error);
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
    }
  }


  export const handleCancelBooking = (id)=>async(dispatch,getState)=>{
    try {
        const {data} = await axiosInstance.patch(`tour/cancel-booking/${id}`)
        if(data?.error_code === 200){
             const {booking_filter_inputs} = getState()?.adminState || {}
            dispatch(updateModalShow({}))
            dispatch(getAllBookingDetails({status: booking_filter_inputs?.status || "all",search: booking_filter_inputs?.search || ""}))
        }
        
    } catch (error) {
         console.log("Error in bookTourByAdmin", error);
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
    }
  }