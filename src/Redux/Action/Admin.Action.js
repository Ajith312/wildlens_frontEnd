import { updateLoding, updateSelectedUserDetails, updateUserDetails } from "Redux/Slice/Admin.Slice"
import { updateToastMessage } from "Redux/Slice/Common.Slice"
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

export const handleUpdatePassword = (payload)=>async(dispatch)=>{
    try {
        const {data} = await axiosInstance.post("user/change-password",payload)
        if(data?.error_code === 200){
            dispatch(updateToastMessage({ message: data?.message || "Something went wrong", type: "success" }))
        }else{
            dispatch(updateToastMessage({ message: data?.message || "Something went wrong", type: "error" }))
        }
        
    } catch (error) {
         console.log('handleUpdatePassword', error)
        dispatch(updateToastMessage({message: error?.response?.data?.message || "Something went wrong", type: "error"}))
    }
}