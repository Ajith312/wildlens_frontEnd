import ButtonComponent from 'Components/Button/Button'
import BookingHistoryCard from 'Components/Card/BookingHistoryCard'
import { useCommonState } from 'Components/CustomHooks'
import ModalComponent from 'Components/Modal/Modal'
import React from 'react'
import { useDispatch } from 'react-redux'
import { bookTourByAdmin, handleCancelBooking, handleConfirmBooking } from 'Redux/Action/Admin.Action'
import JsonData from './JsonData'
import { InputFunctions } from 'Functions/InputFunction'
import { updateModalShow, updateToastMessage } from 'Redux/Slice/Common.Slice'
const AdminModal = () => {
    const dispatch = useDispatch()
    const {commonState,adminState}=useCommonState()
    const {jsxJson } = JsonData()


    const handleSubmit = (values) => {
        const requiredFields = ['first_name', 'last_name', 'address', 'booking_date', 'user_id', 'tour_id']
        for (let field of requiredFields) {
            if (!values[field]) {
                return dispatch(updateToastMessage({ message: `Please Enter All the fields`, type: "error" }))
            }
        }
        dispatch(bookTourByAdmin(values))
    }


    function modalHeaderFun() {
        switch (commonState?.modal?.from) {
            case "Bookings":
                switch (commonState?.modal?.type) {
                    case "view_booking":
                        return <h5 className='mb-0 text-primary'>Booking Information</h5>;
                    case "add_booking":
                        return <h5 className='mb-0 text-primary'>Book Tour</h5>;
                    default:
                        break
                }

            case "":
                switch (commonState?.modal?.type) {
                    case "":
                        return <h5> </h5>;
                    default:
                        break
                }

            default:
                break
        }
    }


    function modalBodyFun() {
        switch (commonState?.modal?.from) {
            case "Bookings":
                switch (commonState?.modal?.type) {
                    case "view_booking":
                        return <div className="w-100">
                           {Object.keys(adminState?.selected_booking).length > 0 ? 
                            <BookingHistoryCard booking={adminState?.selected_booking} /> : <p>No data</p>
                           }
                        </div>
                    case "add_booking":
                        return <div className="w-100 d-flex flex-wrap">
                           {InputFunctions(jsxJson?.add_booking_admin)}
                        </div>


                    default:
                        break;
                }
                 case "Profile":
                switch (commonState?.modal?.type) {
                    case "edit_profile":
                        return <div className="w-100">
                            hello
                        </div>

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }
   function modalFooterFun() {
        switch (commonState?.modal?.from) {
            case "Bookings":
                switch (commonState?.modal?.type) {
                    case "view_booking":
                        return <div className='w-100'>
                            {adminState?.selected_booking?.booking_status == "pending" || adminState?.selected_booking?.booking_status == "confirmed" ?
                                <div className='d-flex justify-content-end gap-3 w-100'>
                                    {adminState?.selected_booking?.booking_status == "confirmed" ? null : <ButtonComponent className="btn-success w-50" buttonName="Confirm Booking" clickFunction={() => dispatch(handleConfirmBooking(adminState?.selected_booking?._id))} />}
                                    <ButtonComponent className="btn-danger w-50" buttonName="Cancel Booking" clickFunction={() => dispatch(handleCancelBooking(adminState?.selected_booking?._id))} />
                                </div> : null
                            }
                        </div>

                    case "add_booking":
                        return <div className="d-flex gap-4 w-100 p-2">
                            <ButtonComponent
                                type="button"
                                className="btn-success w-50"
                                buttonName="Booking Now"
                               clickFunction={()=>handleSubmit(adminState?.new_booking_inputs)}
                            />
                            <ButtonComponent
                                type="button"
                                className="btn-outline-danger w-50"
                                buttonName="Cancel"
                                clickFunction={() => dispatch(updateModalShow({}))}
                            />
                        </div>
                       

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }
  return (
      <ModalComponent
          show={commonState?.modal?.show}
          modalSize={commonState?.modal?.size}
          modalCentered={true}
          modalCloseButton={commonState?.modal?.close_btn}
          showModalHeader={true}
          modalHeaderClassname="border-3"
          modalHeader={modalHeaderFun()}
          modalBodyClassname="py-3"
          modalBody={<div className='d-flex flex-wrap p-3 py-0'>{modalBodyFun()}</div>}
          showModalFooter={true}
          modalFooterClassname="border-3"
          modalFooter={modalFooterFun()}
          modalClassname={["lg", "xl"].includes(commonState?.modal?.size) ? "model_height_lg" : ''}

      />
  )
}

export default AdminModal