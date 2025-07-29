import ButtonComponent from 'Components/Button/Button'
import { useCustomNavigate } from 'Components/CustomHooks'
import LinkComponent from 'Components/Router_components/LinkComponent'
import React from 'react'

const Footer = () => {
  const navigate = useCustomNavigate()

    const footerBtnDetails = [
        {link:'home',name:'Home'},
        {link:'about',name:'About'},
        {link:'tour',name:'Tour Packages'},
        {link:'gallery',name:'Gallery'},
        {link:'contact',name:'Contact'},
    ]
  return (
    <div className='footer-main-container bg-dark d-flex flex-column justify-content-center align-items-center'>
      <div className="footer-container w-75 h-100 d-flex flex-column flex-md-row ">
        <div className="col-12 col-md-6 h-100 d-flex">
            <div className="col-6 d-flex flex-column justify-content-start align-items-start my-5">
              <h3 className='w-75 mb-3 text-white text-start'>Wild Lens</h3>
              <h4 className='w-75 mb-3 text-white text-start'>Want to take tour packages</h4>
              <ButtonComponent type='button' className='btn brand-color w-75' buttonName='Book A Tour' clickFunction={()=>navigate('tour')} />
            </div>
          <div className="col-6 d-flex flex-column justify-content-start align-items-start gap-2 my-5">
              <h3 className='text-white'>Quick Link</h3>
              {footerBtnDetails.map((btn,i)=>{
                    return(
                        <LinkComponent to={btn.link} className="btn btn-outline-secondary w-75 footerBtn text-secondary" title={btn.name} key={i} />
                    )
                })}   
          </div>
        </div>

     <div className="col-12 col-md-6 h-100 d-flex">

          <div className="col-6 d-flex flex-column justify-content-start align-items-start gap-2 my-5 ">
              <div>
              <h5 className='text-white text-start'>More Inquiry</h5>
              <p className='text-secondary text-start'>+91 9854574547</p>
              </div>
              <div>
              <h5 className='text-white text-start'>Send Mail</h5>
              <p className='text-secondary text-start'>info@wildtour.com</p>
              </div>
              <div>
              <h5 className='text-white text-start'>Address</h5>
              <p className='text-secondary text-start text-wrap mb-0'>No 169,Saravanampatti,</p>
              <p className='text-secondary text-start text-wrap'>coimbatore,641035</p>
              </div>
          </div>

          <div className="col-6 d-flex flex-column justify-content-start align-items-start gap-2 my-5">
            <div>
            <h3 className='text-white text-start'>We Are Here</h3>
            <p className='text-secondary text-start'>Your journey begins with us. From epic wildlife safaris to serene nature getaways, Wild Lens Tours is here to make your adventure unforgettable. Connect with us to turn your travel dreams into reality.</p>
            </div>
            <div>
            <h3 className='text-white text-start'>Payment methods</h3>
            </div>
          </div>
     </div>
        
      </div> 
      <div className='footer-copyright-container w-100 border-top border-secondary'>
        <p className='text-white py-3 text-center'>Copyright © 2021 Wild Lens Tours. All rights reserved.</p>

      </div>
    </div>
  )
}

export default Footer
