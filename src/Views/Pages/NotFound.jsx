import React from 'react'

import ButtonComponent from 'Components/Button/Button'
import { useCustomNavigate } from 'Components/CustomHooks'

const NotFound = () => {
  const navigate = useCustomNavigate()

  const handleGoBack = () => {
    navigate('/')
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 text-center'>
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <ButtonComponent
          className='btn btn-success'
          title='Go back to Login'
          type='button'
          clickFunction={handleGoBack}
          buttonName='Go back to Login'
        />
      </div>
    </div>
  )
}

export default NotFound
