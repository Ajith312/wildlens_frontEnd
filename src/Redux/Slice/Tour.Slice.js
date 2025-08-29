import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    tour_details:{places_covered: [{ name: '', description: '' }]},
    tour_package_details:[],
    booking_details:{}


}

const tourSlice  = createSlice({
    name:'tour_slice',
    initialState,
    reducers:{
            update_tour_details(state,action){
                state.tour_details = action?.payload
            },
            update_get_tours(state,action){
                state.tour_package_details=action?.payload
            },
            update_booking_details(state,action){
                 const [key, value] = Object.entries(action?.payload)[0] || [];
                state.booking_details[key]= value
            }
            
        

    }

})
const {actions,reducer}=tourSlice
export const {update_tour_details,update_get_tours,update_booking_details}=actions
export default reducer