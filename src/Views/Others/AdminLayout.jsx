import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks'
import Header from 'Components/Panel_compnent/Header'
import Sidebar from 'Components/Panel_compnent/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { handleUpdateCanvasShow } from 'Redux/Action/Common.Action'
import Image from 'Utils/Image'
import JsonData from 'Utils/JsonData'

const AdminLayout = () => {
    const dispatch = useDispatch()
    const {commonState} = useCommonState()
    const navigate = useCustomNavigate()
    const { sidebarMenus } = JsonData()?.jsonOnly;

 
  return (
    <div className="d-flex flex-wrap main_rendering_contents_height">
    {/* sidebar  */}
    <Sidebar
        responsiveOn={"xl"}
        offCanvasShow={commonState?.innerWidth <= 1199 ? commonState?.canvasShow : false}
        handleCanvasOpenOrClose={() => dispatch(handleUpdateCanvasShow)}
        menuOptions={sidebarMenus}
        header={true}
        footer={true}
        // companyLogo={Image.CompanyLogo}
    />

    <div className="col">
        <main className="w-100">
            {/* header  */}
            <header className='d-flex align-items-center'>
                <div className="container-fluid">
                    <Header
                        offcanvasOn={"xl"}
                        offcanvasOnButton={() => dispatch(handleUpdateCanvasShow)}
                        dispatch={dispatch}
                        navigate={navigate}
                    />
                </div>
            </header>

            {/* main content */}
            <div className="main">
                <div className="container-fluid">
                    <Outlet />
                </div>
            </div>
        </main>
    </div>
</div>
  )
}

export default AdminLayout

