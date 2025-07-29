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
            {link:'home',name:'Home',},
            {link:'about',name:'About',},
            {link:'tour',name:'Tour Packages'},
            {link:'gallery',name:'Gallery'},
            {link:'contact',name:'Contact'},
        ],
        carosal_details:[
          {
            src:Image.slider1,
            title:'To travel is to take a journey into yourself',
            details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          },
          {
            src:Image.slider2,
            title:'To travel is to take a journey into yourself',
            details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          },   {
            src:Image.slider3,
            title:'To travel is to take a journey into yourself',
            details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          },   {
            src:Image.slider4,
            title:'To travel is to take a journey into yourself',
            details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          },   {
            src:Image.slider5,
            title:'To travel is to take a journey into yourself',
            details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          },   {
            src:Image.slider6,
            title:'To travel is to take a journey into yourself',
            details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
        
          

    }

    const jsxJson = {
     
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData