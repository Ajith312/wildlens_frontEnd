import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    loading:false,
    user_details:[],
    dropdown_tour_details:[],
    selected_userdetails:{},
    booking_details:{
        is_loading : false,
        data:[]
    },
    booking_filter_inputs:{
        search:"",
        status:"all",
        page:1,
        limit:7
    },
    new_booking_inputs:{
      first_name: '',
      last_name: '',
      address: '',
      user_id: '',
      tour_id: '',
      booking_date: '',
      number_of_persons: 0,
      guide_required: false,
      comments: '',
      is_loading:false
    },
    show_modal:false,
    selected_booking: {},
    enquiry_details:{
        is_loading:false,
        data:[]
    }
    
}




const adminSlice = createSlice({
    name:"admin_slice",
    initialState,
    reducers:{
        updateLoding:(state,action)=>{
            state.loading = action.payload
        },
        update_show_modal :(state,action)=>{
            state.show_modal = action.payload
        },
        updateUserDetails:(state,action)=>{
            state.user_details = action.payload,
            state.loading = false
        },
        updateSelectedUserDetails:(state,action)=>{
            state.selected_userdetails = action.payload
        },
        updateBookingDetails:(state,action)=>{
            const { type , data} = action.payload
            switch(type){
                case "request":
                    state.booking_details.is_loading=true
                    break;
                case "response":
                    state.booking_details.is_loading=false
                    state.booking_details.data = data
                    break;
                case "failure":
                    state.booking_details.is_loading=false
                    break
            }
        },
        update_booking_filter_inputs:(state,action)=>{
            const inputs = action.payload
            Object.entries(inputs).forEach(([key,value])=>{
                state.booking_filter_inputs[key]=value
            })
        },
        update_dropdown_tour_details: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.dropdown_tour_details = action.payload.map(tour => ({
                    label: tour.title,
                    value: tour._id,
                }))
            } else {
                state.dropdown_tour_details = []
            }
        },
        update_new_booking_inputs:(state,action)=>{
            const inputs = action.payload
            Object.entries(inputs)?.forEach(([key,value])=>{
                state.new_booking_inputs[key]=value
            })
        },
        clear_new_booking_inputs:(state)=>{
            state.new_booking_inputs = {
                first_name: '',
                last_name: '',
                address: '',
                user_id: '',
                tour_id: '',
                booking_date: '',
                number_of_persons: 0,
                guide_required: false,
                comments: ''
            }
        },
        update_selected_booking:(state,action)=>{
            state.selected_booking=action.payload
        },
        update_enquiry_details:(state,action)=>{
            const {type,data } = action.payload
            switch(type){
                case "request":
                    state.enquiry_details.is_loading=true
                    break;
                case "response":
                    state.enquiry_details.is_loading=false
                    state.enquiry_details.data=data
                    break;
                case "failure":
                    state.enquiry_details.is_loading=false
                    break
            }
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase("common_slice/updateModalShow",(state,action)=>{
            const {show} =  action.payload
            if(!show){
               state.new_booking_inputs = {
                first_name: '',
                last_name: '',
                address: '',
                user_id: '',
                tour_id: '',
                booking_date: '',
                number_of_persons: 0,
                guide_required: false,
                comments: ''
            }
            }

        })
    }
})

const {actions,reducer} = adminSlice
export const {updateLoding,
    updateUserDetails,
    updateSelectedUserDetails,
    updateBookingDetails,
    update_booking_filter_inputs,
    update_dropdown_tour_details,
    update_new_booking_inputs,
    update_show_modal,
    clear_new_booking_inputs,
    update_selected_booking,
    update_enquiry_details
 } = actions

export default reducer