import { useDispatch, useSize } from 'Components/CustomHooks';
import React, { useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearToastErrors, updateIsonline, updateScreenCurrentDimension } from 'Redux/Slice/Common.Slice';

const InitializeProjectSetup = () => {
    const sizer = useSize()
    const dispatch = useDispatch()
    const commonState = useSelector((state) => state.commonState)

    useEffect(() => {
        dispatch(updateIsonline(navigator.onLine))
        dispatch(updateScreenCurrentDimension(sizer))
    }, [])

    window.addEventListener('online', () => {
        dispatch(updateIsonline(true))
    })
    window.addEventListener('offline', () => {
        dispatch(updateIsonline(false))
    })

    useEffect(() => {
        if (commonState?.toast_details?.message) {
            toast(commonState?.toast_details?.message, {
                position: "top-right",
                type: commonState?.toast_details?.type,
                onOpen: () => dispatch(clearToastErrors()),
                autoClose: 1600
            })
            return
        }
    }, [commonState?.toast_details?.message, commonState?.toast_details?.type, dispatch])


    return (

        commonState?.isOnline ? <Fragment>
            <Outlet />
        </Fragment> : <p>No Internet connection </p>


    )
}

export default InitializeProjectSetup