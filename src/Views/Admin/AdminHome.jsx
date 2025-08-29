import { useDispatch } from 'Components/CustomHooks'
import React, { useEffect } from 'react'
import { getProfileDetails } from 'Redux/Action/Common.Action'

const AdminHome = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getProfileDetails())
  },[])
  return (
    <div className='h-100' >Home</div>
  )
}

export default AdminHome