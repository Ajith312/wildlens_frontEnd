import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    loading:false,
    user_details:[],
    selected_userdetails:{},
    passwordInputs:{
        current_password:"",
        password:"",
        confirm_password:""
    }

}




const adminSlice = createSlice({
    name:"admin_slice",
    initialState,
    reducers:{
        updateLoding:(state,action)=>{
            state.loading = action.payload
        },
        updateUserDetails:(state,action)=>{
            state.user_details = action.payload,
            state.loading = false
        },
        updateSelectedUserDetails:(state,action)=>{
            state.selected_userdetails = action.payload
        },
        updatePasswordInputs:(state,action)=>{
            const [key, value] = Object.entries(action?.payload)[0] || [];
            state.passwordInputs[key] = value || '';
        }

    }
})

const {actions,reducer} = adminSlice
export const {updateLoding,updateUserDetails,updateSelectedUserDetails,updatePasswordInputs } = actions

export default reducer