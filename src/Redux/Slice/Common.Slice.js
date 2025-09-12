import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    isOnline:false,
    innerWidth: 0,
    innerHeight: 0,
    canvasShow:false,
    loading:false,
    loadingTwo:false,
    profile_editing:false,
    modal: {
        show: false,
        size: "md",
        from: null,
        type: null,
        close_btn: false,
        enable_lg_autoScroll:false,
        modal_data:null,
    },

    login_data: {
    
    },
    user_details:{
        token:"",
        role:""
    },
    toast_details:{
        type:'',
        message:''
    },
    profile_details:{

    },
   passwordInputs:{
        current_password:"",
        password:"",
        confirm_password:"",
        is_loading:false
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
        updateLoading:(state,action)=>{
            state.loading = action.payload
        },
        updateProfileEditing:(state,action)=>{
            state.profile_editing = action.payload
        },
        updateLoadingTwo:(state,action)=>{
            state.loadingTwo = action.payload
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
        
        },
        updateLoginResponse:(state,action)=>{
            state.user_details.role = action?.payload?.role
            state.user_details.token = action?.payload?.token
            state.login_data = {}
        },
        updateRegisterResponse:(state)=>{
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
        },
           updateRefreshToken:(state, action)=>{
            state.user_details.token = action?.payload;
        },
        updateProfileDetails:(state,action)=>{
            const profileDetails = action?.payload || {}
            Object.entries(profileDetails).forEach(([key,value])=>{
                state.profile_details[key]=value
            })
        },
        clearUserDetails:(state)=>{
            state.user_details={
                token:"",
                role:""
            }
        },
        updatePasswordInputs:(state,action)=>{
            const [key, value] = Object.entries(action?.payload)[0] || [];
            state.passwordInputs[key] = value || '';
        },
        clearPasswordInputs:(state)=>{
            state.passwordInputs={
                current_password: "",
                password: "",
                confirm_password: ""

            }
        },
           updateModalShow(state, actions) {
            const { show, size, modal_from, modal_type, close_btn, data } = actions.payload;
            state.modal.show = show
            state.modal.size = size || "md"
            state.modal.from = modal_from || null
            state.modal.type = modal_type || null
            state.modal.close_btn = close_btn || false
            state.modal.modal_data = data || null
        },

    },

    // extraReducers:(builder)=>{
    //     builder
    //     .addCase("",(state,action)=>{

    //     })
    //     .addMatcher("",(state,action)=>{

    //     })
    // }

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
    updateCanvasShow,
    updateRefreshToken,
    updateProfileDetails,
    updateLoading,
    clearUserDetails,
    updateLoadingTwo,
    updateProfileEditing,
    updatePasswordInputs,
    clearPasswordInputs,
    updateModalShow
} = actions
export default reducer