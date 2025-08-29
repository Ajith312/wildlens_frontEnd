import React, { useEffect } from 'react'
import OffCanvas from 'Components/Offcanvas/OffCanvas';
import { useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import NavLinkComp from 'Components/Router_components/NavLink';
import Image from 'Utils/Image';
import Icons from 'Utils/Icons';
import { handleLogout } from 'Redux/Action/Common.Action';
import ButtonComponent from 'Components/Button/Button';


const Sidebar = ({
    menuOptions,
    responsiveOn,
    offCanvasShow,
    handleCanvasOpenOrClose,

    header,
    companyLogo,
    user_role,

    footer,
    footerClickFunction
}) => {
    const navigate = useCustomNavigate();
    const dispatch = useDispatch()
    const hanldeButton = (v) => {
        return <>
            <div className="col-3 pb-1 text-center">
                {v.icon}
            </div>
            <div className="col text-start">
                <p className='mb-0'>{v.name}</p>
            </div>
        </>
    }

    const headerFun = () => {
        return (
            <div className="sidebar-header d-flex align-items-center p-3">
                <img
                    src={Image.cardImg}
                    alt="WildLens Logo"
                    className="sidebar-logo me-2"
                />
                <h5 className="sidebar-title mb-0">WildLens Tour</h5>
            </div>
        );
    };

    const footerFun = () => {
        return (
           <ButtonComponent  className="btn-warning w-100" buttonName="Log Out" clickFunction={()=>dispatch(handleLogout(navigate))} />
        )
    }


    const bodyContent = () => {
        return <nav className='navmenu w-100 pe-3'>
            <ul className='w-100 px-1 '>
                {menuOptions?.map((v, i) => (
                    !v?.sub_routes ?
                        <li className="list-unstyled w-100" key={i}>
                            <NavLinkComp
                                componentFrom="sidebar menus"
                                className='navlink-sidebar'
                                title={hanldeButton(v)}
                                to={v?.route}
                                clickFunction={handleCanvasOpenOrClose}
                            />
                        </li>
                        :
                        <li className="list-unstyled w-100" key={i}>
                            <NavLinkComp
                                componentFrom="sidebar menus"
                                className='navlink-sidebar'
                                title={hanldeButton(v)}
                                to={v?.route}
                                clickFunction={handleCanvasOpenOrClose}
                            />

                            <ul className={`h-100 w-100 px-1 ms-4 accordion_animation_sub_menu ${v?.show_sub_routes ? 'open' : ''}`}>
                                {
                                    v?.sub_routes?.map((v, i) => (
                                        <li className="list-unstyled w-100 " key={i}>
                                            <NavLinkComp
                                                componentFrom="sidebar menus"
                                                className=' w-100 d-flex flex-wrap align-items-center mb-1 navlink-sidebar rounded px-2 py-2 text-decoration-none'
                                                title={hanldeButton(v)}
                                                to={v?.route}
                                                clickFunction={handleCanvasOpenOrClose}
                                            />
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                ))}
            </ul>
        </nav >
    }


    return (
        <>
            <div className={`sidebar d-none ${responsiveOn !== '' ? `d-${responsiveOn}-block` : 'd-block'}`}>
                <div className="container-fluid d-flex flex-column h-100">

                    {/* header */}
                    <div className="sidebar-header position-relative mb-3">
                        <div className="row h-100 align-items-center justify-content-center">
                            <div className="col text-center">
                                {headerFun()}
                            </div>
                        </div>
                    </div>

                    {/* body (menus) */}
                    <div className="sidebar-body flex-grow-1">
                        {bodyContent()}
                    </div>

                    {/* footer (logout at bottom) */}
                    <div className="sidebar-footer py-3 border-top">
                        {footerFun()}

                    </div>
                </div>
            </div>



            <OffCanvas
                offCanvasShow={offCanvasShow}
                offcanvasPlacement="start"
                offcanvasClassname="rounded border-0 sidebar offcanvas-sidebar custom-offcanvas"
                handleCanvasOpenOrClose={handleCanvasOpenOrClose}
                canvasHeader={headerFun('198px', '33px', companyLogo)}
                offcanvasHeaderClassname="sidebar-header"
                offcanvasHeaderTitleClassname="col-11 text-center"
                offcanvasBodyClassname="sidebar-body-without-footer"
                canvasBody={bodyContent()}
                canvasFooter={footerFun()}
            />
        </>
    )
}

export default Sidebar