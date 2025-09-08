import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks'
import Header from 'Components/Panel_compnent/Header'
import Sidebar from 'Components/Panel_compnent/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { handleUpdateCanvasShow } from 'Redux/Action/Common.Action'
import AdminModal from 'Utils/AdminModal'
import JsonData from 'Utils/JsonData'

const AdminLayout = () => {
    const dispatch = useDispatch()
    const {commonState} = useCommonState()
    const navigate = useCustomNavigate()
    const { sidebarMenus } = JsonData()?.jsonOnly;

 
  return (
    <div className="d-flex flex-wrap main_rendering_contents_height">
    <Sidebar
        responsiveOn={"xl"}
        offCanvasShow={commonState?.innerWidth <= 1199 ? commonState?.canvasShow : false}
        handleCanvasOpenOrClose={() => dispatch(handleUpdateCanvasShow)}
        menuOptions={sidebarMenus}
        header={true}
        footer={true}
    />

    <div className="col">
        <main className="w-100 overflow-hidden">
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

            <div className="main overflow-auto">
                <div className="container-fluid">
                    <Outlet />
                    <AdminModal />
                </div>
            </div>
        </main>
    </div>
</div>
  )
}

export default AdminLayout

