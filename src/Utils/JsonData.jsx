import { useCommonState, useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import Icons from 'Utils/Icons';
import { useState } from 'react';

const JsonData = () => {
    //main selectors
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();
    const { commonState } = useCommonState();

    const jsonOnly = {

    }

    const jsxJson = {
     
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData