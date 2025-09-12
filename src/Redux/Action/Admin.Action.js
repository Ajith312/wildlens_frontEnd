import { clear_new_booking_inputs, update_dropdown_tour_details,update_enquiry_details,update_new_booking_inputs,updateBookingDetails, updateLoding, updateSelectedUserDetails, updateUserDetails } from "Redux/Slice/Admin.Slice"
import { updateModalShow, updateToastMessage } from "Redux/Slice/Common.Slice"
import axiosInstance from "Services/axiosInstance"
import { getAllTours } from "./Tour.Action"
import { update_selected_tour } from "Redux/Slice/Tour.Slice"



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

export const getAllBookingDetails = ({ page = 1, limit = 10, search = "", status = "" } = {}) => async (dispatch) => {
    try {
        dispatch(updateBookingDetails({ type: "request" }))
        const { data } = await axiosInstance.get("tour/get-all-bookings", { params: { page, limit, search, status } })
        if (data?.error_code === 200) {
            dispatch(updateBookingDetails({ type: "response", data: data?.data }))
        } else {
            dispatch(updateBookingDetails({ type: "failure" }))
            dispatch(updateToastMessage({ message: data?.message || "Failed to fetch booking details", type: "error" }))
        }
    } catch (error) {
        console.log("Error in getAllBookingDetails", error);
        dispatch(updateBookingDetails({ type: "failure" }))
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
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
        dispatch(update_new_booking_inputs({ is_loading: true }))
        const { data} =  await axiosInstance.post('tour/book-tour-byadmin',payload)
        if(data?.error_code === 200){
            const {booking_filter_inputs} = getState()?.adminState || {}
            dispatch(update_new_booking_inputs({ is_loading: false }))
            dispatch(updateModalShow({}))
            dispatch(getAllBookingDetails({status: booking_filter_inputs?.status || "all",search: booking_filter_inputs?.search || ""}))
            dispatch(clear_new_booking_inputs())

        }else{
            dispatch(update_new_booking_inputs({ is_loading: false }))
            dispatch(updateToastMessage({message: data?.message || "Failed to book a tour",type: "error"}))
        }
        
    } catch (error) {
        console.log("Error in bookTourByAdmin", error);
        dispatch(update_new_booking_inputs({ is_loading: false }))
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
        }else{
            dispatch(updateToastMessage({ message: data?.message || "failed to confirm booking", type: "error" }))
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
        }else{
            dispatch(updateToastMessage({ message: data?.message || "failed to cancel booking", type: "error" }))
        }
        
    } catch (error) {
         console.log("Error in bookTourByAdmin", error);
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
    }
  }

  export const deleteTourPackages = (tourid,navigate)=>async(dispatch)=>{
    try {
        const { data } = await axiosInstance.delete(`tour/delete_tour/${tourid}`)
        if(data?.error_code === 200){
            dispatch(getAllTours())
            dispatch(updateModalShow({}))
            navigate('/admin/packages')
        }else{
             dispatch(updateToastMessage({ message: data?.message || "failed to delete tour", type: "error" }))
        }     
    } catch (error) {
     console.log(error)
     dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))
        
    }
}

export const uploadTourImages = (tourId,formData)=>async (dispatch)=>{
    try {
        dispatch(updateLoding(true))
        const{ data} = await axiosInstance.post(`tour/upload-images/${tourId}`,formData)
        if(data?.error_code === 200){
            dispatch(getAllTours())
            dispatch(updateLoding(false))
            dispatch(updateToastMessage({ message: data?.message || "Image uploaded succesfully", type: "success" }))
        }else{
            dispatch(updateLoding(false))
             dispatch(updateToastMessage({ message: data?.message || "failed to upload", type: "error" }))
        }
        
    } catch (error) {
        console.log(error)
        dispatch(updateLoding(false))
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
    }
}

export const deleteTourImages = (tourId,public_id)=>async(dispatch)=>{
    try {
        const { data } = await axiosInstance.delete(
            `tour/delete-image/${tourId}?public_id=${encodeURIComponent(public_id)}`
        )
        if(data?.error_code === 200){
             dispatch(getSelectedTourDetails(tourId))
        }else{
              dispatch(updateToastMessage({ message: data?.message || "failed to delete image", type: "error" }))
        }
        
    } catch (error) {
         console.log(error)
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
    }

}

export const getSelectedTourDetails = (id)=>async(dispatch)=>{
    try {
        const {data} = await axiosInstance.get(`tour/get-tour/${id}`)
        if(data?.error_code === 200){
            dispatch(update_selected_tour(data?.data))
        }else{
             dispatch(updateToastMessage({ message: data?.message || "failed to fetch tour details", type: "error" }))
        }
    } catch (error) {
        console.log(error)
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
    }
}

export const getAllEnquies = () => async (dispatch) => {
    try {
        dispatch(update_enquiry_details({type:"request"}))
        const { data } = await axiosInstance.get('tour/get-enquiry')
        if (data?.error_code === 200) {
            dispatch(update_enquiry_details({type:"response",data:data?.data}))
        } else {
            dispatch(update_enquiry_details({type:"failure"}))
            dispatch(updateToastMessage({ message: data?.message || "failed to fetch enquiry details", type: "error" }))
        }

    } catch (error) {
        console.log(error)
        dispatch(update_enquiry_details({type:"failure"}))
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
    }
}

export const deleteEnquiry = (id)=> async (dispatch)=>{
    try {
        const { data} = await axiosInstance.delete(`tour/delete-enquiry/${id}`)
        if(data?.error_code === 200){
            dispatch(getAllEnquies())
        }else{
            dispatch(updateToastMessage({ message: data?.message || "failed to delete enquiry", type: "error" }))
        }
        
    } catch (error) {
         console.log(error,'Error in deleteEnquiry ')
         dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
    }
}

export const editTourDetails = (id,payload)=>async(dispatch)=>{
    try {
        const {data} = await axiosInstance.patch(`tour/edit_tour/${id}`,payload)
        if(data?.error_code === 200){
            dispatch(getSelectedTourDetails(id))
        }else{
             dispatch(updateToastMessage({ message: data?.message || "failed to edit tour", type: "error" }))
        }
    } catch (error) {
         console.log(error,'Error in deleteEnquiry ')
         dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
    }
}