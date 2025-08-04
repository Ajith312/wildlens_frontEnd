import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

let initialState = {
    isOnline:false,
    innerWidth: 0,
    innerHeight: 0,
    canvasShow:false,

    login_data: {
    
    },
    user_details:{
        token:Cookies.get('token'),
        role:Cookies.get('user_role')
    },
    toast_details:{
        type:'',
        message:''
    }
    
}

const commonSlice = createSlice({
    name:'common_slice',
    initialState,
    reducers:{
        updateScreenCurrentDimension(state, action) {
            state.innerHeight=action?.payload?.innerHeight
            state.innerWidth=action?.payload?.innerWidth
        },
        updateIsonline(state, action) {
            state.isOnline= action?.payload
        },
        updateCanvasShow(state) {
            state.canvasShow = !state.canvasShow;
        },
        clearToastErrors(state){
            state.toast_details.message = '';
            state.toast_details.type = '';
        },
        updateToastMessage(state,action){
            state.toast_details.message = action?.payload?.message;
            state.toast_details.type = action?.payload?.type;
        },
        update_login_data(state, action) {
            const [key, value] = Object.entries(action?.payload)[0] || [];
            state.login_data[key] = value || '';
        },
        updateLoginRequest(state,action){
            return{

            }
            
        },
        updateLoginResponse(state,action){
            state.user_details.role = action?.payload?.role
            state.user_details.token = action?.payload?.token
            state.login_data = {}
        },
        updateRegisterResponse(state){
            state.login_data = {
                user_name:'',
                email:'',
                password:'',
                confirm_password:'',
                otp:''  
            }
            state.toast_details = {
                 type:'',
                message:''
            }
        }

    }

})


const {actions,reducer}=commonSlice
export const {
    updateScreenCurrentDimension,
    updateIsonline,
    update_login_data,
    updateLoginRequest,
    updateLoginResponse,
    updateToastMessage,
    clearToastErrors,
    updateRegisterResponse,
    updateCanvasShow
} = actions
export default reducer