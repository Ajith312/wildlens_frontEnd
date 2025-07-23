import { useCommonState } from 'Components/CustomHooks'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserAuth = () => {
  const { commonState } = useCommonState()

  const isUser = commonState?.user_details?.role === 'user'
  const hasToken = !!commonState?.user_details?.token

  return isUser && hasToken ? <Outlet /> : <Navigate to='/' replace />
}

export default UserAuth
