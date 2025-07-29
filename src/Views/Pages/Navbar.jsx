import { useCustomNavigate } from 'Components/CustomHooks'
import React, { useState } from "react";
import { RiCloseLargeLine, RiContactsBookUploadFill, RiProfileLine } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { FaGoogle, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { RiMenuFold3Fill } from "react-icons/ri";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-router-dom';
import LinkComponent from 'Components/Router_components/LinkComponent';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const handleModel = () => setShow(!show)
  const navigate = useCustomNavigate()
  return (
    <>
      <div className="homepage-navbar">
        <div className="navbar-discout-container bg-dark p-2 d-flex">
          <div className="col-4 d-none d-lg-flex justify-content-center align-items-center border-end border-white">
            <div className="d-flex">
              <p>
                <SiMinutemailer color="green" size={40} />
              </p>
              <div className="d-flex align-items-center ms-2">
                <p className="text-white fs-5 me-2">Email:</p>
                <p className="text-success fs-5">info@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5 d-flex align-items-center justify-content-center ">
            <p className="fs-6 ms-2 text-white text-wrap text-center">
              50% off Your Next Trip.Hurry Up For Your Next Trip!! Book Your Trip
            </p>
          </div>
          <div className="col-3 d-none d-lg-flex justify-content-center align-items-center border-start border-white">
            <div className="d-flex gap-4">
              <a href="">
                <MdFacebook size={40} color="white" />
              </a>
              <a href="">
                <FaTwitter size={40} color="white" />
              </a>
              <a href="">
                <FaInstagram size={40} color="white" />
              </a>
              <a href="">
                <FaGoogle size={40} color="white" />
              </a>
            </div>
          </div>
        </div>
        <div className="navbar-menu-container bg-success-subtle p-2 d-flex justify-content-between">
          <div className="col-lg-2 col-6 col-sm-6 nav-menu-logo">
            <h3>Wildlens Tour</h3>
          </div>
          <div className="col-lg-7 d-none d-xl-flex flex-column justify-content-center">
            <ul className="nav-menu-content d-flex justify-content-evenly mb-0">
              <LinkComponent to='home' className='nav-menu' title='HOME' />
              <LinkComponent to='about' className='nav-menu' title='ABOUT' />
              <LinkComponent to='tour' className='nav-menu' title='TOUR PACKAGES' />
              <LinkComponent to='gallery' className='nav-menu' title='GALLERY' />
              <LinkComponent to='contact' className='nav-menu' title='CONTACT' />
            </ul>

          </div>
          <div className="col-3 col-sm-3 col-lg-3 nav-menu-profile d-flex align-items-center justify-content-evenly">
            <button className="btn btn-warning px-4 d-none d-xl-block" onClick={() => navigate('profile')}>PROFILE</button>
            <button className="btn btn-warning px-4 d-none d-xl-block" onClick={() => navigate('/')}>LOGOUT</button>
            <div className="px-4 d-xl-none " onClick={handleModel}><RiMenuFold3Fill size={35} /></div>
          </div>
        </div>
      </div>
      <Offcanvas show={show} onHide={handleModel} backdrop="static" className="bg-secondary-subtle custom-offcanvas" >
        <Offcanvas.Header className="" >
          <div className="sidebarHeader d-flex justify-content-between align-items-center w-100 pb-3 border-bottom border-black">
            <h2 className="mb-0">WildLens Tour</h2>
            <RiCloseLargeLine size={30} onClick={handleModel} />
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column justify-content-between">

          <div className="sidebarContent h-100 d-flex flex-column gap-4">
            <NavLink to='home' onClick={handleModel}>
              <div className="d-flex align-items-center p-2  w-100 bg-dark rounded-2">
                <span><IoHome size={28} color="white" /></span>
                <h3 className="mb-0 ms-3 text-white">Home</h3>
              </div>
            </NavLink>

            <NavLink to='about' onClick={handleModel}>
              <div className="d-flex align-items-center p-2 w-100 bg-dark rounded-2">
                <span><MdOutlineDashboard size={28} color="white" /></span>
                <h3 className="mb-0 ms-3 text-white">About</h3>
              </div>
            </NavLink>

            <NavLink to='tour' onClick={handleModel}>
              <div className="d-flex align-items-center p-2 w-100 bg-dark rounded-2">
                <span><GiWorld size={28} color="white" /></span>
                <h3 className="mb-0 ms-3 text-white">Tour Packages</h3>
              </div>
            </NavLink>

            <NavLink to='gallery' onClick={handleModel}>
              <div className="d-flex align-items-center p-2 w-100 bg-dark rounded-2">
                <span><GrGallery size={28} color="white" /></span>
                <h3 className="mb-0 ms-3 text-white">Gallery</h3>
              </div>
            </NavLink>

            <NavLink to='contact' onClick={handleModel}>
              <div className="d-flex align-items-center p-2 w-100 bg-dark rounded-2">
                <span><RiContactsBookUploadFill size={28} color="white" /></span>
                <h3 className="mb-0 ms-3 text-white">Contact</h3>
              </div>
            </NavLink>

            <NavLink to='profile' onClick={handleModel}>
              <div className="d-flex align-items-center p-2 w-100 bg-dark rounded-2">
                <span><RiProfileLine size={28} color="white" /></span>
                <h3 className="mb-0 ms-3 text-white">Profile</h3>
              </div>
            </NavLink>

          </div>

          <div className="sidebarFooter">
            <NavLink to='/'>
              <div className="d-flex align-items-center p-2  w-100 bg-warning rounded-2">
                <span><LuLogOut size={28} color="black" /></span>
                <h3 className="mb-0 ms-3 text-dark">Logout</h3>
              </div>
            </NavLink>
          </div>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Navbar