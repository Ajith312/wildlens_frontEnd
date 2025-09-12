import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import { handleLogout } from 'Redux/Action/Common.Action';
import { update_new_booking_inputs } from 'Redux/Slice/Admin.Slice';
import Icons from 'Utils/Icons';
import Image from 'Utils/Image'

const JsonData = () => {
  //main selectors
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const {booking_details,new_booking_inputs,user_details,dropdown_tour_details  } = useCommonState()?.adminState;
  const {commonState} = useCommonState()

  const jsonOnly = {
    footerBtnDetails: [
      { link: 'home', name: 'Home'},
      { link: 'about', name: 'About'},
      { link: 'tour', name: 'Tour Packages'},
      { link: 'gallery', name: 'Gallery'},
      { link: 'contact', name: 'Contact'},
    ],
    carosal_details: [
      {
        src: Image.slider1,
        title: 'To travel is to take a journey into yourself',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        src: Image.slider2,
        title: 'To travel is to take a journey into yourself',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }, {
        src: Image.slider3,
        title: 'To travel is to take a journey into yourself',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }, {
        src: Image.slider4,
        title: 'To travel is to take a journey into yourself',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }, {
        src: Image.slider5,
        title: 'To travel is to take a journey into yourself',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }, {
        src: Image.slider6,
        title: 'To travel is to take a journey into yourself',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }


    ],
    sidebarMenus: [
      {
        icon: Icons.dashboardIcon,
        name: "Dashboard",
        route: "home"
      },
      {
        icon: Icons.bookingIcon,
        name: "Bookings",
        route: "bookings"
      }, {
        icon: Icons.tourIcon,
        name: "Tour Packages",
        route: "packages"
      }, {
        icon: Icons.userIcon,
        name: "User Details",
        route: "users"
      }, {
        icon: Icons.enquiryIcon,
        name: "Enquiry",
        route: "enquiry"
      },{
        icon: Icons.settingsIcon,
        name: "Settings",
        route: "settings"
      }
    ],
    tableHeadings: ["User Name", "Tour Title", "Booking Date","Country", "Price", "Payment",],
    tableKeys: ["user_name", "title", "booking_date","country", "budget", "payment_status",],
    bookingTableheadings:["Tour Title", "Booking Date", "Guests", "Price", "Payment", "Booking"],
    bookingTableKeys:["title", "booking_date", "persons", "budget", "payment_status", "booking_status"],
    bookingCards: [{
      title: "Total Bookings",
      value: booking_details?.data?.stats?.totalBookings,
    },
    {
      title: "New Bookings",
      value: booking_details?.data?.stats?.pendingCount,
    },
    {
      title: "Completed Bookings",
      value: booking_details?.data?.stats?.completedCount,
    },
    {
      title: "Upcomming Bookings",
      value: booking_details?.data?.stats?.pendingCount,
    },
    {
      title: "Cancelled Bookings",
      value: booking_details?.data?.stats?.cancelledCount,
    }]






  }

  const jsxJson = {
    add_booking_admin: [
  {
    name: "First Name",
    type: "text",
    title: "First Name ",
    category: "input",
    placeholder: "",
    value: new_booking_inputs?.first_name || '',
    change: (e) => dispatch(update_new_booking_inputs({ first_name: e.target.value })),
    divClassName: "mb-3 col-6 p-1",
    isMandatory: true,
    Err: commonState?.app_data?.validated && !new_booking_inputs?.first_name  ? "First name required" : null
  },
  {
    name: "Last Name",
    type: "text",
    title: "Last Name ",
    category: "input",
    placeholder: "",
    value: new_booking_inputs?.last_name || '',
    change: (e) => dispatch(update_new_booking_inputs({ last_name: e.target.value })),
    divClassName: "mb-3 col-6 p-1",
    isMandatory: true,
    Err: commonState?.app_data?.validated && !new_booking_inputs?.last_name  ? "First name required" : null
  },
  {
    name: "Address",
    type: "textbox",
    title: "Address ",
    category: "input",
    placeholder: "",
    value: new_booking_inputs?.address || '',
    change: (e) => dispatch(update_new_booking_inputs({ address: e.target.value })),
    divClassName: "mb-3 col-12 p-1",
    isMandatory: true,
    Err: commonState?.app_data?.validated && !new_booking_inputs?.address  ? "First name required" : null
  },
  {
  name: "Select User",
  type: "react_dropdown_select",
  title: "Select User",
  category: "select",
  options: user_details?.map(user => ({
    label: user.user_name,
    value: user._id
  })),
  placeholder: "Choose a user",
  value: new_booking_inputs?.user_id 
    ? [{ label: user_details.find(u => u._id === new_booking_inputs?.user_id)?.user_name, value: new_booking_inputs?.user_id }]
    : [],
  change: (values) => {
    const selectedUser = values[0]?.value;
    dispatch(update_new_booking_inputs({ user_id: selectedUser }))
  },
  divClassName: "mb-3 col-12 p-1 rounded-3",
  className:"rounded-2 mt-2",
  isMandatory: true,
  Err: commonState?.app_data?.validated && !new_booking_inputs?.user_id
    ? "User selection is required"
    : null
},
{
  name: "Select Tour",
  type: "react_dropdown_select",
  title: "Select Tour",
  category: "select",
  options: dropdown_tour_details, 
  placeholder: "Choose a tour",
  value: new_booking_inputs?.tour_id
    ? [
        {
          label: dropdown_tour_details.find(
            tour => tour.value === new_booking_inputs?.tour_id
          )?.label,
          value: new_booking_inputs?.tour_id
        }
      ]
    : [],
  change: (values) => {
    const selectedTour = values[0]?.value;
    dispatch(update_new_booking_inputs({ tour_id: selectedTour }))
  },
  divClassName: "mb-3 col-12 p-1 rounded-3",
  className: "rounded-2 mt-2",
  isMandatory: true,
  Err: commonState?.app_data?.validated && !new_booking_inputs?.tour_id
    ? "Tour selection is required"
    : null
},{
  name: "Booking Date",
  type: "date", 
  title: "Start Date",
  category: "input",
  value: new_booking_inputs?.booking_date || '',
  change: (e) => dispatch(update_new_booking_inputs({ booking_date: e.target.value })),
  divClassName: "mb-3 col-6 p-1",
  min: new Date().toISOString().split("T")[0],
  isMandatory: true,
  Err: commonState?.app_data?.validated && !new_booking_inputs?.booking_date
    ? "Booking date is required"
    : null
},{
    name: "Number of Persons",
    type: "number",
    title: "Number of Persons",
    category: "input",
    placeholder: "",
    value: new_booking_inputs?.number_of_persons || '',
    change: (e) => dispatch(update_new_booking_inputs({ number_of_persons: e.target.value })),
    divClassName: "mb-3 col-6 p-1",
    isMandatory: false,
    Err: commonState?.app_data?.validated && !new_booking_inputs?.number_of_persons  ? "Number of persons required" : null
  },{
    name: "Require a tour guide?",
    type: "checkbox",
    title: "guide required",
    category: "Checkbox",
    placeholder: "",
    value: new_booking_inputs?.guide_required || false,
    change: (e) => dispatch(update_new_booking_inputs({ guide_required: e.target.value })),
    divClassName: "mb-3 col-12",
    isMandatory: false,
    Err: commonState?.app_data?.validated && !new_booking_inputs?.guide_required  ? "Guide required" : null
  },
  {
    name: "Special Requests/Comments",
    type: "textbox",
    title: "comments ",
    category: "input",
    placeholder: "",
    value: new_booking_inputs?.comments || '',
    change: (e) => dispatch(update_new_booking_inputs({ comments: e.target.value })),
    divClassName: "mb-3 col-12 p-1",
    isMandatory: false,
    Err: commonState?.app_data?.validated && !new_booking_inputs?.comments  ? "First name required" : null
  }


]

  }

  return {
    "jsonOnly": jsonOnly,
    "jsxJson": jsxJson
  }
}

export default JsonData