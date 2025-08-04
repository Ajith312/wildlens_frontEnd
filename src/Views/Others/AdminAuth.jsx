import { useCommonState } from 'Components/CustomHooks'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminAuth = () => {
    const {commonState} = useCommonState()
    const isUser = commonState?.user_details?.role === 'admin'
    const hasToken = !!commonState?.user_details?.token
  return !isUser && !hasToken ? <Outlet /> : <Navigate to='/' replace />
}

export default AdminAuth