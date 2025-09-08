import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    loading:false,
    user_details:[],
    dropdown_tour_details:[],
    selected_userdetails:{},
    booking_details:[],
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
      comments: ''
    },
    show_modal:false,
    selected_booking: {}
    
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
            state.booking_details = action.payload
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
        clear_new_booking_inputs:(state,action)=>{
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
        }

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
    update_selected_booking
 } = actions

export default reducer