import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    loading: false,
    tour_details: { places_covered: [{ name: '', description: '' }] },
    tour_package_details: [],
    booking_details: {},
    country_details: [],
    enquiry_details:{
        name:"",
        email:"",
        phone_number:"",
        comments:""
    },
    filter_inputs: {
        country: "all",
        min_price: 0,
        max_price: 0,
        duration: "all"
    },
    cart_details:[],
    upcoming_bookings:[],
    booking_history:[],
    selected_tour:{}


}

const tourSlice = createSlice({
    name: 'tour_slice',
    initialState,
    reducers: {
        updateLoding: (state, action) => {
            state.loading = action.payload
        },
        update_tour_details(state, action) {
            state.tour_details = action?.payload
        },
        update_get_tours(state, action) {
            state.tour_package_details = action?.payload
        },
        update_booking_details(state, action) {
            const [key, value] = Object.entries(action?.payload)[0] || [];
            state.booking_details[key] = value
        },
        update_country_details: (state, action) => {
            state.country_details = action.payload
        },
        update_filter_inputs: (state, action) => {
            const [key, value] = Object.entries(action.payload)[0] || []
            state.filter_inputs[key] = value
        },
        clearFilterInputs: (state, action) => {
            state.filter_inputs = {
                country: "all",
                min_price: 0,
                max_price: 0,
                duration: "all"
            }
        },
        update_enquiry_details:(state,action)=>{
            const [key, value] = Object.entries(action.payload)[0] || []
            state.enquiry_details[key] = value
        },
        clear_enquiry_details:(state)=>{
            state.enquiry_details = {
                name: "",
                email: "",
                phone_number: "",
                comments: ""
            }
        },
        update_cart_details:(state,action)=>{
            state.cart_details = action.payload
        },
        update_upcoming_bookings:(state,action)=>{
            state.upcoming_bookings = action.payload
        },
        update_booking_history:(state,action)=>{
            state.booking_history = action.payload
        },
        update_selected_tour: (state, action) => {
            const { field, index, key, value, actionType } = action.payload;

            if (field && Array.isArray(state.selected_tour[field])) {
                switch (actionType) {
                    case "update":
                        if (typeof index === "number") {
                            if (typeof state.selected_tour[field][index] === "object") {
                                state.selected_tour[field][index] = {
                                    ...state.selected_tour[field][index],
                                    [key]: value
                                }
                            } else {
                                state.selected_tour[field][index] = value
                            }
                        }
                        break;

                    case "remove":
                        if (typeof index === "number") {
                            state.selected_tour[field] = state.selected_tour[field].filter((_, i) => i !== index)
                        }
                        break;


                    case "add":
                        if (field === "places_covered") {
                            state.selected_tour[field].push({ name: "", description: "" });
                        } else {
                            state.selected_tour[field].push("");
                        }
                        break;

                    default:
                        break;
                }
            } else {
                Object.entries(action.payload).forEach(([k, v]) => {
                    if (k === "days" || k === "budget") {
                        state.selected_tour[k] = Number(v);
                    } else {
                        state.selected_tour[k] = v;
                    }
                });
            }
        }





    }

})
const { actions, reducer } = tourSlice
export const {
    update_tour_details,
    update_get_tours,
    update_booking_details,
    update_country_details,
    update_filter_inputs,
    clearFilterInputs,
    updateLoding,
    update_enquiry_details,
    clear_enquiry_details,
    update_cart_details,
    update_upcoming_bookings,
    update_booking_history,
    update_selected_tour

} = actions
export default reducer