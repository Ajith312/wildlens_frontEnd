import { updateToastMessage } from "Redux/Slice/Common.Slice"
import { clear_enquiry_details, update_booking_details, update_booking_history, update_cart_details, update_country_details, update_get_tours, update_tour_details, update_upcoming_bookings, updateLoding } from "Redux/Slice/Tour.Slice"
import axiosInstance from "Services/axiosInstance"


export const handleAddTourInputs =(value)=> (dispatch)=>{
    dispatch(update_tour_details(value))
}

export const handleBookingTourInputs = (value)=>(dispatch)=>{
    dispatch(update_booking_details(value))
}

export const handleAddTour = ({payload,navigate})=>async(dispatch)=>{
    try {
        const {data } = await axiosInstance.post('/tour/create_tour',payload)
        if(data?.success || data?.error_code == 201){
            navigate('/admin/packages')
            dispatch(updateToastMessage({ message:data?.message, type: "success" }))

        }else{
        dispatch(updateToastMessage({ message:data?.message, type: "error" }))
        console.log('error')
      }
    } catch (error) {
        console.log(error)
       dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))
        
    }

}

export const getAllTours = () => async (dispatch) => {
    try {
        dispatch(updateLoding(true))
        const { data } = await axiosInstance.get('/tour/get_all_tours')
        if (data?.success || data?.error_code == 200) {
            dispatch(update_get_tours(data?.data))
            dispatch(updateLoding(false))
        } else {
            dispatch(updateToastMessage({ message: data?.message, type: "error" }))
            dispatch(updateLoding(false))
        }
    } catch (error) {
        console.log(error)
        dispatch(updateLoding(false))
        dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))

    }
}

export const deleteTourPackages = ()=>async(dispatch)=>{
    try {
        
    } catch (error) {
     console.log(error)
     dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))
        
    }
}

export const handleBookTour = (data)=>async(dispatch)=>{
    const {payload,tourId} = data
    try {
        const {data } = await axiosInstance.post(`tour/book-tour/${tourId}`,payload)
        console.log(data,'data')
        
    } catch (error) {
        console.log(error)
         dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))
        
    }

}

export const getCountryLists = ()=>async(dispatch)=>{
    try {
        const {data} = await axiosInstance.get('tour/get-country-list')
        if(data?.error_code ===200){
            dispatch(update_country_details(data?.data))
        }else{
             dispatch(updateToastMessage({ message:data?.message || "failed to fetch details", type: "error" }))
        }
        
    } catch (error) {
        console.log("Error in getCountryLists",error)
        dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))

        
    }
}

export const handleFilterTours = (payload) =>async(dispatch)=>{
    try {
        dispatch(updateLoding(true))
        const {data} = await axiosInstance.post('tour/filter-tour',payload)
        if(data?.error_code === 200){
            dispatch(update_get_tours(data?.data))
            dispatch(updateLoding(false))
        }else{
            dispatch(updateLoding(false))
            dispatch(updateToastMessage({ message:data?.message || "failed to fetch details", type: "error" }))
        }
        
    } catch (error) {
        console.log("Error in getCountryLists", error)
        dispatch(updateLoding(false))
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
    }
}

export const handleSendEnquiry = (payload) => async (dispatch) => {
    try {
        dispatch(updateLoding(true))
        const { data } = await axiosInstance.post('tour/send-enquiry', payload)
        if (data?.error_code === 200) {
            dispatch(updateLoding(false))
            dispatch(updateToastMessage({ message:data?.message || "Enquiry created succesfully", type: "success" }))
            dispatch(clear_enquiry_details())
        } else {
            dispatch(updateLoding(false))
             dispatch(updateToastMessage({ message:data?.message || "Enquiry created failed", type: "error" }))
        }

    } catch (error) {
        console.log("Error in getCountryLists", error)
        dispatch(updateLoding(false))
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))

    }
}

export const addToCart = (tour_id)=>async(dispatch)=>{
    try {
         dispatch(updateLoding(true))
        const { data} = await axiosInstance.post(`tour/addtocart/${tour_id}`)
        if(data?.error_code === 200){
            dispatch(getCartDetails())
            dispatch(updateLoding(false))
            dispatch(updateToastMessage({ message: data?.message || "Tour added to cart", type: "success" }))


        }else{
            dispatch(updateLoding(false))
            dispatch(updateToastMessage({ message: data?.message || "Error to cart", type: "error" }))
        }
        
    } catch (error) {
        console.log("Error in addToCart", error)
        dispatch(updateLoding(false))
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
        
    }
}

export const getCartDetails = () => async (dispatch) => {
    try {
        dispatch(updateLoding(true))
        const { data } = await axiosInstance.get('tour/get-user-cartdetails')
        if (data?.error_code === 200) {
            dispatch(update_cart_details(data?.data))
            dispatch(updateLoding(false))
        } else {
            dispatch(update_cart_details([]))
            dispatch(updateLoding(false))
            dispatch(updateToastMessage({ message: data?.message || "Failed to fetch cart details", type: "error" }))

        }

    } catch (error) {
        console.log("Error in addToCart", error)
        dispatch(updateLoding(false))
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))

    }
}

export const removeFormCart = (id) => async (dispatch)=>{
    try {
        const { data} = await axiosInstance.delete(`tour/remove-from-cart/${id}`)
        if(data?.error_code === 200){
            dispatch(getCartDetails())
        }else{
             dispatch(updateToastMessage({ message: data?.message || "Failed to fetch cart details", type: "error" }))
        }
    } catch (error) {
        console.log("Error in removeFormCart", error)
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
        
    }
}

export const getUpcomingBookings = ()=>async(dispatch)=>{
    try {
         dispatch(updateLoding(true))
        const { data } = await axiosInstance.get('tour/get-upcomming-bookings')
        if(data?.error_code === 200){
            dispatch(update_upcoming_bookings(data?.data))
             dispatch(updateLoding(false))
        }else{
             dispatch(updateLoding(false))
             dispatch(updateToastMessage({ message: data?.message || "Failed to fetch upcoming booking details", type: "error" }))
        }
        
    } catch (error) {
        console.log("Error in getUpcomingBookings", error)
         dispatch(updateLoding(false))
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
        
    }
}

export const getBookingHistory = () => async(dispatch)=>{
    try {

        const{ data} = await axiosInstance.get('tour/get-booking-history')
        if(data?.error_code === 200){
            dispatch(update_booking_history(data?.data))
        }else{
             dispatch(update_booking_history([]))
             dispatch(updateToastMessage({ message: data?.message || "Failed to fetch booking details", type: "error" }))
        }
        
    } catch (error) {
         console.log("Error in getUpcomingBookings", error)
        dispatch(updateToastMessage({ message: error?.response?.data?.message || "Something went wrong", type: "error" }))
        
    }
}