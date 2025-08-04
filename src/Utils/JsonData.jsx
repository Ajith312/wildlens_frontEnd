import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import Icons from 'Utils/Icons';
import Image from 'Utils/Image'

const JsonData = () => {
  //main selectors
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();
  const { commonState } = useCommonState();

  const jsonOnly = {
    footerBtnDetails: [
      { link: 'home', name: 'Home', },
      { link: 'about', name: 'About', },
      { link: 'tour', name: 'Tour Packages' },
      { link: 'gallery', name: 'Gallery' },
      { link: 'contact', name: 'Contact' },
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
    tourDetails: [
      {
        "days": 3,
        "country": "India",
        "budget": 200000,
        "title": "Quick Jungle Getaway",
        "description": "Perfect for a weekend tiger adventure.",
        "inclusions": ["Hotel", "1 Safari", "Guide"],
        "exclusions": ["Flights", "Personal Expenses"],
        imageGallery: [
          "https://img.etb2bimg.com/files/cp/upload-16321079503320-safari.jpg",
          "https://www.tourmyindia.com/blog//wp-content/uploads/2018/06/Willdife-Holidays-in-India.jpg",
          "https://i.assetzen.net/i/9Sf9fjP1eYpd/w:1200/h:808/q:70.jpg",
          "https://www.fondationsegre.org/wp-content/uploads/2019/11/RAP-Tiger-and-cubs-Bandipur_Augustine-Prince_WTI-1-750x400.jpg"
        ],

        "placesCovered": [
          {
            "name": "Ranthambore",
            "description": "Tiger reserve in Rajasthan.",
            "_id": "68875cb6dcc2e5e6bcf8efbd"
          }
        ],
        "_id": "68875cb6dcc2e5e6bcf8efbc"
      },
      {
        "days": 5,
        "country": "India",
        "budget": 500000,
        "title": "Explorer's Wild Trail",
        "description": "Visit India’s finest wildlife parks.",
        "inclusions": ["Hotel", "2 Safaris", "Meals", "Guide"],
        "exclusions": ["Flights", "Tips"],
        imageGallery: [
          "https://img.etb2bimg.com/files/cp/upload-16321079503320-safari.jpg",
          "https://www.tourmyindia.com/blog//wp-content/uploads/2018/06/Willdife-Holidays-in-India.jpg",
          "https://i.assetzen.net/i/9Sf9fjP1eYpd/w:1200/h:808/q:70.jpg",
          "https://www.fondationsegre.org/wp-content/uploads/2019/11/RAP-Tiger-and-cubs-Bandipur_Augustine-Prince_WTI-1-750x400.jpg"
        ],
        "placesCovered": [
          {
            "name": "Ranthambore",
            "description": "Bengal tigers and ancient fort.",
            "_id": "68875f03a1012be5596fedfe"
          },
          {
            "name": "Jim Corbett",
            "description": "First national park in India.",
            "_id": "68875f03a1012be5596fedff"
          }
        ],
        "_id": "68875f03a1012be5596fedfd"
      },
      {
        "days": 5,
        "country": "India",
        "budget": 500000,
        "title": "Explorer's Wild Trail",
        "description": "Visit India’s finest wildlife parks.",
        "inclusions": ["Hotel", "2 Safaris", "Meals", "Guide"],
        "exclusions": ["Flights", "Tips"],
        imageGallery: [
          "https://img.etb2bimg.com/files/cp/upload-16321079503320-safari.jpg",
          "https://www.tourmyindia.com/blog//wp-content/uploads/2018/06/Willdife-Holidays-in-India.jpg",
          "https://i.assetzen.net/i/9Sf9fjP1eYpd/w:1200/h:808/q:70.jpg",
          "https://www.fondationsegre.org/wp-content/uploads/2019/11/RAP-Tiger-and-cubs-Bandipur_Augustine-Prince_WTI-1-750x400.jpg"
        ],
        "placesCovered": [
          {
            "name": "Ranthambore",
            "description": "Bengal tigers and ancient fort.",
            "_id": "68875f03a1012be5596fedfe"
          },
          {
            "name": "Jim Corbett",
            "description": "First national park in India.",
            "_id": "68875f03a1012be5596fedff"
          }
        ],
        "_id": "68875f03a1012be5596fedfg"
      }
    ],
    sidebarMenus: [
      {
        icon: Icons.dashboardIcon,
        name: "Dashboard",
        route: "home"
      },
      {
        icon: Icons.dashboardIcon,
        name: "Bookings",
        route: "bookings"
      }, {
        icon: Icons.dashboardIcon,
        name: "Tour Packages",
        route: "packages"
      }, {
        icon: Icons.dashboardIcon,
        name: "User Details",
        route: "users"
      }, {
        icon: Icons.dashboardIcon,
        name: "Settings",
        route: "settings"
      },
      {
        icon: Icons.dashboardIcon,
        name: "Log out",
        route: "/"
      }
    ],
    userDetails: [
      {
        id: 'USR-001',
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        phone: '+1 (555) 123-4567',
        joinDate: '15 Jan 2023',
        status: 'active',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        loyaltyPoints: 1250,
        nextTier: 'Gold (1500 points needed)',
        bookings: {
          upcoming: [
            {
              id: 'BK-2023-056',
              tour: 'Bali Adventure Tour',
              date: '15 Nov 2023',
              status: 'confirmed',
              guests: 2,
              amount: '$1,250',
              image: 'https://via.placeholder.com/100x60?text=Bali'
            },
            {
              id: 'BK-2023-078',
              tour: 'Paris City Break',
              date: '05 Dec 2023',
              status: 'pending',
              guests: 1,
              amount: '$890',
              image: 'https://via.placeholder.com/100x60?text=Paris'
            }
          ],
          history: [
            {
              id: 'BK-2023-012',
              tour: 'Italian Getaway',
              date: '22 May 2023',
              status: 'completed',
              guests: 2,
              amount: '$1,450',
              image: 'https://via.placeholder.com/100x60?text=Italy'
            },
            {
              id: 'BK-2023-034',
              tour: 'Japanese Cultural Tour',
              date: '10 Aug 2023',
              status: 'completed',
              guests: 3,
              amount: '$2,100',
              image: 'https://via.placeholder.com/100x60?text=Japan'
            },
            {
              id: 'BK-2022-189',
              tour: 'Australian Outback',
              date: '15 Dec 2022',
              status: 'completed',
              guests: 4,
              amount: '$3,200',
              image: 'https://via.placeholder.com/100x60?text=Australia'
            }
          ]
        }
      },
      {
        id: 'USR-002',
        name: 'Samantha Lee',
        email: 'samantha.lee@example.com',
        phone: '+1 (555) 987-6543',
        joinDate: '10 Mar 2022',
        status: 'active',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        loyaltyPoints: 1800,
        nextTier: 'Platinum (2000 points needed)',
        bookings: {
          upcoming: [
            {
              id: 'BK-2023-101',
              tour: 'New Zealand Explorer',
              date: '10 Sep 2023',
              status: 'confirmed',
              guests: 1,
              amount: '$2,500',
              image: 'https://via.placeholder.com/100x60?text=NZ'
            }
          ],
          history: [
            {
              id: 'BK-2023-020',
              tour: 'Swiss Alps Hiking',
              date: '15 Jul 2023',
              status: 'completed',
              guests: 2,
              amount: '$1,750',
              image: 'https://via.placeholder.com/100x60?text=Switzerland'
            }
          ]
        }
      },
      {
        id: 'USR-003',
        name: 'Marcus Rivera',
        email: 'marcus.rivera@example.com',
        phone: '+1 (555) 765-4321',
        joinDate: '05 Jun 2023',
        status: 'inactive',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        loyaltyPoints: 620,
        nextTier: 'Silver (1000 points needed)',
        bookings: {
          upcoming: [],
          history: [
            {
              id: 'BK-2023-045',
              tour: 'Costa Rica Rainforest',
              date: '12 Jul 2023',
              status: 'completed',
              guests: 1,
              amount: '$980',
              image: 'https://via.placeholder.com/100x60?text=Costa+Rica'
            }
          ]
        }
      },
      {
        id: 'USR-004',
        name: 'Lena Müller',
        email: 'lena.mueller@example.de',
        phone: '+49 170 1234567',
        joinDate: '20 Feb 2021',
        status: 'active',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        loyaltyPoints: 2050,
        nextTier: 'Platinum (achieved)',
        bookings: {
          upcoming: [
            {
              id: 'BK-2023-109',
              tour: 'Norwegian Fjords Cruise',
              date: '18 Oct 2023',
              status: 'confirmed',
              guests: 2,
              amount: '$3,400',
              image: 'https://via.placeholder.com/100x60?text=Norway'
            }
          ],
          history: [
            {
              id: 'BK-2022-099',
              tour: 'Greek Island Escape',
              date: '29 Aug 2022',
              status: 'completed',
              guests: 2,
              amount: '$1,950',
              image: 'https://via.placeholder.com/100x60?text=Greece'
            },
            {
              id: 'BK-2021-055',
              tour: 'Grand Canyon Trek',
              date: '11 Nov 2021',
              status: 'completed',
              guests: 3,
              amount: '$2,300',
              image: 'https://via.placeholder.com/100x60?text=Grand+Canyon'
            }
          ]
        }
      },
      {
        id: 'USR-005',
        name: 'David Chen',
        email: 'david.chen@example.com',
        phone: '+1 (555) 333-7890',
        joinDate: '01 Dec 2023',
        status: 'active',
        avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
        loyaltyPoints: 300,
        nextTier: 'Silver (700 points needed)',
        bookings: {
          upcoming: [],
          history: []
        }
      }
    ]
    




  }

  const jsxJson = {

  }

  return {
    "jsonOnly": jsonOnly,
    "jsxJson": jsxJson
  }
}

export default JsonData