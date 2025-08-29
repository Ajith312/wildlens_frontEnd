import { updateToastMessage } from "Redux/Slice/Common.Slice"
import { update_booking_details, update_get_tours, update_tour_details } from "Redux/Slice/Tour.Slice"
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
       dispatch(updateToastMessage({ message:data?.message, type: "error" }))
        
    }

}

export const getAllTours = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('/tour/get_all_tours')

        console.log(data, 'getalltour')
        if (data?.success || data?.error_code == 200) {
            dispatch(update_get_tours(data?.data))
        } else {
            dispatch(updateToastMessage({ message: data?.message, type: "error" }))
        }
    } catch (error) {
        console.log(error)
        //  dispatch(updateToastMessage({ message:data?.message, type: "error" }))

    }
}

export const deleteTourPackages = ()=>async(dispatch)=>{
    try {
        
    } catch (error) {
     console.log(error)
     dispatch(updateToastMessage({ message:data?.message, type: "error" }))
        
    }
}

export const handleBookTour = (data)=>async(dispatch)=>{
    const {payload,tourId} = data
    try {
        const {data } = await axiosInstance.post(`tour/book-tour/${tourId}`,payload)
        console.log(data,'data')
        
    } catch (error) {
        console.log(error)
         dispatch(updateToastMessage({ message:data?.message, type: "error" }))
        
    }

}